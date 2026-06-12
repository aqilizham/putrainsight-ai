const studentsPromise = fetch("data.json").then((response) => response.json());

const categoryColors = {
  "Thriving": "#0f5a43",
  "Stable": "#c9a24a",
  "Needs Support": "#9a4b12",
  "Immediate Attention": "#7a1026"
};

function countBy(students, key) {
  return students.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function average(students, key) {
  return Math.round(students.reduce((sum, item) => sum + item[key], 0) / students.length);
}

function renderMetrics(students) {
  const counts = countBy(students, "category");
  const metrics = [
    ["Total Students", students.length],
    ["Thriving Students", counts["Thriving"] || 0],
    ["Stable Students", counts["Stable"] || 0],
    ["Needs Support", counts["Needs Support"] || 0],
    ["Immediate Attention", counts["Immediate Attention"] || 0],
    ["Average Success Score", average(students, "student_success_score")]
  ];

  document.querySelector("#metrics").innerHTML = metrics
    .map(([label, value]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
}

function renderDistribution(students) {
  const counts = countBy(students, "category");
  const order = ["Thriving", "Stable", "Needs Support", "Immediate Attention"];
  document.querySelector("#distribution").innerHTML = order
    .map((label) => {
      const value = counts[label] || 0;
      const pct = Math.round((value / students.length) * 100);
      return `
        <div class="bar-row">
          <span>${label}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${categoryColors[label]}"></div></div>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");
}

function renderMentorList(students) {
  const meetings = [
    ["No advisor meeting yet", students.filter((s) => s.advisor_meetings === 0).length],
    ["One advisor meeting", students.filter((s) => s.advisor_meetings === 1).length],
    ["Two advisor meetings", students.filter((s) => s.advisor_meetings === 2).length],
    ["Three advisor meetings", students.filter((s) => s.advisor_meetings >= 3).length]
  ];

  document.querySelector("#mentorList").innerHTML = meetings
    .map(([label, value]) => {
      const pct = Math.round((value / students.length) * 100);
      return `<div class="progress-item"><span>${label}<span>${pct}%</span></span><div><i style="width:${pct}%"></i></div></div>`;
    })
    .join("");
}

function renderSupportChart(students) {
  const canvas = document.querySelector("#supportChart");
  const ctx = canvas.getContext("2d");
  const values = [
    ["Academic", 74],
    ["Wellbeing", 58],
    ["Welfare", 42],
    ["Leadership", 62]
  ];
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.font = "700 14px Segoe UI";
  values.forEach(([label, value], index) => {
    const x = 28 + index * 120;
    const barHeight = value * 1.8;
    ctx.fillStyle = index % 2 ? "#c9a24a" : "#7a1026";
    ctx.fillRect(x, height - 46 - barHeight, 58, barHeight);
    ctx.fillStyle = "#17201d";
    ctx.fillText(`${value}%`, x + 8, height - 56 - barHeight);
    ctx.fillStyle = "#67736f";
    ctx.fillText(label, x - 6, height - 18);
  });
}

function renderStudentProfile(students) {
  const student = students.find((item) => item.student_id === "Student A001");
  const indicators = [
    ["CGPA", student.cgpa],
    ["Attendance", `${student.attendance_percent}%`],
    ["Test 1", student.test1],
    ["Test 2", student.test2],
    ["Quiz", `${student.quiz_average}%`],
    ["Coursework", `${student.coursework_average}%`],
    ["Advisor Meetings", student.advisor_meetings],
    ["Stress Level", `${student.stress_level_1_5}/5`]
  ];
  document.querySelector("#studentIndicators").innerHTML = indicators
    .map(([label, value]) => `<div class="indicator"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

studentsPromise.then((students) => {
  renderMetrics(students);
  renderDistribution(students);
  renderMentorList(students);
  renderSupportChart(students);
  renderStudentProfile(students);
});
