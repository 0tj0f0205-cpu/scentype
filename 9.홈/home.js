document.addEventListener("DOMContentLoaded", () => {
  const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

  const latest = archive.sort((a, b) => b.id - a.id)[0];

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
  document.querySelector(".recently-notes").textContent = Array.isArray(latest.notes)
    ? latest.notes.join(" · ")
    : "";

  document.querySelector(".recently-card").addEventListener("click", () => {
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