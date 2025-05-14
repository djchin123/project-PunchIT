// server.js  – PunchIT API (customer-side only)
import cors    from 'cors';
import dotenv  from 'dotenv';
import express from 'express';
import { hash, compare } from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

/* ────────────────────────────  POSTGRES  ─────────────────────────────── */
const pool = new Pool({
  user:     process.env.DATABASE_USER,
  host:     process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port:     process.env.DATABASE_PORT,
});
const run = (q, p = []) => pool.query(q, p);

/* ────────────────────────────  HELPERS  ─────────────────────────────── */
const buildReferral = (f, l) =>
  f.toLowerCase().replace(/\s+/g, '') +
  l.toLowerCase().replace(/\s+/g, '') +
  Math.floor(1000 + Math.random() * 9000);

/* ────────────────────────────  AUTH  ────────────────────────────────── */
app.post('/api/register', async (req, res) => {
  const {
    first_name, last_name, email, password,
    phone, date_of_birth, user_type = 'customer'
  } = req.body;

  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const hashed = await hash(password, 10);
    const ref    = buildReferral(first_name, last_name);

    const { rows } = await run(
      `INSERT INTO Users
         (first_name,last_name,email,password,phone,date_of_birth,referral_code,user_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING user_id, referral_code`,
      [ first_name, last_name, email, hashed,
        phone, date_of_birth, ref, user_type ]
    );

    res.status(201).json({
      message: 'User registered',
      user_id: rows[0].user_id,
      referral_code: rows[0].referral_code
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const { rows } = await run('SELECT * FROM Users WHERE email=$1', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await compare(password, rows[0].password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    delete rows[0].password;
    res.json({ message: 'Login successful', user: rows[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Login failed' });
  }
});

/* ─────────────────────  CUSTOMER PROFILE ENDPOINTS  ──────────────────── */
// detailed profile (used by Account page)
app.get('/api/customer/:id/profile', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await run(
      `SELECT user_id, first_name, last_name, email, phone,
              date_of_birth, created_at
         FROM Users
        WHERE user_id=$1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not fetch profile' });
  }
});

// update editable profile fields
app.put('/api/customer/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, date_of_birth } = req.body;
  try {
    await run(
      `UPDATE Users
          SET first_name=$1,last_name=$2,phone=$3,date_of_birth=$4
        WHERE user_id=$5`,
      [first_name, last_name, phone, date_of_birth, id]
    );
    res.json({ message: 'Profile updated' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Update failed' });
  }
});

/* ─────────────────────────  SUMMARY / DASHBOARD  ─────────────────────── */
app.get('/api/customer/:id/summary', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await run(
      `SELECT first_name,last_name,email,phone,date_of_birth,created_at,
              current_stamps,total_stamps
         FROM Users
        WHERE user_id=$1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });

    const u = rows[0];
    const tier =
      u.total_stamps >= 24 ? 'Gold' :
      u.total_stamps >= 12 ? 'Silver' : 'Bronze';

    const act = await run(
      `SELECT scanned_at AS date, activity, change AS stamps
         FROM Stamps
        WHERE user_id=$1
        ORDER BY scanned_at DESC
        LIMIT 20`, [id]
    );

    res.json({ ...u, tier, activity: act.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

/* ────────────────────────────  OTHER CUSTOMER OPS  ───────────────────── */
// … (add-stamp, redeem, etc. unchanged from previous version) …

/* ────────────────────────────  LISTEN  ───────────────────────────────── */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
