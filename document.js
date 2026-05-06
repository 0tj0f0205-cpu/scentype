console.log("document.js 연결됨");
// 브랜드 드롭다운
const brandBtn = document.getElementById("brandBtn");
const brandList = document.getElementById("brandList");
const brandCustomInput = document.getElementById("brandCustomInput");

let selectedBrand = "";

if (brandBtn && brandList) {
  brandBtn.addEventListener("click", () => {
    brandList.classList.toggle("open");
  });

  brandList.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {
      const brand = item.dataset.brand;

      if (brand === "custom") {
      selectedBrand = "";

      document.getElementById("brandSelectedText").textContent = "";
      brandCustomInput.value = "";

      brandList.classList.remove("open");
      brandCustomInput.classList.add("open");
      brandCustomInput.focus();
      return;
     
      }

      selectedBrand = brand;
      brandBtn.dataset.selected = brand;
      brandBtn.alt = brand;

      brandList.classList.remove("open");
      brandCustomInput.classList.remove("open");

      console.log("선택한 브랜드:", selectedBrand);
      document.getElementById("brandSelectedText").textContent = selectedBrand;
    });
  });
}

if (brandCustomInput) {
  brandCustomInput.addEventListener("input", () => {
    selectedBrand = brandCustomInput.value;
    console.log("직접 입력 브랜드:", selectedBrand);
  });
}

// 농도 선택
const concs = document.querySelectorAll(".conc");

concs.forEach((conc) => {
  conc.addEventListener("click", () => {
    concs.forEach((item) => {
      item.classList.remove("active");
      item.src = item.src.replace("2.png", "1.png");
    });

    conc.classList.add("active");

    const name = conc.dataset.name;
    conc.src = `assets/6.Document/${name}2.png`;

    console.log("선택한 농도:", name);
  });
});

// 주요 노트 팝업
const noteAdd = document.getElementById("noteAdd");
const notePopup = document.getElementById("notePopup");

if (noteAdd && notePopup) {
  noteAdd.addEventListener("click", () => {
    notePopup.classList.add("open");
  });
}

document.querySelectorAll(".note-option").forEach(note => {
  note.addEventListener("click", () => {
    note.classList.toggle("selected");
  });
});

// 저장
const noteSaveBtn = document.getElementById("noteSaveBtn");

if (noteSaveBtn && notePopup) {
  noteSaveBtn.addEventListener("click", () => {
    notePopup.classList.remove("open");
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("perfumeRecord")) || {};

    data.brand = selectedBrand || brandCustomInput?.value || "";
    data.name = document.querySelector(".name-input")?.value || "";
    data.place = document.querySelector(".place-input")?.value || "";
    data.memo = document.querySelector(".memo-input")?.value || "";

    const activeConc = document.querySelector(".conc.active");
    data.concentration = activeConc ? activeConc.dataset.name : "";

    data.notes = [...document.querySelectorAll(".note-option.selected")]
      .map(note => note.dataset.note);

    data.id = Date.now();

    localStorage.setItem("perfumeRecord", JSON.stringify(data));

    const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

// 기존 같은 id 있으면 제거 (수정 대비)
    const filtered = archive.filter(item => item.id !== data.id);

    filtered.push(data);

    localStorage.setItem("perfumeArchive", JSON.stringify(filtered));
    localStorage.setItem("perfumeArchive", JSON.stringify(archive));
  });
}