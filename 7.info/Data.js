console.log("Data.js 연결됨");

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("perfumeRecord")) || {};
  console.log("4페이지 데이터:", data);

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value || "";
  };

  const img = document.getElementById("savedVisualImage");
  if (data.visualImage && img) {
    img.src = data.visualImage;
  }

  setText(".brand-text", data.brand);
  setText(".name-text", data.name);
  setText(".place-text", data.place);
  setText(".memo-text", data.memo);
  setText(".concentration-text", data.concentration);

  const date = data.id
    ? new Date(data.id)
        .toLocaleDateString("ko-KR", {
          month: "2-digit",
          day: "2-digit",
        })
        .replace(". ", ".")
        .replace(".", "")
    : "";

  const infoLine = `${data.brand || ""} · ${data.concentration || ""} · ${date}`;
  setText(".info-line", infoLine);

  const seasonMap = {
    A: "Spring",
    B: "Summer",
    C: "Autumn",
    D: "Winter",
  };

  const seasonText = Array.isArray(data.season)
    ? data.season.map(s => seasonMap[s] || s).join(" · ")
    : "";

  setText(".season-text", seasonText);

  const sillageScore = ((Number(data.opacityValue || 0) / 100) * 10).toFixed(1);
  const longevityScore = ((Number(data.densityValue || 0) / 100) * 10).toFixed(1);

  setText(".sillage-score", sillageScore);
  setText(".longevity-score", longevityScore);

  const notesContainer = document.querySelector(".notes-container");

  if (notesContainer && Array.isArray(data.notes)) {
    notesContainer.innerHTML = "";

    data.notes.forEach(note => {
      const el = document.createElement("div");
      el.className = "note-chip";
      el.textContent = note;
      notesContainer.appendChild(el);
    });
  }

  const deleteBtn = document.getElementById("deleteBtn");

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const current = JSON.parse(localStorage.getItem("perfumeRecord")) || {};
      let archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

      archive = archive.filter(item => String(item.id) !== String(current.id));

      localStorage.setItem("perfumeArchive", JSON.stringify(archive));
      localStorage.removeItem("perfumeRecord");

      location.href = "../8.archive/archive.html";
    });
  }
});
console.log(document.querySelector(".sillage-score"));