const cards = document.querySelectorAll(".card");
const nextBtn = document.querySelector(".next");

function drawShape(ctx, shape, size) {
  if (shape === "round") {
    ctx.beginPath();
    ctx.arc(0, 0, size * 1.15, 0, Math.PI * 2);
    ctx.fill();
  }

  if (shape === "sharp") {
    ctx.beginPath();
    ctx.moveTo(0, -size * 2.2);
    ctx.lineTo(-size * 0.6, size);
    ctx.lineTo(size * 0.6, size);
    ctx.closePath();
    ctx.fill();
  }

  if (shape === "solid") {
  ctx.beginPath();
  ctx.roundRect(
    -size * 1.2,
    -size * 1.2,
    size * 2.4,
    size * 2.4,
    3   // 🔥 여기 r값
  );
  ctx.fill();
}

  if (shape === "air") {
    const blur = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3.2);
    blur.addColorStop(0, "rgba(162, 162, 162, 0.35)");
    blur.addColorStop(1, "rgba(162, 162, 162, 0)");
    ctx.fillStyle = blur;
    ctx.beginPath();
    ctx.arc(0, 0, size * 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function getSize(shape) {
  if (shape === "solid") {
    return 4 + Math.random() * 6;
  }

  if (shape === "sharp") {
    return 5 + Math.random() * 7;
  }

  return 2 + Math.random() * 4;
}

function drawPreviews() {
  document.querySelectorAll(".preview-canvas").forEach((preview) => {
    const ctx = preview.getContext("2d");
    const shape = preview.parentElement.dataset.shape;

    preview.width = 130;
    preview.height = 105;

    ctx.clearRect(0, 0, preview.width, preview.height);
    ctx.fillStyle = "#a2a2a2";
    ctx.globalAlpha = 0.42;

    for (let i = 0; i < 34; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 38;
      const x = 65 + Math.cos(angle) * r;
      const y = 50 + Math.sin(angle) * r;
      const size = getSize(shape);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI * 2);
      drawShape(ctx, shape, size);
      ctx.restore();
    }
  });
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => {
      c.classList.remove("active");
      const img = c.querySelector(".card-bg");
      if (img) img.src = img.src.replace("2.png", "1.png");
    });

    card.classList.add("active");

    const img = card.querySelector(".card-bg");
    if (img) img.src = img.src.replace("1.png", "2.png");

    // 여기로 들어와야 함
    localStorage.setItem("selectedShape", card.dataset.shape);
  });
});

if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    if (!document.querySelector(".card.active")) {
      e.preventDefault();
      alert("하나 선택해줘");
    }
  });
}

drawPreviews();

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const nextBtn = document.getElementById("nextBtn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => {
        c.classList.remove("active");

        const img = c.querySelector(".card-bg");
        img.src = img.src.replace("2.png", "1.png");
      });

      card.classList.add("active");

      const img = card.querySelector(".card-bg");
      img.src = img.src.replace("1.png", "2.png");
    });
  });

  nextBtn.addEventListener("click", () => {
    const activeCard = document.querySelector(".card.active");

    const data = JSON.parse(localStorage.getItem("perfumeRecord")) || {};

    if (activeCard) {
      data.shape = activeCard.dataset.shape;
      data.baseImage = activeCard.querySelector(".card-bg").src;
    }

    localStorage.setItem("perfumeRecord", JSON.stringify(data));
  });
});

const isEdit = new URLSearchParams(window.location.search).get("edit") === "true";
const data = JSON.parse(localStorage.getItem("perfumeRecord")) || {};

if (isEdit && data.shape) {
  const card = document.querySelector(`.card[data-shape="${data.shape}"]`);
  if (card) {
    card.classList.add("active");
    const img = card.querySelector(".card-bg");
    img.src = img.src.replace("1.png", "2.png");
  }
}