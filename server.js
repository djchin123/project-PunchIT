
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

/* ─────────────── POSTGRES ─────────────── */
const pool = new Pool({
  user:     process.env.DATABASE_USER,
  host:     process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port:     process.env.DATABASE_PORT,
});
const run = (q, p = []) => pool.query(q, p);

/* ─────────────── HELPERS ─────────────── */
const buildReferral = (f, l) =>
  f.toLowerCase().replace(/\s+/g, '') +
  l.toLowerCase().replace(/\s+/g, '') +
  Math.floor(1000 + Math.random() * 9000);

/* ─────────────── AUTH ─────────────── */
app.post('/api/register', async (req, res) => {
  const {
    first_name, last_name, email, password,
    phone, date_of_birth, user_type = 'customer'
  } = req.body;
  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const hashed = await hash(password, 10);
    const ref = buildReferral(first_name, last_name);

    const { rows } = await run(
      `INSERT INTO Users
         (first_name,last_name,email,password,phone,date_of_birth,
          referral_code,user_type)
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

/* ─────────────── PROFILE ─────────────── */
app.get('/api/customer/:id/profile', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await run(
      `SELECT user_id,first_name,last_name,email,phone,date_of_birth,created_at
         FROM Users WHERE user_id=$1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not fetch profile' });
  }
});

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

/* ─────────────── DASHBOARD + REWARDS SUMMARY ─────────────── */
app.get('/api/customer/:id/summary', async (req, res) => {
  const { id } = req.params;
  try {
    let { rows } = await run(
      `SELECT user_id, first_name, referral_code,
              current_stamps, total_stamps, created_at
         FROM Users WHERE user_id=$1`, [id]);

    if (!rows.length) return res.status(404).json({ error:'User not found' });

    // if an older account somehow has NULL referral_code, generate one on-the-fly
    let u = rows[0];
    if (!u.referral_code) {
      const newCode =
        u.first_name.toLowerCase().replace(/\s+/g,'') +
        Math.floor(1000+Math.random()*9000);
      await run('UPDATE Users SET referral_code=$1 WHERE user_id=$2',
                [newCode, id]);
      u.referral_code = newCode;
    }

/* tier thresholds: 0-3 Bronze, 4-7 Silver, 8+ Gold */
const tier = "Bronze"; // default

if (u.total_stamps >= 12) {tier = 'Gold';} 
else if (u.total_stamps >= 8) {tier = 'Silver';}
else if (u.total_stamps >= 4) {tier = 'Bronze';}


    const actQ = await run(
      `SELECT scanned_at AS date, activity, change AS stamps
         FROM Stamps WHERE user_id=$1
         ORDER BY scanned_at DESC LIMIT 50`, [id]);

    const refQ = await run(
      'SELECT COUNT(*) FROM Referrals WHERE referrer_id=$1', [id]);

    res.json({
      first_name     : u.first_name,
      referral_code  : u.referral_code,
      current_stamps : u.current_stamps,
      total_stamps   : u.total_stamps,
      tier,
      referral_count : Number(refQ.rows[0].count),
      activity       : actQ.rows
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error:'Failed to fetch summary' });
  }
});

/* ─────────────── ADD-STAMP (Scan) ─────────────── */
app.post('/api/customer/:id/add-stamp', async (req, res) => {
  const { id } = req.params;
  const { secret_key } = req.body;
  if (!secret_key) return res.status(400).json({ error: 'Key required' });

  try {
    const keyQ = await run(
      'SELECT key_value FROM SecretKeys WHERE key_value=$1 AND is_active=TRUE',
      [secret_key]
    );
    if (!keyQ.rows.length)
      return res.status(400).json({ error: 'Invalid secret key' });

    await run('BEGIN');

    const user = await run(
      `UPDATE Users
          SET total_stamps   = total_stamps + 1,
              current_stamps = CASE WHEN current_stamps < 12
                                    THEN current_stamps + 1
                                    ELSE current_stamps END
        WHERE user_id=$1
        RETURNING current_stamps,total_stamps`, [id]);

    if (!user.rows.length) {
      await run('ROLLBACK');
      return res.status(404).json({ error: 'User not found' });
    }

    await run(
      `INSERT INTO Stamps (user_id, change, activity)
       VALUES ($1, 1, 'Visit Location')`, [id]);

    await run('COMMIT');
    res.json({ message: 'Stamp added' });
  } catch (e) {
    await run('ROLLBACK');
    console.error(e);
    res.status(500).json({ error: 'Could not add stamp' });
  }
});

/* ─────────────── REDEEM ─────────────── */
app.post('/api/customer/:id/redeem', async (req, res) => {
  const { id } = req.params;
  const { reward_title, reward_cost } = req.body;
  if (!reward_title || !reward_cost)
    return res.status(400).json({ error: 'Title & cost required' });

  try {
    const u = await run('SELECT current_stamps FROM Users WHERE user_id=$1', [id]);
    if (!u.rows.length) return res.status(404).json({ error:'User not found' });

    if (u.rows[0].current_stamps < reward_cost)
      return res.status(400).json({ error:'Not enough stamps' });

    await run('BEGIN');

    await run(
      `UPDATE Users
          SET current_stamps = current_stamps - $1
        WHERE user_id = $2`,
      [reward_cost, id]);

    await run(
      `INSERT INTO RewardRedemptions (user_id, reward_title, reward_cost)
       VALUES ($1,$2,$3)`,
      [id, reward_title, reward_cost]);

    // send NEGATIVE value via param list (avoids ambiguous operator)
    await run(
      `INSERT INTO Stamps (user_id, change, activity)
       VALUES ($1, $2, 'Stamp Redeemed: '||$3)`,
      [id, -reward_cost, reward_title]);

    await run('COMMIT');
    res.json({ message:'Reward redeemed' });
  } catch (e) {
    await run('ROLLBACK');
    console.error(e);
    res.status(500).json({ error:'Redeem failed' });
  }
});

/* ─────────────── LISTEN ─────────────── */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
