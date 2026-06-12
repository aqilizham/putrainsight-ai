const state = {
  students: [],
  selectedId: "Student A001",
  activeScreen: "overview"
};

const categoryColors = {
  "Thriving": "#0f5a43",
  "Stable": "#c9a24a",
  "Needs Support": "#9a4b12",
  "Immediate Attention": "#7a1026"
};

const sourceCards = [
  {
    title: "Academic Support",
    source: "UPM Academic Rules and Academic Calendar",
    use: "Grounds study planning, course milestones, assessment timing, and academic pathway advice."
  },
  {
    title: "Academic Advising / Mentor-Mentee",
    source: "Academic Advising System Guideline",
    use: "Supports advisor check-ins, mentor routing, and progress reflection recommendations."
  },
  {
    title: "Welfare / Financial Aid",
    source: "Student Welfare Services and Financial Assistance",
    use: "Connects students to official support services when financial or welfare needs appear."
  },
  {
    title: "Counselling / Wellbeing",
    source: "UPM Counselling Division Services",
    use: "Grounds wellbeing nudges, voluntary counselling information, and confidence support."
  },
  {
    title: "Leadership / Student Development",
    source: "Student Affairs Division and student activity resources",
    use: "Matches students to leadership, volunteer, and student development opportunities."
  },
  {
    title: "Career / Employability",
    source: "PUTRAFLEX, SULAM, work-based learning resources",
    use: "Recommends future-ready development pathways, career preparation, and service learning."
  },
  {
    title: "Jiwa Putra",
    source: "Jiwa Putra and Berilmu Berbakti sources",
    use: "Aligns success pathways with care, responsibility, contribution, and community impact."
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

function supportNeedBuckets(students) {
  const buckets = [
    ["Academic guidance", (s) => /advisor|study|course|academic|assessment|coursework/i.test(s.recommended_action)],
    ["Wellbeing support", (s) => /wellbeing|counselling|confidence|stress/i.test(s.recommended_action)],
    ["Mentorship", (s) => /mentor|peer/i.test(s.recommended_action)],
    ["Leadership and development", (s) => /leadership|SULAM|volunteer|community|career|innovation|ambassador|entrepreneurship/i.test(s.recommended_action)]
  ];
  return buckets.map(([label, matcher]) => [label, students.filter(matcher).length]);
}

function renderOverview() {
  const students = state.students;
  const counts = countBy(students, "category");
  const mentorship = pct(students.filter((s) => s.advisor_meetings >= 2).length, students.length);
  const supportUse = pct(students.filter((s) => s.knows_support_services_1_5 >= 3).length, students.length);
  const metrics = [
    ["Total students analyzed", students.length, "synthetic records"],
    ["Thriving", counts["Thriving"] || 0, "high momentum"],
    ["Stable", counts["Stable"] || 0, "steady pathway"],
    ["Needs Support", counts["Needs Support"] || 0, "growth opportunity"],
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

  const maxNeed = Math.max(...supportNeedBuckets(students).map(([, value]) => value));
  byId("supportNeeds").innerHTML = supportNeedBuckets(students)
    .map(([label, value]) => `<div class="need-row"><span>${label}</span><strong>${value}/${maxNeed}</strong></div>`)
    .join("");

  byId("recentRecommendations").innerHTML = students
    .slice(0, 5)
    .map((student) => `<button class="feed-row table-action" type="button" data-select="${student.student_id}" data-go="insight"><span><strong>${student.student_id}</strong> ${student.recommended_action}</span><span>${student.student_success_score}</span></button>`)
    .join("");
}

function renderStudents(filter = "") {
  const query = filter.trim().toLowerCase();
  const rows = state.students.filter((student) => {
    return [student.student_id, student.faculty, student.category, student.recommended_action]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  byId("studentRows").innerHTML = rows
    .map((student) => `
      <tr class="${student.student_id === state.selectedId ? "selected" : ""}">
        <td><strong>${student.student_id}</strong></td>
        <td>${student.faculty}</td>
        <td>Year ${student.year}</td>
        <td><strong>${student.student_success_score}</strong></td>
        <td><span class="table-badge ${categoryClass(student.category)}">${student.category}</span></td>
        <td>${student.recommended_action}</td>
        <td><button class="table-action" type="button" data-select="${student.student_id}" data-go="detail">View Details</button></td>
      </tr>
    `)
    .join("");
}

function renderDetail() {
  const student = selectedStudent();
  byId("selectedStudentPill").textContent = student.student_id;
  byId("detailId").textContent = student.student_id;
  byId("detailFaculty").textContent = student.faculty;
  byId("detailCategory").textContent = student.category;
  byId("detailScore").textContent = student.student_success_score;
  byId("detailScoreRing").style.setProperty("--score", student.student_success_score);
  byId("detailYear").textContent = `Year ${student.year}`;
  byId("detailAction").textContent = student.recommended_action;

  const diff = (student.gpa_current - student.gpa_previous).toFixed(2);
  byId("gpaTrendLabel").textContent = diff >= 0 ? `Improving +${diff}` : `Needs attention ${diff}`;
  const target = Math.min(4, Math.max(student.gpa_current + 0.22, 3.15));
  const bars = [
    ["Previous", student.gpa_previous],
    ["Current", student.gpa_current],
    ["Target", Number(target.toFixed(2))]
  ];
  byId("gpaTrend").innerHTML = bars
    .map(([label, value]) => `<div class="trend-bar" style="height:${Math.max(38, value / 4 * 100)}%">${label}<br>${value}</div>`)
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
    return ["UPM Counselling Division Services", 94];
  }
  if (/career|industry|portfolio|employability|work-based/i.test(student.recommended_action)) {
    return ["PUTRAFLEX and CADe-Lead employability sources", 91];
  }
  if (/SULAM|community|volunteer|leadership|ambassador/i.test(student.recommended_action)) {
    return ["SULAM Playbook and Jiwa Putra student development sources", 93];
  }
  return ["UPM Academic Advising System Guideline", 92];
}

function planFor(student) {
  return [
    ["Week 1", "Advisor meeting, goal setting, and source-grounded support explanation."],
    ["Week 2", student.test1 < 70 ? "Join study circle and review assessment preparation." : "Confirm study rhythm and identify one development opportunity."],
    ["Week 3", student.stress_level_1_5 >= 4 ? "Offer wellbeing information and confidence-building reflection." : "Mentor reflection and progress check."],
    ["Week 4", "Review score movement and choose next-month success pathway."]
  ];
}

function renderInsight() {
  const student = selectedStudent();
  const [source, confidence] = sourceFor(student);
  const afterScore = Math.max(74, Math.min(96, student.student_success_score + 26));
  const afterCategory = afterScore >= 80 ? "Thriving" : afterScore >= 65 ? "Stable" : "Needs Support";

  byId("insightStudent").textContent = student.student_id;
  byId("insightCategory").textContent = student.category;
  byId("sourceUsed").textContent = source;
  byId("confidenceBar").style.width = `${confidence}%`;
  byId("confidenceScore").textContent = `Source confidence: ${confidence}%`;
  byId("supportFactors").innerHTML = supportFactors(student).map((item) => `<li>${item}</li>`).join("");
  byId("strengths").innerHTML = strengths(student).map((item) => `<li>${item}</li>`).join("");
  byId("growthOpportunities").innerHTML = growthOpportunities(student).map((item) => `<li>${item}</li>`).join("");

  const recs = [
    ["Mentor/advisor action", student.advisor_meetings < 2 ? "Schedule advisor check-in and pair with a faculty peer mentor." : "Continue advisor reflection and add peer mentoring for momentum."],
    ["Academic support", student.test1 < 70 || student.test2 < 70 ? "Weekly study circle and assessment milestone tracking." : "Maintain study rhythm and set a higher learning goal."],
    ["Wellbeing support", student.stress_level_1_5 >= 4 ? "Share UPM Counselling Division information and voluntary wellbeing pathway." : "Offer wellbeing reminders and balanced workload planning."],
    ["Development pathway", /leadership|SULAM|community|volunteer/i.test(student.recommended_action) ? "Leadership, SULAM, or community engagement opportunity." : "Career, innovation, or Jiwa Putra volunteer pathway."]
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
    .map((card) => `<article class="source-card-static"><h3>${card.title}</h3><p>${card.use}</p><small>${card.source}</small></article>`)
    .join("");
}

function renderImpact() {
  const needs = state.students.filter((s) => s.category === "Needs Support" || s.category === "Immediate Attention").length;
  const mentorSessions = state.students.reduce((sum, s) => sum + Math.max(1, 3 - s.advisor_meetings), 0);
  const metrics = [
    ["Students guided earlier", needs, "students receive proactive pathways"],
    ["Mentor sessions recommended", mentorSessions, "advisor and peer mentor actions"],
    ["Support pathways generated", state.students.length, "one per anonymized student"],
    ["Moved to Stable simulation", Math.min(needs, 7), "after 30-day success plans"]
  ];
  byId("impactMetrics").innerHTML = metrics
    .map(([label, value, note]) => `<article class="impact-metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`)
    .join("");
}

function renderMobile() {
  const student = selectedStudent();
  byId("mobileHome").textContent = `Welcome back, ${student.student_id}`;
  byId("mobileToday").textContent = student.advisor_meetings < 2 ? "Today: advisor check-in" : "Today: pathway reflection";
  byId("mobileScore").textContent = student.student_success_score;
  byId("mobileScoreRing").style.setProperty("--score", student.student_success_score);
  byId("mobileCategory").textContent = student.category;
  byId("mobilePrograms").textContent = student.recommended_action;
}

function renderAll() {
  renderOverview();
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
  byId("screenTitle").textContent = active?.dataset.title || "Overview Dashboard";
  location.hash = screen;
}

function selectStudent(studentId, nextScreen) {
  state.selectedId = studentId;
  renderAll();
  setScreen(nextScreen || state.activeScreen);
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const goTarget = event.target.closest("[data-go]");
    const selectTarget = event.target.closest("[data-select]");
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
    const screen = location.hash.replace("#", "") || "overview";
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
    const initialScreen = location.hash.replace("#", "") || "overview";
    setScreen(byId(`screen-${initialScreen}`) ? initialScreen : "overview");
  })
  .catch((error) => {
    document.body.innerHTML = `<main class="main-area"><h1>Unable to load demo data</h1><p>${error.message}</p></main>`;
  });
