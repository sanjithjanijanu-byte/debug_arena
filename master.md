MASTER PROMPT — Debugging Event Management Web Application
Copy everything below the line into your AI code generator / hand to your developer.

ROLE
You are a senior full-stack engineer. Build a production-ready, single-deployment web application that hosts and manages a live 3-round competitive Debugging Event for a college technical fest. The app must handle admin control, participant execution, live code compilation, timing, anti-cheat, and scoring.

EVENT SPECIFICATION (source of truth)
Total duration: 120 minutes
Format: Team-based. Each team selects exactly ONE language and uses it for all rounds.
Languages: C++, Java, Python
Rounds:
Round	Name	Duration	Difficulty	Questions	Points/Q
1	Bug Hunt	20 min	Easy	4	10
2	Logic Hunt	35 min	Medium	4	20
3	Debugging Showdown	35 min	Hard	4	32.5
Max score: 250 points
Task type: Each question is a program containing intentional bugs. Team must fix it so it passes all provided test cases.
Ranking priority: (1) total score → (2) test cases passed → (3) submission time → (4) tie-breaker question.
Rules to enforce in software: language locked after selection; no AI assistants; no cross-team communication; all submissions before round deadline; organizers may disqualify.
1. AUTHENTICATION — TWO SEPARATE PORTALS
Build two distinct login pages with fully separated route trees and token scopes.

Admin portal — /admin/login

Credentials seeded via environment variables / seed script. No self-registration.
Admin token grants access only to /admin/* routes.
Participant portal — /login

Login with Team Code + Password (or Roll No. + Password), issued by the admin. No self-signup.
Participant token grants access only to /event/* routes.
Security requirements

Hash passwords with bcrypt/argon2.
JWT (or server sessions) with separate signing audiences for admin vs participant; a participant token must be rejected on every admin route and vice versa.
Enforce single active session per participant — a new login invalidates the old session (prevents one team logging in from multiple machines).
All authorization checks on the server. Never trust the client for role, timer, score, or round state.
2. ADMIN PANEL — REQUIRED FEATURES
2.1 Team & Participant Management
Create / edit / delete teams (team name, auto-generated team code, generated password).
Create participants (name, roll no., email, phone) and assign each participant to a team. Support reassigning a participant between teams before the event starts.
Bulk import teams and participants via CSV upload.
Export credentials (team code + password) as CSV/PDF for distribution.
2.2 Question Bank
Create / edit / delete questions with these fields:
Title, round (1/2/3), language (C++ / Java / Python), difficulty, points
Buggy source code (the starter code shown to participants)
Reference/correct solution (admin-only, never sent to client)
Problem statement / expected behaviour
Test cases: array of { stdin, expected_stdout, is_hidden, weight }
Time limit (ms) and memory limit per execution
Requires 12 questions per language (4 per round) × 3 languages = 36 questions total.
Bulk import questions via JSON/CSV.
"Validate question" action: runs the reference solution against all test cases and flags any question whose own solution fails.
2.3 Question Assignment
Assign a question set to teams. Support both modes:
Auto mode — every team automatically receives the set matching their chosen language and the active round.
Manual mode — admin explicitly assigns specific questions to specific teams (useful for tie-breakers or replacements).
Questions for a round are not fetchable by the client until the admin starts that round.
2.4 Event & Round Control
Global controls: Start Event, Pause Event, Resume Event, End Event.
Per-round controls: Start Round, End Round, Extend Round (+N minutes).
Round state machine: LOCKED → ACTIVE → ENDED. Only one round ACTIVE at a time.
Pausing the event freezes every participant timer server-side and shows a "Paused by organizer" overlay on all participant screens.
2.5 Live Monitoring Dashboard
Real-time table (WebSocket-driven) with one row per team showing:

Team name, chosen language, current round, time remaining
Status badge: Not Logged In / Active / Idle / Submitted / Disqualified / Reinstated
Questions attempted, questions solved, test cases passed, current score
Violation count (tab switches, fullscreen exits, disconnects) with a hover detail of the last 5 events
Last activity timestamp
Admin row actions: View Team Code, View Live Code, Send Warning Message, Disqualify, Reinstate, Extend Time (+N min for this team only).

2.6 Disqualification & Reinstatement
Auto-disqualify triggers (each individually toggleable in settings, with a configurable violation threshold before it fires):
Participant leaves the exam page (tab switch / window blur)
Exiting fullscreen mode
Closing the tab or browser
Network disconnect exceeding a configurable grace period (default 60s)
Logging in from a second device
On disqualification: freeze the team's timer, block all submission endpoints server-side, and show a full-screen "Disqualified — contact the event coordinator" state.
Admin reinstate action must fully restore the team: same round, same question set, the exact draft code they had typed, all prior submissions and score, and the remaining time at the moment of disqualification (with an option for the admin to grant extra compensation minutes).
Every disqualification and reinstatement is written to an immutable DisqualificationLog with reason, timestamp, and acting admin.
2.7 Scoring & Leaderboard
Auto-scoring: points awarded per question in proportion to weighted test cases passed (configurable: all-or-nothing vs partial credit).
Live leaderboard applying the ranking priority: total score → test cases passed → earliest last-submission time → tie-breaker.
Manual score override with a mandatory reason field (logged).
Tie-breaker: admin can push a designated tie-breaker question to the tied teams only.
Export final results as CSV/PDF; projector-friendly fullscreen leaderboard view with a freeze/reveal toggle.
3. PARTICIPANT PANEL — REQUIRED FEATURES
3.1 Flow
Login with team credentials.
Instruction screen — event rules, round structure, anti-cheat warnings. Mandatory "I agree" checkbox.
Language selection — choose C++, Java, or Python. Show a confirmation modal: "This cannot be changed for the rest of the event." Persist the choice server-side and reject any later change. Only one member of a team may select; the choice applies to the whole team.
Waiting room — shown until the admin starts Round 1; displays a live countdown to start.
Round screen — the main workspace (below).
Between-rounds screen — round score summary plus countdown to the next round.
Final screen — total score, questions solved, submission confirmation.
3.2 Round Workspace Layout
Left panel: question list for the current round (with solved/attempted/unattempted indicators) and the selected question's problem statement, expected behaviour, and visible sample test cases.
Center panel: code editor (Monaco Editor) pre-loaded with the buggy program, with syntax highlighting for the selected language, line numbers, and bracket matching. Disable Monaco's autocomplete/IntelliSense suggestion widget so the editor doesn't hint at the fix.
Right/bottom panel: Run output, custom stdin box, and a per-test-case results table (Passed / Failed / Runtime Error / TLE with expected vs actual for visible cases only).
Top bar: team name, language badge, round name, round countdown timer, overall event timer, connection-status indicator.
3.3 Timer Requirements
The timer is authoritative on the server. The client renders a countdown but polls/receives server time over WebSocket every few seconds and corrects drift. Editing the system clock or local state must have no effect.
Two visible timers: current-round remaining time and total event remaining time.
Visual escalation: turns amber at 5 minutes, red and pulsing at 1 minute.
On reaching zero: auto-save and auto-submit all in-progress code for that round, lock the editor, and transition to the between-rounds screen.
3.4 Code Editor & Compiler
In-browser compiler/runner supporting all three languages (C++, Java, Python).
Two actions:
Run — executes against visible sample test cases plus optional custom stdin. Rate-limit to prevent abuse (e.g., max 1 run per 5 seconds per team).
Submit — executes against the full hidden test-case set, records the verdict, awards points, and stores the submission with a timestamp.
Verdicts to support: Accepted, Wrong Answer, Compilation Error, Runtime Error, Time Limit Exceeded, Memory Limit Exceeded.
Best score per question is retained across multiple submissions; unlimited submissions unless a per-question cap is configured by the admin.
Auto-save the draft code every 10 seconds and on every keystroke pause, so nothing is lost on a crash or disqualification.
3.5 Anti-Cheat on the Participant Side
Force fullscreen on round start; detect and report exits.
Detect visibilitychange and window.blur; on each event, show a warning modal with a strike count ("Warning 1 of 2 — leaving this page again will disqualify your team").
Disable copy/paste into the editor from outside the app, right-click context menu, and devtools shortcuts (best-effort deterrent, not a security boundary).
Send a heartbeat to the server every 10 seconds; a missed heartbeat beyond the grace period counts as leaving.
Every violation is logged to the server with type and timestamp and appears instantly on the admin dashboard.
4. CODE EXECUTION ENGINE
Use Judge0 (self-hosted via Docker Compose, preferred for an offline campus event) or an equivalent sandboxed runner.
Never execute participant code on the application server process. Every execution runs in an isolated container with: no network access, a hard CPU time limit (default 5s), a memory cap (default 256 MB), a process/thread cap, and a read-only filesystem apart from a scratch directory.
Language configuration: C++ (GCC 13, -std=c++17), Java (OpenJDK 17), Python (3.11).
Queue submissions (BullMQ / Celery) so a burst of submissions near a deadline doesn't drop requests; show participants a "Queued / Running" state.
Output comparison: trim trailing whitespace per line and trailing newlines before comparing; offer an optional exact-match mode per question.
5. DATA MODEL
Admin        { id, username, password_hash, created_at }
Team         { id, name, team_code, password_hash, language|null, language_locked_at,
               status, score, disqualified_at, reinstated_at, created_at }
Participant  { id, name, roll_no, email, phone, team_id, created_at }
Round        { id, number, name, duration_minutes, difficulty, status,
               started_at, ends_at }
Question     { id, round_id, language, title, statement, buggy_code, reference_solution,
               points, time_limit_ms, memory_limit_mb, is_tiebreaker }
TestCase     { id, question_id, stdin, expected_stdout, is_hidden, weight }
Assignment   { id, team_id, question_id, assigned_at }
Draft        { id, team_id, question_id, code, updated_at }
Submission   { id, team_id, question_id, code, language, verdict,
               tests_passed, tests_total, points_awarded, exec_time_ms, submitted_at }
Violation    { id, team_id, type, details, occurred_at }
DisqualificationLog { id, team_id, action, reason, admin_id, remaining_time_snapshot, created_at }
AuditLog     { id, actor_type, actor_id, action, payload, created_at }
6. TECH STACK
Frontend: React 18 + Vite, React Router (separate /admin and /event route trees), TailwindCSS, Monaco Editor, Zustand or Redux Toolkit for state, socket.io-client.
Backend: Node.js + Express (or NestJS), socket.io, JWT auth, Zod/Joi request validation.
Database: PostgreSQL with Prisma ORM.
Cache/Queue: Redis + BullMQ (timers, submission queue, rate limiting).
Execution: Judge0 self-hosted via Docker.
Deployment: Docker Compose bringing up frontend, backend, Postgres, Redis, and Judge0 together. Must run fully offline on a LAN, since campus Wi-Fi is unreliable.
7. REAL-TIME EVENTS (WebSocket)
Server → participant: round:started, round:ended, timer:sync, event:paused, event:resumed, team:disqualified, team:reinstated, admin:message, submission:result.

Participant → server: heartbeat, violation:report, draft:autosave.

Server → admin: team:status_changed, team:violation, submission:received, leaderboard:updated.

8. NON-FUNCTIONAL REQUIREMENTS
Support at least 60 concurrent teams without degradation.
Every state-changing action is idempotent and logged to AuditLog.
Full state recovery: if a participant's browser crashes and they log back in, they resume the same round with the same draft code and correct remaining time.
If the backend restarts mid-event, round timers and team states must rebuild from the database — no in-memory-only timer state.
Responsive down to 1366×768 (typical lab monitors). Dark mode for the participant workspace.
Clear, non-technical error messages for participants; detailed errors for admins.
Seed script that creates a demo admin, 5 teams, and a few sample questions per language for testing.
9. DELIVERABLES
Complete source code, frontend and backend.
docker-compose.yml bringing up the full stack including Judge0.
Database schema and migrations.
Seed script with sample data.
README.md covering setup, environment variables, running the event, and a pre-event checklist.
Admin user guide: how to create teams, upload questions, start rounds, disqualify and reinstate.
10. BUILD ORDER
Project scaffold, Docker Compose, database schema, migrations.
Auth: admin + participant portals with separated route guards.
Admin: team and participant CRUD, CSV import, credential export.
Admin: question bank, test cases, validation, bulk import.
Participant: login → instructions → language selection (locked) → waiting room.
Round engine: server-authoritative timers, round state machine, WebSocket sync.
Code editor + Judge0 integration: Run, Submit, verdicts, test-case results.
Scoring engine + leaderboard with tie-break ordering.
Anti-cheat: fullscreen, blur detection, heartbeat, violation logging.
Disqualification + full-state reinstatement.
Admin live monitoring dashboard.
Exports, projector leaderboard, polish, load test with 60 simulated teams.
Start with steps 1–3 and show me the schema and folder structure before continuing.