const SCHOOLS = {
  sjsu: {
    label: "SJSU — Computer Science",
    field: "sjsu",
    requirements: REQUIREMENTS,
    storageKey: "transfer-dashboard-sjsu-progress",
    banner:
      "⚠️ Course mappings pulled from SJSU's official articulation page (July 2026). These agreements change year to year, so double-check anything before you register — this is a tool to help you plan, not a substitute for your counselor.",
  },
  ucsb: {
    label: "UCSB — Data Science",
    field: "ucsb",
    requirements: UCSB_REQUIREMENTS,
    storageKey: "transfer-dashboard-ucsb-progress",
    banner:
      "⚠️ UCSB uses a \"major preparation\" pathway rather than strict course-to-course articulation for every class, and these mappings are partially verified. Double-check every row on assist.org before relying on it.",
  },
};

let currentSchool = "sjsu";

function loadProgress(school) {
  try {
    return JSON.parse(localStorage.getItem(SCHOOLS[school].storageKey)) || {};
  } catch {
    return {};
  }
}

function saveProgress(school, progress) {
  localStorage.setItem(SCHOOLS[school].storageKey, JSON.stringify(progress));
}

function courseKey(catIndex, courseIndex) {
  return `${catIndex}-${courseIndex}`;
}

function render() {
  const school = SCHOOLS[currentSchool];
  const progress = loadProgress(currentSchool);
  const container = document.getElementById("categories");
  container.innerHTML = "";

  document.getElementById("banner").textContent = school.banner;
  document.getElementById("btnSJSU").classList.toggle("active", currentSchool === "sjsu");
  document.getElementById("btnUCSB").classList.toggle("active", currentSchool === "ucsb");

  let total = 0;
  let done = 0;

  school.requirements.forEach((cat, catIndex) => {
    const section = document.createElement("div");
    section.className = "category";

    const heading = document.createElement("h2");
    heading.textContent = cat.category;
    section.appendChild(heading);

    cat.courses.forEach((course, courseIndex) => {
      total++;
      const key = courseKey(catIndex, courseIndex);
      const isDone = !!progress[key];
      if (isDone) done++;

      const row = document.createElement("div");
      row.className = "course-row" + (isDone ? " done" : "");
      row.innerHTML = `
        <div class="checkbox">${isDone ? "✓" : ""}</div>
        <div class="course-info">
          <div class="school-name">${course[school.field]}</div>
          <div class="deanza-name">Satisfied by De Anza: ${course.deanza}</div>
        </div>
      `;
      row.addEventListener("click", () => {
        const p = loadProgress(currentSchool);
        p[key] = !p[key];
        saveProgress(currentSchool, p);
        render();
      });

      section.appendChild(row);
    });

    container.appendChild(section);
  });

  document.getElementById("doneCount").textContent = done;
  document.getElementById("totalCount").textContent = total;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("pct").textContent = pct + "%";
  document.getElementById("barFill").style.width = pct + "%";
}

document.getElementById("btnSJSU").addEventListener("click", () => {
  currentSchool = "sjsu";
  render();
});
document.getElementById("btnUCSB").addEventListener("click", () => {
  currentSchool = "ucsb";
  render();
});

render();
