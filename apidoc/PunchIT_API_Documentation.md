# PunchIT REST API Documentation

**Base URL (dev)** `http://localhost:3001`

All requests and responses are **JSON** (`Content-Type: application/json`). No authentication header is required in the current build—endpoints are open while the project is in local-dev mode.

| HTTP | Endpoint | Purpose |
|------|----------|---------|
| POST | `/api/register` | Create a new customer or business account |
| POST | `/api/login` | Log in with email + password |
| GET  | `/api/customer/:id/profile` | Fetch full profile (view) |
| PUT  | `/api/customer/:id` | Update editable profile fields |
| GET  | `/api/customer/:id/summary` | Dashboard summary (stamps, tier, activity) |
| POST | `/api/customer/:id/add-stamp` | Add a stamp via secret key |
| POST | `/api/customer/:id/redeem` | Redeem stamps for a reward |

---

## 1  POST `/api/register`
Create a new user.

```jsonc
// request body
{
  "first_name": "Jane",
  "last_name" : "Doe",
  "email"     : "jane@example.com",
  "password"  : "S3cur3!",
  "phone"     : "555‑111‑2222",        // optional
  "date_of_birth": "1999-04-05",      // optional (YYYY‑MM‑DD)
  "user_type" : "customer"            // or "business_owner" (default «customer»)
}
```

**201 Created**
```jsonc
{
  "message": "User registered",
  "user_id": "02c8b7e2‑b846‑4c6e‑b7c5‑…",
  "referral_code": "jane1234"
}
```

Errors: `400 Missing required fields` · `500 Registration failed`

---

## 2  POST `/api/login`
Log in and receive the full user object (minus password).

```jsonc
{ "email": "jane@example.com", "password": "S3cur3!" }
```

**200 OK**
```jsonc
{
  "message": "Login successful",
  "user": {
    "user_id": "…",
    "first_name": "Jane",
    "current_stamps": 3,
    "total_stamps"  : 3
  }
}
```

Errors: `400 Missing fields` · `401 Invalid credentials` · `500 Login failed`

---

## 3  GET `/api/customer/:id/profile`
Retrieve full profile data.

**200 OK**
```jsonc
{
  "user_id": "…",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "phone": "555-111-2222",
  "date_of_birth": "1999-04-05",
  "created_at": "2025-05-13T18:07:42.123Z"
}
```

Errors: `404 User not found` · `500 Could not fetch profile`

---

## 4  PUT `/api/customer/:id`
Update editable fields (first/last name, phone, birthday).

```jsonc
{
  "first_name": "Janette",
  "last_name": "Updated",
  "phone": "555‑333‑4444",
  "date_of_birth": "1998-12-01"
}
```

**200 OK**
```jsonc
{ "message": "Profile updated" }
```

Errors: `500 Update failed`

---

## 5  GET `/api/customer/:id/summary`
Single endpoint powering Home & Rewards dashboards.

**200 OK**
```jsonc
{
  "first_name": "Jane",
  "referral_code": "jane1234",
  "current_stamps": 5,
  "total_stamps": 17,
  "tier": "Gold",
  "referral_count": 2,
  "activity": [
    {
      "date": "2025-05-13T18:45:16.987Z",
      "activity": "Stamp Redeemed: One Free Photo",
      "stamps": -4
    },
    {
      "date": "2025-05-13T18:32:01.456Z",
      "activity": "Visit Location",
      "stamps": 1
    }
  ]
}
```

Errors: `404 User not found` · `500 Failed to fetch summary`

---

## 6  POST `/api/customer/:id/add-stamp`
Add **one** stamp using a secret key.

```jsonc
{ "secret_key": "secret-key-3" }
```

**200 OK**
```jsonc
{ "message": "Stamp added" }
```

Errors: `400 Key required` · `400 Invalid secret key` · `404 User not found` · `500 Could not add stamp`

> Stored `current_stamps` capped at **12**; `total_stamps` always increments.

---

## 7  POST `/api/customer/:id/redeem`
Redeem stored stamps for a reward.

```jsonc
{ "reward_title": "One Free Photo", "reward_cost": 4 }
```

**200 OK**
```jsonc
{ "message": "Reward redeemed" }
```

Errors: `400 Title & cost required` · `400 Not enough stamps` · `404 User not found` · `500 Redeem failed`

On success:
1. Deducts `reward_cost` from `current_stamps`.
2. Inserts row in **RewardRedemptions**.
3. Logs negative entry in **Stamps**.

---

## Environment variables (`.env`)
| Var | Description |
|-----|-------------|
| `DATABASE_USER` | Postgres role |
| `DATABASE_PASSWORD` | Role password |
| `DATABASE_HOST` | Usually `localhost` |
| `DATABASE_PORT` | Default `5432` |
| `DATABASE_NAME` | Database name (`punchit_db`) |

---

## HTTP status codes
| Code | Meaning |
|------|---------|
| `200 OK` | Success |
| `201 Created` | Resource created |
| `400 Bad Request` | Client error |
| `401 Unauthorized` | Invalid credentials |
| `404 Not Found` | Resource missing |
| `500 Internal Server Error` | Server/DB error |

---

### cURL example: Add a stamp
```bash
curl -X POST http://localhost:3001/api/customer/<USER_ID>/add-stamp      -H "Content-Type: application/json"      -d '{"secret_key":"secret-key-1"}'
```

Response → `{ "message": "Stamp added" }`
