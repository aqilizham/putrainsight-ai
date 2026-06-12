# NotebookLM Knowledge Hub

PutraInsight AI 2.0 uses NotebookLM as the institutional knowledge hub. Gemini can reason and generate recommendations, but Gemini alone may answer from broad general knowledge. For a UPM competition project, that is not enough.

NotebookLM is required because it grounds recommendations in official UPM sources: academic rules, advising guidelines, counselling services, welfare services, student development programmes, career pathways, and Jiwa Putra values. This makes the platform feel like a UPM support navigator rather than a generic chatbot.

## Why Gemini Alone Is Insufficient

Gemini is strong for reasoning, summarising, and generating personalized success plans, but without source grounding it may:

- recommend support channels that do not exist at UPM;
- use generic language that misses Jiwa Putra values;
- overlook official academic procedures and timelines;
- create advice that sounds plausible but is not institutionally verified.

## How NotebookLM Grounds Recommendations

The workflow is:

1. Curate official UPM sources into NotebookLM.
2. Ask NotebookLM to retrieve relevant passages and source summaries.
3. Send grounded context into Gemini.
4. Gemini generates a Student Success Score explanation, support recommendation, mentor pathway, and 30-day success plan.
5. The dashboard displays source confidence and source names.

## How NotebookLM Reduces Generic AI Advice

NotebookLM keeps the recommendation engine close to UPM's own support ecosystem. Instead of saying "talk to a counsellor", PutraInsight can recommend UPM Counselling Division services. Instead of saying "join activities", it can recommend UPM student development, SULAM, Jiwa Putra, volunteer, leadership, and career-related pathways.

## How This Supports PutraInsight AI 2.0

NotebookLM turns official UPM knowledge into a trusted recommendation layer. Gemini then transforms that grounded knowledge into personalized, positive, student-centred guidance. Together, they support the competition positioning:

> Student Success and Support Recommendation Platform

The system is not a risk prediction platform. It helps students thrive through academic guidance, mentorship, wellbeing support, welfare services, leadership opportunities, and development pathways.

