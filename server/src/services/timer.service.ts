import { prisma } from '../config/prisma';
import { RoundStatus } from '@prisma/client';
import { broadcastTimerSync } from '../socket';
import { endRound, getOrCreateEventSettings } from './round.service';

let timerInterval: NodeJS.Timeout | null = null;
let isEndingRound = false;

export function startTimerService() {
  if (timerInterval) return;

  console.log('⏱️ Server-Authoritative Timer Service started');

  timerInterval = setInterval(async () => {
    try {
      const settings = await prisma.eventSettings.findFirst();
      if (!settings) return;

      const isPaused = settings.eventStatus === 'PAUSED';
      const activeRound = await prisma.round.findFirst({
        where: { status: RoundStatus.ACTIVE },
      });

      let remainingSeconds = 0;
      let totalSeconds = 0;

      if (activeRound && activeRound.endsAt) {
        totalSeconds = activeRound.durationMinutes * 60;

        if (isPaused && settings.eventPausedAt) {
          // When paused, freeze remaining time calculation
          const effectiveNow = settings.eventPausedAt.getTime();
          remainingSeconds = Math.max(0, Math.floor((activeRound.endsAt.getTime() - effectiveNow) / 1000));
        } else {
          const now = Date.now();
          remainingSeconds = Math.max(0, Math.floor((activeRound.endsAt.getTime() - now) / 1000));
        }

        // Auto-end round when remaining seconds hits zero
        if (remainingSeconds <= 0 && !isPaused && !isEndingRound) {
          isEndingRound = true;
          console.log(`⏰ Round ${activeRound.number} time expired! Auto-ending round...`);
          try {
            await endRound(activeRound.id);
          } catch (e) {
            console.error('Failed to auto-end round on timer expiration:', e);
          } finally {
            isEndingRound = false;
          }
        }
      }

      // Broadcast timer sync to participants & admins
      broadcastTimerSync({
        serverTime: Date.now(),
        eventStatus: settings.eventStatus,
        isPaused,
        totalPausedDurationSecs: settings.totalPausedDurationSecs,
        activeRound: activeRound
          ? {
              id: activeRound.id,
              number: activeRound.number,
              name: activeRound.name,
              remainingSeconds,
              totalSeconds,
              endsAt: activeRound.endsAt?.toISOString(),
            }
          : null,
      });
    } catch (err) {
      // Don't crash interval on transient DB hiccups
      console.error('Timer tick error:', err);
    }
  }, 1000);
}

export function stopTimerService() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    console.log('⏹️ Timer service stopped');
  }
}
