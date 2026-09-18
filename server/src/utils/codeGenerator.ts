import crypto from 'crypto';

export function generateTeamCode(existingCount = 0): string {
  const number = 1000 + existingCount + 1;
  const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `TEAM-${number}-${randomSuffix}`;
}

export function generatePassword(length = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
