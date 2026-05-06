document.addEventListener("DOMContentLoaded", () => {
  const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

  const latest = archive[archive.length - 1];

  console.log("홈 latest:", latest);

  if (!latest) return;

  document.querySelector(".recently-visual").src = latest.visualImage || "";
  document.querySelector(".recently-name").textContent = latest.name || "";

  const date = latest.id
    ? new Date(latest.id).toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit"
      }).replace(". ", ".").replace(".", "")
    : "";

  document.querySelector(".recently-info-line").textContent =
    `${latest.brand || ""} · ${latest.concentration || ""} · ${date}`;

  renderNoteChips(".recently-notes", latest.notes);

  document.querySelector(".recently-card")?.addEventListener("click", () => {
    localStorage.setItem("perfumeRecord", JSON.stringify(latest));
  });
});
const newsData = [
  {
    title: "Spring Fragrance Trend",
    desc: "Light musk and soft floral notes are gaining attention."
  },
  {
    title: "New Niche Perfume Release",
    desc: "A quiet woody scent with amber and powdery texture."
  }
];

const newsList = document.querySelector(".news-list");

if (newsList) {
  newsData.forEach(news => {
    const item = document.createElement("div");
    item.className = "news-item";

    item.innerHTML = `
      <div class="news-title">${news.title}</div>
      <div class="news-desc">${news.desc}</div>
    `;

    newsList.appendChild(item);
  });
}

function renderNoteChips(containerSelector, notes) {
  const box = document.querySelector(containerSelector);
  if (!box || !Array.isArray(notes)) return;

  box.innerHTML = "";

  notes.forEach(note => {
    const chip = document.createElement("div");
    chip.className = "note-chip";
    chip.textContent = note;
    box.appendChild(chip);
  });
}