document.addEventListener("DOMContentLoaded", () => {
  const archiveList = document.querySelector(".archive-list");
  if (!archiveList) return;

  let archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

  let currentSort = "new";
  let currentView = "grid";
  let currentShape = "all";

  function renderArchive() {
    let items = [...archive];

    if (currentShape !== "all") {
      items = items.filter(item => item.shape === currentShape);
    }

    items.sort((a, b) => {
      return currentSort === "new" ? b.id - a.id : a.id - b.id;
    });

    archiveList.classList.remove("grid-view", "list-view");
    archiveList.classList.add(`${currentView}-view`);

    archiveList.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "archive-card";

      card.innerHTML = `
        <img src="${item.visualImage || ""}" class="archive-visual">
        <div class="archive-info">
          <div class="archive-name">${item.name || ""}</div>
          <div class="archive-line">${item.brand || ""} · ${item.concentration || ""}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        localStorage.setItem("perfumeRecord", JSON.stringify(item));
        location.href = "/7.info/Data.html";
      });

      archiveList.appendChild(card);
    });
  }

  const sortBtn = document.querySelector(".sort-btn");
  const viewBtn = document.querySelector(".view-btn");

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      currentSort = currentSort === "new" ? "old" : "new";

      sortBtn.src =
        currentSort === "new"
          ? "../assets/8.Archive/최신순.png"
          : "../assets/8.Archive/과거순.png";

      renderArchive();
    });
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      currentView = currentView === "grid" ? "list" : "grid";

      viewBtn.src =
        currentView === "grid"
          ? "../assets/8.Archive/그리드.png"
          : "../assets/8.Archive/리스트.png";

      renderArchive();
    });
  }

  const filterButtons = [
    { selector: ".wjscp", shape: "all", base: "전체" },
    { selector: ".rkqudns", shape: "air", base: "가벼운" },
    { selector: ".skfzkfhdns", shape: "sharp", base: "날카로운" },
    { selector: ".endrms", shape: "round", base: "둥근" },
    { selector: ".anrwlrgks", shape: "solid", base: "묵직한" },
  ];

  function updateFilterButtons(activeShape) {
    filterButtons.forEach(btn => {
      const el = document.querySelector(btn.selector);
      if (!el) return;

      el.src =
        btn.shape === activeShape
          ? `../assets/8.Archive/${btn.base}1.png`
          : `../assets/8.Archive/${btn.base}.png`;
    });
  }

  filterButtons.forEach(btn => {
    const el = document.querySelector(btn.selector);
    if (!el) return;

    el.addEventListener("click", () => {
      currentShape = btn.shape;
      updateFilterButtons(currentShape);
      renderArchive();
    });
  });

  updateFilterButtons("all");
  renderArchive();
});

function updateStats() {
  const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

  const totalCount = archive.length;

  const shapeTypes = new Set(
    archive
      .map(item => item.shape)
      .filter(Boolean)
  );

  const shapeCount = shapeTypes.size;

  const now = new Date();
  const thisMonthCount = archive.filter(item => {
    const date = new Date(item.id);
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  }).length;

  document.querySelector(".total-count").textContent = totalCount;
  document.querySelector(".shape-count").textContent = shapeCount;
  document.querySelector(".month-count").textContent = thisMonthCount;
}

updateStats();
renderArchive();