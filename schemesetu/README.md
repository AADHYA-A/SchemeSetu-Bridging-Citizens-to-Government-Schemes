# SchemeSetu 🌉

**VORTEX 2K26 – Theme: AI for Bharat & Public Services**

Many eligible citizens miss welfare schemes because information is scattered, English-heavy and hard to match to personal situations. SchemeSetu turns a one-minute questionnaire into a personalised, bilingual (English/Hindi) list of central government schemes, benefits and documents to carry.

## Architecture
```
frontend/index.html   Responsive, dark-mode aware UI (vanilla JS), EN/HI toggle
backend/server.js     Express API + static hosting of the frontend
backend/schemes.js    Scheme catalogue and eligibility rules
```

| Endpoint | Description |
|---|---|
| `POST /api/match` | Body: `{age, inc, gen, occ, cat, bank, house, girl}` -> matching schemes |
| `GET /api/schemes` | Full scheme catalogue |
| `GET /api/health` | Health check |

## Run locally
```bash
cd backend
npm install
npm start        # http://localhost:3000
```

## Deploy (free)
Render / Railway: root directory `backend`, build `npm install`, start `npm start`.

## Roadmap
- LLM assistant to explain schemes in plain language and regional languages
- State-specific schemes, voice input, document checklist export
- Live data from official scheme portals

## Disclaimer
Indicative eligibility only. Confirm at https://www.myscheme.gov.in or a Common Service Centre. No user data is stored.
