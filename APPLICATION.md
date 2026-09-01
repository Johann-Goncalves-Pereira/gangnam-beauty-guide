# Gangnam Beauty Guide — Job Application Drafts

Copy-paste answers for the application form. Fill in Q5 (machine/RAM/tools) and
Q8 (values ranking) yourself.

---

## 1. Ship one small real thing (AI-driven)

**What you decided to build (one sentence)**

I built a Review Trust Card that turns a Korean clinic review into a normalised
English card with clinic, procedure, surgeon, and trust/red-flag signals.

**Your approach + prompts**

I picked the hardest part of GBG’s moat — not another landing page — and shipped
a single-page tool: curated Korean samples (always demoable) plus live
extraction via `POST /api/extract-review` on Vercel with Effect Schema
validation on both sides.

**Prompt (system message, final version):**

```
You are a medical tourism review analyst for Gangnam Beauty Guide. Given a Korean clinic review, extract structured trust signals for English-speaking medical tourists.

Return JSON matching this exact shape:
{
  "trustCard": {
    "sourceText": "<original Korean text>",
    "translatedText": "<fluent English translation>",
    "clinic": {
      "displayName": "<normalised English clinic name or Unknown clinic>",
      "aliases": ["<Korean or alternate names>"]
    },
    "procedure": {
      "name": "<procedure in English>",
      "category": "<nose|eyes|injectable|laser|body|facial|other>"
    },
    "surgeonMentioned": "<optional: surgeon name or title if mentioned>",
    "trustSignals": ["verified_procedure", "surgeon_named", "before_after", "price_stated", "detailed_recovery", "language_support"],
    "redFlags": ["ghost_surgery_risk", "pressure_tactics", "unverifiable_claim", "price_mismatch", "consultant_substitution"],
    "sentiment": "positive" | "mixed" | "negative",
    "confidence": <number 0-1>
  }
}

Rules:
- Normalise clinic names to English forms international patients would search.
- Only include trustSignals clearly evidenced in the text.
- Flag ghost_surgery_risk when the performing surgeon is unclear.
- Omit surgeonMentioned if no surgeon is named or referenced.
- Be conservative with confidence scores.
```

**Design decisions (not just the prompt)**

- Seoul night clinical palette (ink + jade), Fraunces + DM Sans — avoided
  purple-on-white AI slop.
- Samples work without an API key so the Vercel link always demonstrates value.
- Trust signals vs red flags as separate chip rows — mirrors how a buyer
  actually decides.
- Effect Schema at API boundary so LLM JSON drift fails loudly, not silently.

**Link:** `https://YOUR-VERCEL-URL.vercel.app` (replace after deploy)

**What the AI got right**

Schema-first extraction mapped well to trust/red-flag enums. Translation quality
on sample rhinoplasty and eyelid reviews was usable without hand-editing. OpenAI
json_object mode mostly returned parseable shapes on first try.

**What you had to debug, rewrite, or push back on**

LLM occasionally invented clinic names — fixed with “Unknown clinic” default and
conservative confidence. ESLint rejected unsafe `response.json()` typing in the
serverless handler; rewrote with explicit `unknown` narrowing. SPA rewrite
initially would have swallowed `/api/*`; excluded API routes in `vercel.json`.

---

## 2. One technical issue or improvement

**The issue**

On `/en/tools/tax-refund/`, the calculator still promises “up to 10%” VAT
refunds. Korea abolished cosmetic VAT refunds on 1 Jan 2026. For medical
tourists planning 2026 trips, this is a trust and budgeting error — worse than a
slow page.

**Your fix**

Sunset the calculator: add a site-wide banner (“Cosmetic VAT refunds ended 1 Jan
2026”), replace the tool with a short explainer (grandfather rules for 2025
payments, full-price planning), and update meta/FAQ copy. Prompt:

```
On gangnambeautyguide.com/en/tools/tax-refund/, remove the 10% refund calculator.
Add a banner: cosmetic VAT refunds ended 1 Jan 2026. Replace with an explainer:
who still qualifies (paid before 31 Dec 2025), what changed, link to procedure
cost guides. Update page title and meta description.
```

---

## 3. A recent moment you used AI past your skill level

I used Cursor to scaffold a Vercel serverless function that validates OpenAI
output with Effect Schema — a stack I hadn’t combined before. The AI proposed
the handler shape; I had to narrow `unknown` JSON manually to satisfy strict
ESLint. I learned that AI-generated API glue often assumes loose typing;
schema-at-the-boundary is non-negotiable for medical-trust data.

---

## 4. Your technical foundation

I’ve shipped React SPAs with TanStack Router/Query, validated env and API
responses with Effect Schema, and deployed to Vercel with serverless routes.
Deliberate choice here: Effect Effects for the client API layer instead of raw
fetch in components — keeps abort/cancel semantics correct for Query and forces
decode at the edge.

---

## 5. Your machine + AI toolkit

Fill in yourself: machine/chip, RAM, AI tools (min 3), role-specific tools.

---

## 6. When an AI agent produced wrong output

Building this MVP, the agent used `as OpenAiResponse` on `response.json()`,
which passed tsc but failed `@typescript-eslint/no-unsafe-assignment`.
Diagnosis: ts-reset types `json()` as `unknown`, but bracket access on parsed
arrays still inferred `any`. Fix: `isRecord()` guard +
`const first: unknown = choices.at(0)` before narrowing.

---

## 7. What you've been learning + committing to next

Last 90 days: Effect Schema for API boundaries, React Compiler patterns
(`useEffectEvent`), Vercel serverless with SPA rewrites. Next 6 months:
structured LLM extraction pipelines (eval sets, schema drift monitoring) and
medical-tourism domain modeling (clinic normalisation, review dedupe).

---

## 8. Rank what you value in a job

Drag/reorder in the form yourself — no right answer.

---

## 9. What didn't you get to / more time?

Live Korean source syndication (Naver, GangnamUnni), clinic dedupe graph,
Pathfinder integration, and an eval harness comparing extraction quality across
models. With more time I’d add a small golden-set test suite for the extract
prompt and wire compare mode across 2–3 clinics from the production directory.
