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

// 주요 노트 추가
const noteAdd = document.getElementById("noteAdd");

if (noteAdd) {
  noteAdd.addEventListener("click", () => {
    alert("주요 노트 선택 화면 연결 예정");
  });
}

const saveBtn = document.getElementById("saveBtn");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("perfumeRecord")) || {};

    data.brand = selectedBrand || brandCustomInput.value || "";
    data.name = document.querySelector(".name-input")?.value || "";
    data.place = document.querySelector(".place-input")?.value || "";
    data.memo = document.querySelector(".memo-input")?.value || "";

    const activeConc = document.querySelector(".conc.active");
    data.concentration = activeConc ? activeConc.dataset.name : "";

    localStorage.setItem("perfumeRecord", JSON.stringify(data));

    const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];

    data.id = Date.now();

    archive.push(data);

    localStorage.setItem("perfumeArchive", JSON.stringify(archive));
  });
  localStorage.setItem("perfumeRecord", JSON.stringify(data));

   const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];
   data.id = Date.now();
   archive.push(data);
   localStorage.setItem("perfumeArchive", JSON.stringify(archive));
}
