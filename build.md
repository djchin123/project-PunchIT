PunchIT – Build & Deployment Guide

1. Prerequisites

Tool	            Version(tested)	        Notes
Node.js	            ≥ 18 LTS	            Includes npm (or pnpm/yarn).
PostgreSQL	        ≥ 14	                Server + psql CLI.
Git	                any	                    To clone the repo.

macOS users can install everything via Homebrew; Windows via WSL / Chocolatey, Linux via distro packages.

2. Get the code

# Pick a folder and clone
git clone https://github.com/djchin123/project-PunchIT.git
cd project-PunchIT

3. Install & initialise PostgreSQL

macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15      # auto-starts on boot

Ubuntu / Debian
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo systemctl enable --now postgresql

Windows
Install PostgreSQL from https://www.postgresql.org/download/windows/
(StackBuilder installer). Check psql is on your PATH.

4. Create database & role

Feel free to change names/passwords—just keep them in sync with .env later.

# open interactive shell as the postgres superuser

psql -U postgres

-- create a dedicated role
CREATE ROLE punchit_user LOGIN PASSWORD 'punchit_pass';

-- create a database owned by that role
CREATE DATABASE punchit_db OWNER punchit_user;

\q   -- exit psql

5. Import the schema

# from repo root (where schema.sql lives)
psql -U punchit_user -d punchit_db -f schema.sql
You should see INSERT 0 10 at the end (ten pre-seeded secret keys).

6. Configure environment variables

Create a file called .env beside server.js:

# .env  – never commit this file
DATABASE_USER=punchit_user
DATABASE_PASSWORD=punchit_pass
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=punchit_db
(macOS/Linux users can alternatively export these vars in their shell profile.)

7. Install backend & frontend dependencies

# root-level package.json covers both API & React app
npm install      # or pnpm install


8. Run the API server

node server.js
# →  API listening on :3001
The Express server hot-connects to Postgres using the vars from .env.

9. Start the frontend (developer mode)

# another terminal in repo root
npm run dev
# →  Vite starts on http://localhost:5173/
The React app proxies API calls to http://localhost:3001/.


10. Verify everything works

Open http://localhost:5173/
Register a Customer account (fill all fields).
Login → Home dashboard.
Go to Scan and enter secret-key-1 → Stamp recorded!
Check Rewards – stamps, tier, and activity populate live.


11. Building for production

# creates static assets in /dist
npm run build
# preview locally
npm run preview

12. Common troubleshooting

Symptom	                                            Fix
psql: could not connect to server	                Ensure Postgres is running; verify DATABASE_HOST & PORT.
password authentication failed	                    Role/password mismatch → update .env or recreate role.
relation "users" does not exist	                    You skipped psql -f schema.sql or pointed to wrong DB.
Browser shows CORS error	                        Start backend before Vite; both must run on localhost.