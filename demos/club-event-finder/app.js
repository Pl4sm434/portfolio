let activeType = "All";

function renderChips() {
  const types = ["All", ...new Set(EVENTS.map(e => e.type))];
  const wrap = document.getElementById("typeChips");
  wrap.innerHTML = "";
  types.forEach(type => {
    const chip = document.createElement("div");
    chip.className = "chip" + (type === activeType ? " active" : "");
    chip.textContent = type;
    chip.addEventListener("click", () => {
      activeType = type;
      renderChips();
      render(document.getElementById("search").value);
    });
    wrap.appendChild(chip);
  });
}

function render(filter = "") {
  const results = document.getElementById("results");
  results.innerHTML = "";
  const f = filter.toLowerCase();

  const matches = EVENTS.filter(e => {
    const typeMatches = activeType === "All" || e.type === activeType;
    const textMatches =
      e.name.toLowerCase().includes(f) ||
      e.type.toLowerCase().includes(f) ||
      e.tags.some(t => t.toLowerCase().includes(f));
    return typeMatches && textMatches;
  });

  document.getElementById("resultCount").textContent =
    `${matches.length} ${matches.length === 1 ? "result" : "results"}`;

  if (matches.length === 0) {
    results.innerHTML = `<div class="empty">No clubs or events match that search.</div>`;
    return;
  }

  matches.forEach(e => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${e.name}</h3>
      <div class="meta">${e.type} • ${e.meta}</div>
      <div>${e.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    `;
    results.appendChild(card);
  });
}

document.getElementById("search").addEventListener("input", (ev) => render(ev.target.value));
renderChips();
render();
