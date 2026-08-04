const KEY = "dsa-tracker-entries";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function save(entries) { localStorage.setItem(KEY, JSON.stringify(entries)); }

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function computeStreak(entries) {
  const days = new Set(entries.map(e => e.date));
  if (days.size === 0) return 0;

  const cursor = new Date();
  const todayKey = todayStr();
  if (!days.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toISOString().split("T")[0])) return 0;
  }

  let streak = 0;
  while (days.has(cursor.toISOString().split("T")[0])) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function render() {
  const entries = load();
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (entries.length === 0) {
    list.innerHTML = `<li class="empty">No problems logged yet — add your first one above.</li>`;
  }

  entries.slice().reverse().forEach((e, i) => {
    const realIndex = entries.length - 1 - i;
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${e.name}</strong>
        <span class="tag ${e.difficulty}">${e.difficulty}</span>
        <div class="meta">${e.topic} • ${e.date}</div>
      </div>
      <button class="del" data-i="${realIndex}" title="Remove">✕</button>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll(".del").forEach(btn => {
    btn.addEventListener("click", () => {
      const entries = load();
      entries.splice(Number(btn.dataset.i), 1);
      save(entries);
      render();
    });
  });

  document.getElementById("totalCount").textContent = entries.length;
  document.getElementById("streakCount").textContent = computeStreak(entries);

  const topicCounts = {};
  entries.forEach(e => { topicCounts[e.topic] = (topicCounts[e.topic] || 0) + 1; });
  const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
  document.getElementById("topTopic").textContent = sortedTopics.length ? sortedTopics[0][0] : "–";

  const breakdown = document.getElementById("topicBreakdown");
  breakdown.innerHTML = "";
  if (sortedTopics.length === 0) {
    breakdown.innerHTML = `<div style="color:var(--muted);font-size:13px;">Nothing logged yet.</div>`;
  }
  const maxCount = sortedTopics.length ? sortedTopics[0][1] : 0;
  sortedTopics.forEach(([topic, count]) => {
    const pct = maxCount ? Math.round((count / maxCount) * 100) : 0;
    const row = document.createElement("div");
    row.className = "topic-row";
    row.innerHTML = `
      <div class="topic-label">${topic}</div>
      <div class="topic-bar-wrap"><div class="topic-bar" style="width:${pct}%"></div></div>
      <div class="topic-count">${count}</div>
    `;
    breakdown.appendChild(row);
  });
}

document.getElementById("addForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const name = document.getElementById("problemName").value.trim();
  const topic = document.getElementById("topic").value.trim();
  const difficulty = document.getElementById("difficulty").value;
  if (!name || !topic) return;

  const entries = load();
  entries.push({ name, topic, difficulty, date: todayStr() });
  save(entries);

  document.getElementById("problemName").value = "";
  document.getElementById("topic").value = "";
  document.getElementById("problemName").focus();
  render();
});

render();
