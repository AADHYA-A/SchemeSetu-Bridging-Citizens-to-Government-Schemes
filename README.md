# 🌉 SchemeSetu

**Bridging citizens to the government schemes they deserve.**

A bilingual (English / हिन्दी) full-stack web app that tells people which central government schemes they likely qualify for, in under a minute.

Built for **VORTEX 2K26 – Global AI Innovation Hackathon** · Theme: **AI for Bharat & Public Services**

[**Live Demo**](https://scheme-setu-bridging-citizens-to-go.vercel.app/) · [Problem](#-the-problem) · [Features](#-features) · [Architecture](#-architecture) · [Run Locally](#-run-locally) · [API](#-api-reference) · [Roadmap](#-roadmap)

---

## 🎯 The Problem

Welfare schemes exist, but awareness and access do not.

- **Scattered information:** dozens of central schemes, each with its own portal, rules and income cutoffs.
- **Language barrier:** most scheme information is in formal English, excluding rural and first-time digital users.
- **Missed benefits:** eligible families skip pensions, insurance, housing and health cover because they never learn they qualify.

## 💡 Our Solution

SchemeSetu turns a one-minute questionnaire into a personalised list of schemes.

1. **Tell us about you:** age, income, gender, occupation, category, bank account, house, family.
2. **Instant matching:** a backend rule engine checks eligibility across 11 central schemes.
3. **Clear next steps:** see the benefit and the exact documents to carry, in English or हिन्दी.

## ✨ Features

- 🗣️ **Bilingual UI** with instant English ↔ हिन्दी toggle
- ⚡ **Instant results** from a lightweight REST API
- 📄 **Document checklist** for every matched scheme
- 🔒 **Privacy first:** no accounts, no tracking, no data stored
- 📱 **Mobile-first**, responsive, with automatic dark mode
- 🧩 **Easily extensible:** adding a scheme is a data change, not a rewrite

## 🏛️ Schemes Covered

| Scheme | Benefit (summary) |
|---|---|
| PM-KISAN | ₹6,000/year income support for farmers |
| Ayushman Bharat PM-JAY | Health cover up to ₹5 lakh per family per year |
| PM Ujjwala Yojana | Free LPG connection for women from poor households |
| PM Awas Yojana | Financial help / interest subsidy for housing |
| Sukanya Samriddhi Yojana | High-interest savings for a girl child |
| Atal Pension Yojana | Guaranteed pension of ₹1,000–5,000/month after 60 |
| PM Jeevan Jyoti Bima Yojana | ₹2 lakh life cover |
| PM Suraksha Bima Yojana | ₹2 lakh accident cover |
| Stand-Up India | Loans of ₹10 lakh–₹1 crore for SC/ST/women entrepreneurs |
| PM Vishwakarma | Training, toolkit incentive and credit for artisans |
| Post-Matric Scholarship (SC/ST/OBC) | Tuition support and maintenance allowance |

> Eligibility rules are simplified and indicative. Always confirm on [myscheme.gov.in](https://www.myscheme.gov.in) or at your nearest Common Service Centre.

## 🏗️ Architecture

```
┌──────────────┐   POST /api/match   ┌──────────────┐     ┌──────────────┐
│   Frontend   │ ──────────────────▶ │  Express API │ ──▶ │ Rule Engine  │
│ HTML/CSS/JS  │ ◀────────────────── │  (validate)  │ ◀── │ schemes.js   │
└──────────────┘   matching schemes  └──────────────┘     └──────────────┘
```

```
schemesetu/
├── frontend/
│   └── index.html      # UI: EN/HI toggle, dark mode, mobile-first
├── backend/
│   ├── server.js       # Express API + static hosting of the frontend
│   ├── schemes.js      # Scheme catalogue and eligibility rules
│   └── package.json
└── README.md
```

**Tech stack:** Node.js, Express, vanilla JavaScript, HTML5, CSS3

## 🚀 Run Locally

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/<your-username>/schemesetu.git
cd schemesetu/backend
npm install
npm start
```

Open **http://localhost:3000**. The backend serves the frontend, so one command runs everything.

## 📡 API Reference

### `POST /api/match`

Returns the schemes a profile likely qualifies for.

**Request**

```json
{
  "age": 30,
  "inc": 2,
  "gen": "f",
  "occ": "farmer",
  "cat": "SC",
  "bank": true,
  "house": false,
  "girl": true
}
```

| Field | Type | Values |
|---|---|---|
| `age` | number | 0–110 |
| `inc` | number | Annual household income in ₹ lakh |
| `gen` | string | `f`, `m`, `o` |
| `occ` | string | `farmer`, `artisan`, `student`, `unorg`, `salaried`, `business`, `homemaker` |
| `cat` | string | `General`, `OBC`, `SC`, `ST` |
| `bank`, `house`, `girl` | boolean | Has bank account · owns pucca house · has girl child under 10 |

**Response**

```json
{
  "count": 7,
  "matches": [
    {
      "n": ["PM-KISAN", "पीएम-किसान"],
      "b": ["₹6,000 per year in 3 instalments", "₹6,000 प्रति वर्ष, 3 किस्तों में"],
      "d": ["Aadhaar, land records, bank passbook", "आधार, भूमि रिकॉर्ड, बैंक पासबुक"]
    }
  ]
}
```

`n` = name, `b` = benefit, `d` = documents, each as `[English, Hindi]`.

### `GET /api/schemes`
Returns the full scheme catalogue.

### `GET /api/health`
Returns `{ "status": "ok", "schemes": 11 }`.

## ☁️ Deployment

Deploys as a single service on Render, Railway or similar:

- **Root directory:** `backend`
- **Build command:** `npm install`
- **Start command:** `npm start`

## 🗺️ Roadmap

- [x] Rule-based matching, English/Hindi, REST API
- [ ] LLM assistant that explains schemes in plain language and regional languages
- [ ] State-specific schemes
- [ ] Voice input and WhatsApp bot
- [ ] Live data from official scheme portals
- [ ] Exportable document checklist

## 🌍 Impact & Scalability

- **Impact:** helps eligible citizens, especially in rural India, discover benefits they would otherwise miss.
- **Scalable:** rules live in a single catalogue; new schemes, states and languages are data additions.
- **Stateless:** no database, so it scales horizontally with no extra infrastructure.

## ⚠️ Disclaimer

SchemeSetu provides indicative eligibility only and is not an official government service. Actual eligibility depends on official guidelines, state rules and verification. No user data is stored or transmitted beyond the match request.

## 📜 License

MIT

---

<p align="center">Built with ❤️ for VORTEX 2K26 · Build. Innovate. Impact.</p>
