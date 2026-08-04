const STOPWORDS = new Set([
  "the","a","an","and","or","of","to","in","for","on","with","is","are","as",
  "at","by","this","that","be","have","has","will","you","your","we","our",
  "from","it","its","their","they","them","who","what","when","where","how",
  "job","role","position","responsibilities","requirements","preferred",
  "experience","years","strong","ability","skills","work","working","team"
]);

function extractWordCounts(text) {
  const counts = new Map();
  text
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w))
    .forEach(w => counts.set(w, (counts.get(w) || 0) + 1));
  return counts;
}

function scoreColor(score) {
  if (score >= 70) return "var(--green)";
  if (score >= 40) return "var(--yellow)";
  return "var(--red)";
}

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const resumeText = document.getElementById("resume").value.trim();
  const jobText = document.getElementById("jobdesc").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!resumeText || !jobText) {
    errorMsg.style.display = "block";
    document.getElementById("result").style.display = "none";
    return;
  }
  errorMsg.style.display = "none";

  const jobCounts = extractWordCounts(jobText);
  const resumeCounts = extractWordCounts(resumeText);
  const jobKeywords = [...jobCounts.keys()].sort((a, b) => jobCounts.get(b) - jobCounts.get(a));

  const matched = jobKeywords.filter(k => resumeCounts.has(k));
  const missing = jobKeywords.filter(k => !resumeCounts.has(k));

  const score = jobKeywords.length ? Math.round((matched.length / jobKeywords.length) * 100) : 0;
  const color = scoreColor(score);

  const scoreEl = document.getElementById("scoreText");
  scoreEl.textContent = score + "%";
  scoreEl.style.color = color;

  const barFill = document.getElementById("barFill");
  barFill.style.width = score + "%";
  barFill.style.background = color;

  document.getElementById("matched").innerHTML =
    matched.slice(0, 40).map(k => `<span class="tag match">${k}</span>`).join("") ||
    "<span style='color:var(--muted)'>None found</span>";
  document.getElementById("missing").innerHTML =
    missing.slice(0, 40).map(k => `<span class="tag missing">${k} (${jobCounts.get(k)}×)</span>`).join("") ||
    "<span style='color:var(--muted)'>None — great overlap!</span>";

  document.getElementById("result").style.display = "block";
});
