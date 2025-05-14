/* tests/server.spec.js */
import request from 'supertest';
import { app } from '../server.js';           // path relative to repo root
import { v4 as uuid } from 'uuid';

const api = request(app);
const rnd  = () => Math.floor(Math.random() * 9000);     // small helper

// Re-used across tests
let user   = {};
const pass = 'T3stP@ss!';

describe('PunchIT API – end-to-end', () => {

  // ------------------------------------------------------------------
  it('registers a new customer', async () => {
    const email = `test_${rnd()}@punchit.dev`;

    const res = await api.post('/api/register').send({
      first_name: 'Test',
      last_name : 'User',
      email,
      password : pass,
      phone    : '1234567890',
      date_of_birth: '2000-01-01',
      user_type: 'customer'
    });

    expect(res.status).toBe(201);
    expect(res.body.user_id).toBeDefined();
    expect(res.body.referral_code).toMatch(/[a-z]+[0-9]{4}/i);

    user.id    = res.body.user_id;
    user.email = email;
  });

  // ------------------------------------------------------------------
  it('logs in with correct credentials', async () => {
    const res = await api.post('/api/login').send({
      email: user.email, password: pass
    });

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty('user_id', user.id);
    user = { ...user, ...res.body.user };
  });

  // ------------------------------------------------------------------
  it('retrieves the profile', async () => {
    const res = await api.get(`/api/customer/${user.id}/profile`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(user.email);
  });

  // ------------------------------------------------------------------
  it('updates the profile fields', async () => {
    const res = await api.put(`/api/customer/${user.id}`).send({
      first_name: 'Tester', last_name: 'Updated', phone: '7777777777',
      date_of_birth: '1999-12-31'
    });
    expect(res.status).toBe(200);

    // confirm change
    const chk = await api.get(`/api/customer/${user.id}/profile`);
    expect(chk.body.first_name).toBe('Tester');
    expect(chk.body.phone).toBe('7777777777');
  });

  // ------------------------------------------------------------------
  it('adds a stamp with a valid secret key', async () => {
    const res = await api
      .post(`/api/customer/${user.id}/add-stamp`)
      .send({ secret_key: 'secret-key-1' });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/Stamp added/);
  });

  // ------------------------------------------------------------------
  it('rejects an invalid secret key', async () => {
    const res = await api
      .post(`/api/customer/${user.id}/add-stamp`)
      .send({ secret_key: 'bad-key' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid secret key/);
  });

  // ------------------------------------------------------------------
  it('returns proper summary & tier calculation', async () => {
    // add 7 more stamps to push total >= 8 (Gold)
    for (let i = 0; i < 7; i++) {
      await api.post(`/api/customer/${user.id}/add-stamp`)
               .send({ secret_key: `secret-key-${(i%10)+1}` });
    }

    const res = await api.get(`/api/customer/${user.id}/summary`);
    expect(res.status).toBe(200);
    expect(res.body.total_stamps).toBeGreaterThanOrEqual(8);
    expect(res.body.tier).toBe('Gold');      // new rule: 8+ ⇒ Gold
  });

  // ------------------------------------------------------------------
  it('redeems a reward and logs activity', async () => {
    const before = await api.get(`/api/customer/${user.id}/summary`);
    const prevStamps = before.body.current_stamps;

    const res = await api
      .post(`/api/customer/${user.id}/redeem`)
      .send({ reward_title:'One Free Photo', reward_cost:4 });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/redeemed/i);

    const after = await api.get(`/api/customer/${user.id}/summary`);
    expect(after.body.current_stamps).toBe(prevStamps - 4);
    // tier should **not drop**
    expect(after.body.tier).toBe('Gold');
  });

  // ------------------------------------------------------------------
  it('blocks redeem when not enough stamps', async () => {
    const res = await api
      .post(`/api/customer/${user.id}/redeem`)
      .send({ reward_title:'Expensive Prize', reward_cost:100 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Not enough stamps/);
  });
  it('rejects login with wrong password', async () => {
    const res = await api.post('/api/login').send({
      email: user.email,
      password: 'wrong_pw'
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });
  
  it('404s on non-existent profile', async () => {
    const fake = uuid();                           // random UUID
    const res  = await api.get(`/api/customer/${fake}/profile`);
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/user not found/i);
  });
  
  it('400s when redeem payload is incomplete', async () => {
    const res = await api
      .post(`/api/customer/${user.id}/redeem`)
      .send({ reward_title: 'Oops no cost field' });   // missing reward_cost
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Title & cost required/);
  });
  it('400s when registering with missing required fields', async () => {
    const res = await api.post('/api/register').send({
      first_name: 'NoEmail', last_name: 'User', password: 'pass'
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required fields/);
  });
  
  it('400s when /add-stamp has no secret_key payload', async () => {
    const res = await api
      .post(`/api/customer/${user.id}/add-stamp`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Key required/);
  });
  
  it('summary returns Bronze tier for brand-new account', async () => {
    // create a fresh user with zero stamps
    const email = `new_${rnd()}@punchit.dev`;
    const reg = await api.post('/api/register').send({
      first_name: 'Zero', last_name: 'Stamps', email,
      password: 'Z3ro!!', user_type: 'customer'
    });
    const newId = reg.body.user_id;
  
    const sum = await api.get(`/api/customer/${newId}/summary`);
    expect(sum.status).toBe(200);
    expect(sum.body.current_stamps).toBe(0);
    expect(sum.body.tier).toBe('Bronze');
  });
  
  it('enforces 12-stamp cap in current_stamps', async () => {
    // punch 20 stamps – only 12 should be stored
    for (let i = 0; i < 20; i++) {
      await api.post(`/api/customer/${user.id}/add-stamp`)
               .send({ secret_key: `secret-key-${(i%10)+1}` });
    }
  
    const sum = await api.get(`/api/customer/${user.id}/summary`);
    expect(sum.status).toBe(200);
    expect(sum.body.current_stamps).toBeLessThanOrEqual(12);
    expect(sum.body.total_stamps).toBeGreaterThan(12);   // lifetime continues
  });

});
