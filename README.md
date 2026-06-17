# PutraInsight AI 2.0

Student Success Navigator for Solusi AI Jiwa Putra 2026, Universiti Putra Malaysia.

Live demo: https://aqilizham.github.io/putrainsight-ai/

PutraInsight AI 2.0 is a Student Success and Support Recommendation Platform. It helps students thrive through personalized guidance, mentorship, wellbeing resources, welfare support, leadership opportunities, development programmes, and a 30-day success pathway.

## Final Polish Executive Summary

The final polished prototype prepares PutraInsight AI 2.0 for poster, video, and live competition presentation. It combines:

- premium UPM-inspired branding;
- a multi-student command center;
- dynamic student detail pages;
- a visible AI Insight Engine;
- NotebookLM source grounding;
- Jiwa Putra impact storytelling;
- a mobile companion preview;
- a screenshot-ready Showcase Board for poster and pitch video production.

The prototype uses static HTML, CSS, JavaScript, and synthetic/anonymized data only.

## Project Concept

PutraInsight AI 2.0 analyzes anonymized student indicators and produces:

- Student Success Score
- Success Pathway
- Growth Opportunity
- Support Recommendation
- Mentor Recommendation
- Development Recommendation
- 30-Day Success Plan

The language is intentionally positive and empowering. Every insight is framed as a pathway to support, growth, and belonging.

## NotebookLM Role

NotebookLM grounds the recommendation engine using official UPM sources. This ensures recommendations refer to actual UPM services, academic rules, counselling channels, student welfare pathways, leadership opportunities, and Jiwa Putra values.

## Gemini Role

Gemini provides the reasoning layer over anonymized student indicators and NotebookLM-grounded source context. It generates student-friendly explanations, factor breakdowns, ranked support recommendations, and personalized success plans.

## Student Success Score

The Student Success Score is a positive composite indicator for guidance and support planning. It can consider academic trend, attendance, assessment performance, advisor engagement, confidence, stress, and awareness of support services.

## Demo Screens

1. Launch product introduction
2. Overview command center
3. Students table with search and category filters
4. Student Detail
5. AI Insight Engine
6. NotebookLM Hub
7. Jiwa Putra Impact
8. Mobile Preview
9. Showcase Board

## Competition Poster

The A4 digital poster is available in:

- [poster/poster.html](poster/poster.html)
- [poster/README.md](poster/README.md)

It is designed for browser export to PDF or PNG using A4 portrait settings.

## Data Privacy

The demo uses `demo/data.json`, which contains 20 synthetic/anonymized student records from `Student A001` to `Student A020`.

The prototype does not include names, emails, phone numbers, matric numbers, respondent records, API keys, tokens, credentials, or environment secret files.

## NotebookLM Source Catalog

The full catalog is available at:

- [notebooklm_sources/source_catalog.csv](notebooklm_sources/source_catalog.csv)
- [notebooklm_sources/source_catalog.md](notebooklm_sources/source_catalog.md)
- [notebooklm_sources/search_log.md](notebooklm_sources/search_log.md)
- [notebooklm_sources/README.md](notebooklm_sources/README.md)

## File Tree

```text
.
|-- README.md
|-- index.html
|-- demo
|   |-- README.md
|   |-- assets
|   |   `-- concept-putrainsight.png
|   |-- data.json
|   |-- index.html
|   |-- script.js
|   `-- styles.css
`-- notebooklm_sources
    |-- README.md
    |-- search_log.md
    |-- source_catalog.csv
    `-- source_catalog.md
```

## Demo Instructions

Open the live demo at:

https://aqilizham.github.io/putrainsight-ai/

Recommended 2-minute flow:

1. Launch
2. Overview
3. Students
4. Student Detail
5. AI Insight
6. NotebookLM Hub
7. Jiwa Putra Impact
8. Showcase Board

For local testing, serve the project root with any static HTTP server and open `/demo/`.

## GitHub Pages

GitHub Pages should use:

- Branch: `main`
- Folder: `/(root)`

The root `index.html` redirects to `demo/`.

## Recommendations To Strengthen The Project Further

- Add the official competition PDF to NotebookLM as the highest-priority source once available.
- Prepare a 2-minute narration script that follows the V3 demo flow.
- Use the Showcase Board screen as a screenshot source for the poster and pitch video.
- Add faculty-specific source grounding if official faculty advising resources are selected.
