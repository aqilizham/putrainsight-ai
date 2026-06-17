const state = {
  students: [],
  selectedId: "Student A001",
  activeScreen: "landing",
  categoryFilter: "All"
};

const categoryColors = {
  "Thriving": "#0f5a43",
  "Stable": "#c9a24a",
  "Needs Support": "#9a4b12",
  "Immediate Attention": "#7a1026"
};

const simulationBefore = {
  "Thriving": 6,
  "Stable": 7,
  "Needs Support": 5,
  "Immediate Attention": 2
};

const simulationAfter = {
  "Thriving": 10,
  "Stable": 8,
  "Needs Support": 2,
  "Immediate Attention": 0
};

const sourceCards = [
  {
    title: "Academic Support",
    source: "UPM Academic Rules and Academic Calendar",
    unit: "Division of Admission and Division of Academic Governance",
    use: "Grounds study planning, course milestones, assessment timing, and academic pathway advice.",
    type: "Academic planning and study support",
    priority: "High"
  },
  {
    title: "Academic Advising / Mentor-Mentee",
    source: "Academic Advising System Guideline",
    unit: "UPM Registrar Office",
    use: "Supports advisor check-ins, mentor routing, and progress reflection recommendations.",
    type: "Advisor-guided support",
    priority: "High"
  },
  {
    title: "Welfare / Financial Aid",
    source: "Student Welfare Services and Financial Assistance",
    unit: "Student Affairs Division",
    use: "Connects students to official support services when financial or welfare needs appear.",
    type: "Welfare pathway",
    priority: "High"
  },
  {
    title: "Counselling / Wellbeing",
    source: "UPM Counselling Division Services",
    unit: "UPM Counselling Division",
    use: "Grounds wellbeing nudges, voluntary counselling information, and confidence support.",
    type: "Wellbeing support information",
    priority: "High"
  },
  {
    title: "Leadership / Student Development",
    source: "Student Affairs Division and student activity resources",
    unit: "Student Affairs Division",
    use: "Matches students to leadership, volunteer, and student development opportunities.",
    type: "Leadership opportunity",
    priority: "Medium"
  },
  {
    title: "Career / Employability",
    source: "PUTRAFLEX, SULAM, work-based learning resources",
    unit: "CADe-Lead",
    use: "Recommends future-ready development pathways, career preparation, and service learning.",
    type: "Career and development pathway",
    priority: "Medium"
  },
  {
    title: "Jiwa Putra",
    source: "Jiwa Putra and Berilmu Berbakti sources",
    unit: "UPM / Student Affairs / Student Union",
    use: "Aligns success pathways with care, responsibility, contribution, and community impact.",
    type: "Values and impact pathway",
    priority: "High"
  }
];

function byId(id) {
  return document.getElementById(id);
}

function selectedStudent() {
  return state.students.find((student) => student.student_id === state.selectedId) || state.students[0];
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function average(items, key) {
  return Math.round(items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length);
}

function pct(value, total) {
  return Math.round((value / total) * 100);
}

function categoryClass(category) {
  return category.toLowerCase().replaceAll(" ", "-");
}

function categoryForScore(score) {
  if (score >= 80) return "Thriving";
  if (score >= 65) return "Stable";
  if (score >= 45) return "Needs Support";
  return "Immediate Attention";
}

function advisorLevel(student) {
  if (student.advisor_meetings >= 3) return "Strong advisor engagement";
  if (student.advisor_meetings >= 2) return "Active advisor engagement";
  if (student.advisor_meetings === 1) return "Light advisor engagement";
  return "Advisor outreach recommended";
}

function mainSupportNeed(student) {
  if (student.stress_level_1_5 >= 4) return "Wellbeing and confidence support";
  if (student.test1 < 70 || student.test2 < 70) return "Assessment preparation";
  if (student.knows_support_services_1_5 <= 2) return "Support services orientation";
  if (student.advisor_meetings < 2) return "Advisor check-in";
  return "Leadership and development stretch";
}

function shortAction(action) {
  const text = action.replace(/\s+/g, " ").trim();
  if (text.length <= 72) return text;
  return `${text.slice(0, 69).trim()}...`;
}

function supportNeedBuckets(students) {
  const buckets = [
    ["Academic guidance", (s) => /advisor|study|course|academic|assessment|coursework/i.test(s.recommended_action)],
    ["Wellbeing support", (s) => /wellbeing|counselling|confidence|stress/i.test(s.recommended_action)],
    ["Mentorship", (s) => /mentor|peer/i.test(s.recommended_action)],
    ["Leadership and development", (s) => /leadership|SULAM|volunteer|community|career|innovation|ambassador|entrepreneurship/i.test(s.recommended_action)]
  ];
  return buckets.map(([label, matcher]) => [label, students.filter(matcher).length]);
}

function renderSimulation(targetId, values) {
  const total = Object.values(values).reduce((sum, item) => sum + item, 0);
  byId(targetId).innerHTML = Object.entries(values)
    .map(([label, value]) => {
      const width = pct(value, total);
      return `<div class="bar-row"><span>${label}</span><div class="bar-track"><i class="bar-fill" style="width:${width}%; background:${categoryColors[label]}"></i></div><strong>${value}</strong></div>`;
    })
    .join("");
}

function renderOverview() {
  const students = state.students;
  const counts = countBy(students, "category");
  const mentorship = pct(students.filter((s) => s.advisor_meetings >= 2).length, students.length);
  const supportUse = pct(students.filter((s) => s.knows_support_services_1_5 >= 3).length, students.length);
  const metrics = [
    ["Total students", students.length, "anonymized profiles"],
    ["Thriving", counts["Thriving"] || 0, "high momentum"],
    ["Stable", counts["Stable"] || 0, "steady pathway"],
    ["Needs Support", counts["Needs Support"] || 0, "support opportunity"],
    ["Immediate Attention", counts["Immediate Attention"] || 0, "same-week guidance"],
    ["Average Success Score", average(students, "student_success_score"), "cohort view"],
    ["Mentorship Engagement", `${mentorship}%`, "2+ advisor meetings"],
    ["Support Utilization", `${supportUse}%`, "service awareness"]
  ];

  byId("overviewMetrics").innerHTML = metrics
    .map(([label, value, note]) => `<article class="metric-card"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`)
    .join("");

  const order = ["Thriving", "Stable", "Needs Support", "Immediate Attention"];
  byId("categoryDistribution").innerHTML = order
    .map((label) => {
      const value = counts[label] || 0;
      const width = pct(value, students.length);
      return `<div class="bar-row"><span>${label}</span><div class="bar-track"><i class="bar-fill" style="width:${width}%; background:${categoryColors[label]}"></i></div><strong>${value}</strong></div>`;
    })
    .join("");

  renderSimulation("beforeSimulation", simulationBefore);
  renderSimulation("afterSimulation", simulationAfter);

  const maxNeed = Math.max(...supportNeedBuckets(students).map(([, value]) => value));
  byId("supportNeeds").innerHTML = supportNeedBuckets(students)
    .map(([label, value]) => `<div class="need-row"><span>${label}</span><strong>${value}/${maxNeed}</strong></div>`)
    .join("");

  byId("recentRecommendations").innerHTML = students
    .slice(0, 5)
    .map((student) => `<button class="feed-row table-action" type="button" data-select="${student.student_id}" data-go="insight"><span><strong>${student.student_id}</strong> ${student.recommended_action}</span><span>${student.student_success_score}</span></button>`)
    .join("");

  byId("heroAverageScore").textContent = average(students, "student_success_score");
  byId("showcaseAvgScore").textContent = average(students, "student_success_score");
}

function renderFilters() {
  const filters = ["All", "Thriving", "Stable", "Needs Support", "Immediate Attention"];
  const counts = countBy(state.students, "category");
  byId("categoryFilters").innerHTML = filters
    .map((filter) => {
      const count = filter === "All" ? state.students.length : counts[filter] || 0;
      const active = state.categoryFilter === filter ? "active" : "";
      return `<button class="filter-chip ${active}" type="button" data-filter="${filter}">${filter}<span>${count}</span></button>`;
    })
    .join("");
}

function renderStudents(filter = "") {
  const query = filter.trim().toLowerCase();
  const rows = state.students.filter((student) => {
    const matchesCategory = state.categoryFilter === "All" || student.category === state.categoryFilter;
    const matchesQuery = [student.student_id, student.faculty, student.category, student.recommended_action]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return matchesCategory && matchesQuery;
  });

  byId("studentResultCount").textContent = `${rows.length} ${rows.length === 1 ? "student" : "students"} shown`;

  byId("studentRows").innerHTML = rows.length
    ? rows.map((student) => `
      <tr class="${student.student_id === state.selectedId ? "selected" : ""}">
        <td><strong>${student.student_id}</strong></td>
        <td>${student.faculty}</td>
        <td>Year ${student.year}</td>
        <td><strong>${student.student_success_score}</strong></td>
        <td><span class="table-badge ${categoryClass(student.category)}">${student.category}</span></td>
        <td><span class="action-summary" title="${student.recommended_action}">${shortAction(student.recommended_action)}</span></td>
        <td><button class="table-action" type="button" data-select="${student.student_id}" data-go="detail">View Details</button></td>
      </tr>
    `)
    .join("")
    : `<tr><td class="empty-state" colspan="7"><strong>No matching students</strong><span>Try another search term or choose a different support pathway filter.</span></td></tr>`;

  const student = selectedStudent();
  byId("selectedScoreCompact").textContent = student.student_success_score;
  byId("selectedCategoryCompact").textContent = student.category;
}

function renderDetail() {
  const student = selectedStudent();
  byId("selectedStudentPill").textContent = student.student_id;
  byId("heroStudent").textContent = student.student_id;
  byId("detailId").textContent = student.student_id;
  byId("detailFaculty").textContent = student.faculty;
  byId("detailCategory").textContent = student.category;
  byId("detailCategory").className = `category-badge ${categoryClass(student.category)}`;
  byId("detailScore").textContent = student.student_success_score;
  byId("detailScoreRing").style.setProperty("--score", student.student_success_score);
  byId("detailYear").textContent = `Year ${student.year}`;
  byId("detailAction").textContent = student.recommended_action;

  const diff = (student.gpa_current - student.gpa_previous).toFixed(2);
  byId("gpaTrendLabel").textContent = diff >= 0 ? `Recovery signal +${diff}` : `Growth opportunity ${diff}`;
  const target = Math.min(4, Math.max(student.gpa_current + 0.22, 3.15));
  const bars = [
    ["Previous", student.gpa_previous],
    ["Current", student.gpa_current],
    ["Target", Number(target.toFixed(2))]
  ];
  byId("gpaTrend").innerHTML = bars
    .map(([label, value]) => `<div class="trend-bar" style="height:${Math.max(38, value / 4 * 100)}%"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  const snapshot = [
    ["Current pathway", student.category],
    ["Main support need", mainSupportNeed(student)],
    ["Recommended first action", student.advisor_meetings < 2 ? "Advisor check-in" : "Mentor reflection"],
    ["Advisor engagement level", advisorLevel(student)]
  ];
  byId("studentSnapshot").innerHTML = snapshot
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  const indicators = [
    ["CGPA", student.cgpa],
    ["GPA Previous", student.gpa_previous],
    ["GPA Current", student.gpa_current],
    ["Test 1", student.test1],
    ["Test 2", student.test2],
    ["Quiz Average", `${student.quiz_average}%`],
    ["Coursework Average", `${student.coursework_average}%`],
    ["Attendance", `${student.attendance_percent}%`],
    ["Advisor Meetings", student.advisor_meetings],
    ["Stress Level", `${student.stress_level_1_5}/5`],
    ["Confidence Level", `${student.confidence_level_1_5}/5`],
    ["Knows Support Services", `${student.knows_support_services_1_5}/5`]
  ];
  byId("detailIndicators").innerHTML = indicators
    .map(([label, value]) => `<div class="indicator"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function factorContributions(student) {
  return [
    ["Attendance pattern", student.attendance_percent < 80 ? -18 : student.attendance_percent < 88 ? -8 : 8],
    ["Stress indicator", student.stress_level_1_5 >= 4 ? -15 : student.stress_level_1_5 === 3 ? -6 : 6],
    ["Confidence level", student.confidence_level_1_5 <= 2 ? -10 : student.confidence_level_1_5 === 3 ? -4 : 8],
    ["Advisor engagement", student.advisor_meetings <= 1 ? -8 : student.advisor_meetings === 2 ? 2 : 8],
    ["Assessment consistency", student.test1 < 70 || student.test2 < 70 ? -7 : 7],
    ["GPA recovery signal", student.gpa_current >= student.gpa_previous ? 10 : -6]
  ];
}

function supportFactors(student) {
  const factors = [];
  if (student.attendance_percent < 80) factors.push("Attendance pattern suggests structured weekly check-ins would help.");
  if (student.stress_level_1_5 >= 4) factors.push("Stress indicator is elevated, so wellbeing information should be offered respectfully.");
  if (student.confidence_level_1_5 <= 2) factors.push("Confidence level shows an opportunity for peer encouragement and advisor reflection.");
  if (student.knows_support_services_1_5 <= 2) factors.push("Support-service awareness is low, so the pathway should explain available UPM resources.");
  if (student.advisor_meetings <= 1) factors.push("Advisor engagement can be strengthened through a scheduled check-in.");
  if (student.gpa_current > student.gpa_previous) factors.push("GPA is improving, so the recommendation should build on recent progress.");
  return factors.slice(0, 5);
}

function strengths(student) {
  const list = [];
  if (student.gpa_current >= student.gpa_previous) list.push("Recent GPA direction is positive.");
  if (student.coursework_average >= 75) list.push("Coursework completion shows steady academic effort.");
  if (student.attendance_percent >= 85) list.push("Attendance is consistent enough to support momentum.");
  if (student.confidence_level_1_5 >= 4) list.push("Confidence level supports leadership or peer-learning opportunities.");
  if (student.advisor_meetings >= 2) list.push("Advisor engagement is already active.");
  return list.length ? list : ["Shows potential for improvement with a clear support pathway."];
}

function growthOpportunities(student) {
  const list = [];
  if (student.test1 < 70 || student.test2 < 70) list.push("Assessment preparation and study rhythm.");
  if (student.attendance_percent < 85) list.push("Attendance consistency and routine planning.");
  if (student.stress_level_1_5 >= 4) list.push("Wellbeing support awareness and stress management.");
  if (student.knows_support_services_1_5 <= 3) list.push("Better knowledge of UPM support services.");
  if (student.advisor_meetings < 2) list.push("More regular academic advising conversations.");
  return list.length ? list : ["Stretch toward leadership, community, or employability pathways."];
}

function sourceFor(student) {
  if (student.stress_level_1_5 >= 4) {
    return {
      source: "UPM Counselling Division Services",
      category: "Counselling / Wellbeing",
      confidence: 94,
      reason: "Used because the student stress indicator is elevated and wellbeing support information should be offered respectfully."
    };
  }
  if (/career|industry|portfolio|employability|work-based/i.test(student.recommended_action)) {
    return {
      source: "PUTRAFLEX and CADe-Lead employability sources",
      category: "Career / Employability",
      confidence: 91,
      reason: "Used because the pathway includes future-ready development, employability, or portfolio preparation."
    };
  }
  if (/SULAM|community|volunteer|leadership|ambassador/i.test(student.recommended_action)) {
    return {
      source: "SULAM Playbook and Jiwa Putra student development sources",
      category: "Leadership / Student Development",
      confidence: 93,
      reason: "Used because the recommendation connects student development with leadership, service, and Jiwa Putra impact."
    };
  }
  return {
    source: "UPM Academic Advising System Guideline",
    category: "Academic Advising / Mentor-Mentee",
    confidence: 92,
    reason: "Used because advisor engagement and academic planning support are central to the recommendation."
  };
}

function planFor(student) {
  return [
    ["Week 1", "Advisor meeting, goal setting, and source-grounded support explanation."],
    ["Week 2", student.test1 < 70 ? "Join study circle and review assessment preparation." : "Confirm study rhythm and identify one development opportunity."],
    ["Week 3", student.stress_level_1_5 >= 4 ? "Offer wellbeing information and confidence-building reflection." : "Mentor reflection and progress check."],
    ["Week 4", "Review score movement and choose next-month success pathway."]
  ];
}

function mentorMatch(student) {
  let score = 88;
  if (student.advisor_meetings < 2) score += 3;
  if (student.confidence_level_1_5 <= 2) score += 2;
  if (student.stress_level_1_5 >= 4) score += 1;
  return Math.min(score, 96);
}

function renderInsight() {
  const student = selectedStudent();
  const source = sourceFor(student);
  const afterScore = Math.max(74, Math.min(96, student.student_success_score + 26));
  const afterCategory = categoryForScore(afterScore);
  const matchScore = mentorMatch(student);

  byId("insightStudent").textContent = student.student_id;
  byId("insightCategory").textContent = student.category;
  byId("sourceUsed").textContent = source.source;
  byId("confidenceBar").style.width = `${source.confidence}%`;
  byId("confidenceScore").textContent = `Source confidence: ${source.confidence}%`;
  byId("sourceCategory").textContent = source.category;
  byId("sourceReason").textContent = source.reason;
  byId("mentorMatchScore").textContent = `${matchScore}%`;
  byId("mentorMatchReason").textContent = `Same faculty context, ${mainSupportNeed(student).toLowerCase()}, and advisor-guided growth opportunity.`;
  document.querySelector(".match-score i").style.width = `${matchScore}%`;

  byId("supportFactors").innerHTML = supportFactors(student).map((item) => `<li>${item}</li>`).join("");
  byId("strengths").innerHTML = strengths(student).map((item) => `<li>${item}</li>`).join("");
  byId("growthOpportunities").innerHTML = growthOpportunities(student).map((item) => `<li>${item}</li>`).join("");
  byId("factorBreakdown").innerHTML = factorContributions(student)
    .map(([label, value]) => {
      const positive = value >= 0;
      const width = Math.min(100, Math.abs(value) * 5);
      return `<div class="factor-row ${positive ? "positive" : "support"}"><span>${label}</span><div><i style="width:${width}%"></i></div><strong>${positive ? "+" : ""}${value}</strong></div>`;
    })
    .join("");

  byId("aiSummary").textContent = `${mainSupportNeed(student)} with advisor-guided support, student strengths, and a 30-day success pathway.`;

  const recs = [
    ["Mentor / Advisor Action", student.advisor_meetings < 2 ? "Schedule advisor check-in and pair with a faculty peer mentor." : "Continue advisor reflection and add peer mentoring for momentum."],
    ["Academic Support", student.test1 < 70 || student.test2 < 70 ? "Weekly study circle and assessment milestone tracking." : "Maintain study rhythm and set a higher learning goal."],
    ["Wellbeing Support", student.stress_level_1_5 >= 4 ? "Share UPM Counselling Division information and voluntary wellbeing pathway." : "Offer wellbeing reminders and balanced workload planning."],
    ["Leadership / Development Pathway", /leadership|SULAM|community|volunteer/i.test(student.recommended_action) ? "Leadership, SULAM, or community engagement opportunity." : "Career, innovation, or Jiwa Putra volunteer pathway."]
  ];
  byId("aiRecommendations").innerHTML = recs
    .map(([label, text]) => `<div class="recommendation-card"><span>${label}</span><strong>${text}</strong></div>`)
    .join("");

  byId("beforeScore").textContent = student.student_success_score;
  byId("beforeCategory").textContent = student.category;
  byId("afterScore").textContent = afterScore;
  byId("afterCategory").textContent = afterCategory;
  byId("journeyGain").textContent = `+${afterScore - student.student_success_score} points`;
  byId("successPlan").innerHTML = planFor(student)
    .map(([week, text]) => `<div class="plan-step"><strong>${week}</strong><br>${text}</div>`)
    .join("");
}

function renderNotebook() {
  byId("sourceCards").innerHTML = sourceCards
    .map((card) => `
      <article class="source-card-static">
        <div class="panel-head"><h3>${card.title}</h3><span>${card.priority}</span></div>
        <p><strong>Source:</strong> ${card.source}</p>
        <p><strong>UPM unit:</strong> ${card.unit}</p>
        <p>${card.use}</p>
        <small>Recommendation type: ${card.type}</small>
      </article>
    `)
    .join("");
}

function renderImpact() {
  const metrics = [
    ["20", "anonymized student profiles analyzed"],
    ["20", "personalized support pathways generated"],
    ["29", "mentor/advisor actions recommended"],
    ["7", "students moved to stable pathway in simulation"],
    ["100%", "recommendations grounded using NotebookLM sources"]
  ];
  byId("impactMetrics").innerHTML = metrics
    .map(([value, label]) => `<article class="impact-metric"><strong>${value}</strong><span>${label}</span></article>`)
    .join("");
}

function renderMobile() {
  const student = selectedStudent();
  const source = sourceFor(student);
  const matchScore = mentorMatch(student);
  byId("mobileHome").textContent = `Welcome back, ${student.student_id}`;
  byId("mobileToday").textContent = student.advisor_meetings < 2 ? "Today: advisor check-in" : "Today: pathway reflection";
  byId("mobileScore").textContent = student.student_success_score;
  byId("mobileScoreRing").style.setProperty("--score", student.student_success_score);
  byId("mobileCategory").textContent = student.category;
  byId("mobilePrograms").textContent = student.recommended_action;
  const mobileProgress = document.querySelectorAll(".phone .mini-progress i");
  if (mobileProgress[0]) mobileProgress[0].style.width = `${student.student_success_score}%`;
  if (mobileProgress[1]) mobileProgress[1].style.width = `${matchScore}%`;
  const mentorScore = document.querySelector(".phone:nth-child(4) strong");
  const sourceScore = document.querySelector(".phone:nth-child(6) strong");
  if (mentorScore) mentorScore.textContent = `Match Score: ${matchScore}%`;
  if (sourceScore) sourceScore.textContent = `Source confidence: ${source.confidence}%`;
}

function renderAll() {
  renderOverview();
  renderFilters();
  renderStudents(byId("studentSearch")?.value || "");
  renderDetail();
  renderInsight();
  renderNotebook();
  renderImpact();
  renderMobile();
}

function setScreen(screen) {
  state.activeScreen = screen;
  document.querySelectorAll(".screen").forEach((section) => {
    section.classList.toggle("active", section.id === `screen-${screen}`);
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === screen);
  });
  const active = byId(`screen-${screen}`);
  byId("screenTitle").textContent = active?.dataset.title || "PutraInsight AI 2.0";
  location.hash = screen;
}

function selectStudent(studentId, nextScreen) {
  state.selectedId = studentId;
  renderAll();
  setScreen(nextScreen || state.activeScreen);
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const filterTarget = event.target.closest("[data-filter]");
    const selectTarget = event.target.closest("[data-select]");
    const goTarget = event.target.closest("[data-go]");

    if (filterTarget) {
      state.categoryFilter = filterTarget.dataset.filter;
      renderFilters();
      renderStudents(byId("studentSearch").value);
      return;
    }

    if (selectTarget) {
      selectStudent(selectTarget.dataset.select, selectTarget.dataset.go || "detail");
      return;
    }

    if (goTarget) {
      setScreen(goTarget.dataset.go);
    }
  });

  document.querySelectorAll(".nav-item[data-screen]").forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.screen));
  });

  byId("studentSearch").addEventListener("input", (event) => {
    renderStudents(event.target.value);
  });

  window.addEventListener("hashchange", () => {
    const screen = location.hash.replace("#", "") || "landing";
    if (byId(`screen-${screen}`)) setScreen(screen);
  });
}

fetch("data.json")
  .then((response) => response.json())
  .then((students) => {
    state.students = students;
    state.selectedId = students[0].student_id;
    bindEvents();
    renderAll();
    const initialScreen = location.hash.replace("#", "") || "landing";
    setScreen(byId(`screen-${initialScreen}`) ? initialScreen : "landing");
  })
  .catch((error) => {
    document.body.innerHTML = `<main class="main-area"><h1>Unable to load demo data</h1><p>${error.message}</p></main>`;
  });
