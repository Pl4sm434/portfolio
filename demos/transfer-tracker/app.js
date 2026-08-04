const STORAGE_KEY = "transfer-tracker-progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function courseKey(catIndex, courseIndex) {
  return `${catIndex}-${courseIndex}`;
}

function render() {
  const progress = loadProgress();
  const container = document.getElementById("categories");
  container.innerHTML = "";

  let total = 0;
  let done = 0;

  REQUIREMENTS.forEach((cat, catIndex) => {
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
          <div class="sjsu-name">${course.sjsu}</div>
          <div class="deanza-name">Satisfied by De Anza: ${course.deanza}</div>
        </div>
      `;
      row.addEventListener("click", () => {
        const p = loadProgress();
        p[key] = !p[key];
        saveProgress(p);
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

render();
