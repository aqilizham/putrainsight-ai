# PutraInsight AI 2.0

Student Success Navigator for Solusi AI Jiwa Putra 2026, Universiti Putra Malaysia.

PutraInsight AI 2.0 is positioned as a Student Success and Support Recommendation Platform. It is not a risk prediction platform. The system helps students thrive through personalized guidance, mentorship, wellbeing resources, welfare support, leadership opportunities, development programmes, and a 30-day success pathway.

## Executive Summary

UPM can move from reactive student support to proactive student success by combining anonymized student indicators, a positive Student Success Score, official UPM knowledge sources, and AI-generated recommendations. NotebookLM acts as the institutional knowledge hub, while Gemini acts as the reasoning and recommendation engine.

The demo package includes:

- Official UPM NotebookLM source catalog.
- Competition-ready web dashboard mockup.
- Competition-ready mobile app mockup.
- GitHub Pages-ready static demo.
- Documentation for pitching, poster preparation, and deployment.

## Project Concept

PutraInsight AI 2.0 analyzes anonymized student indicators and produces:

- Student Success Score
- Success Pathway
- Growth Opportunity
- Support Recommendation
- Mentor Recommendation
- Development Recommendation
- 30-Day Success Plan

The language is intentionally positive and empowering. The platform avoids deficit labels and frames every insight as a pathway to support, growth, and belonging.

## NotebookLM Role

NotebookLM grounds the recommendation engine using official UPM sources. This ensures recommendations refer to actual UPM services, academic rules, counselling channels, student welfare pathways, leadership opportunities, and Jiwa Putra values.

## Gemini Role

Gemini reasons over anonymized student indicators and NotebookLM-grounded source context. It generates student-friendly explanations, ranked support recommendations, and a personalized success plan.

## Student Success Score

The Student Success Score is a positive composite indicator for guidance and support planning. It can consider academic trend, attendance, assessment performance, advisor engagement, confidence, stress, and awareness of support services. It should never be framed as failure prediction.

## Top 10 NotebookLM Sources

See [notebooklm_sources/source_catalog.md](notebooklm_sources/source_catalog.md) for ranked sources. The most important source areas are academic rules, academic advising, counselling, welfare services, PUTRAFLEX, SULAM, and Jiwa Putra.

## Full Source Catalog

The full catalog is available at:

- [notebooklm_sources/source_catalog.csv](notebooklm_sources/source_catalog.csv)
- [notebooklm_sources/source_catalog.md](notebooklm_sources/source_catalog.md)
- [notebooklm_sources/search_log.md](notebooklm_sources/search_log.md)
- [notebooklm_sources/README.md](notebooklm_sources/README.md)

## File Tree

```text
.
├── README.md
├── demo
│   ├── README.md
│   ├── assets
│   │   └── concept-putrainsight.png
│   ├── data.json
│   ├── index.html
│   ├── script.js
│   └── styles.css
└── notebooklm_sources
    ├── README.md
    ├── search_log.md
    ├── source_catalog.csv
    └── source_catalog.md
```

## Demo Instructions

Open [demo/index.html](demo/index.html) in a browser. The demo is static and uses relative paths only.

Pages included:

1. Landing Page
2. Student Success Dashboard
3. Student Success Profile
4. AI Recommendation Engine
5. NotebookLM Knowledge Hub
6. Jiwa Putra Impact Dashboard
7. Mobile App Mockup section

## GitHub Pages Instructions

Use the files inside `demo/` as the static site root. No backend is required.

For the simplest deployment, copy `demo/index.html`, `demo/styles.css`, `demo/script.js`, `demo/data.json`, and `demo/README.md` into the GitHub Pages publishing folder selected in repository settings.

## Missing Information

- No public official source URL was found for `Solusi AI Jiwa Putra 2026`.
- No public official source URL was found for `Bulan Sinergi Putra 2026`.
- Add the official competition brief, rubric, deadlines, and poster requirements when available.
- Add official UPM branding assets only if the competition permits use.

## Recommendations To Strengthen The Project

- Add the official competition PDF to NotebookLM as the highest-priority source.
- Include a short privacy slide explaining anonymization, consent, access control, and human-in-the-loop support decisions.
- Add a poster visual showing `Source -> NotebookLM -> Gemini -> Recommendation`.
- Prepare a live pitch script that emphasizes student empowerment and Jiwa Putra values.
- Add faculty-specific recommendation examples once official faculty advising resources are selected.
