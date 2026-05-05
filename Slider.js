document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("visualCanvas");
  const ctx = canvas.getContext("2d");

  const colorSlider = document.getElementById("colorSlider");
  const opacitySlider = document.getElementById("opacitySlider");
  const densitySlider = document.getElementById("densitySlider");

  const sliders = document.querySelectorAll(".range-slider");
  const seasons = document.querySelectorAll(".season");

  const recordData = JSON.parse(localStorage.getItem("perfumeRecord")) || {};
  const selectedShape = recordData.shape || "round";

  canvas.width = 300;
  canvas.height = 210;

  const particles = [];

  for (let i = 0; i < 260; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random(),
      size: 1.2 + Math.random() * 3.2,
      rotation: Math.random() * Math.PI * 2,
      softness: 0.35 + Math.random() * 0.45,
    });
  }

  function drawShape(ctx, shape, size, hue)  {
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
      ctx.roundRect(-size * 1.2, -size * 1.2, size * 2.4, size * 2.4, 3);
      ctx.fill();
    }

    if (shape === "air") {
       const blur = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3.2);
       blur.addColorStop(0, `hsla(${hue}, 15%, 79%, 0.35)`);
       blur.addColorStop(1, `hsla(${hue}, 15%, 79%, 0)`);
       ctx.fillStyle = blur;

       ctx.beginPath();
      ctx.arc(0, 0, size * 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateSliderUI() {
    sliders.forEach((slider) => {
      const wrap = slider.closest(".slider-wrap");
      const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

      wrap.style.setProperty("--value", `${percent}%`);

      const fill = wrap.querySelector(".slider-fill");
      fill.style.width = `${percent}%`;
    });
  }

  function drawVisual() {
    const colorValue = Number(colorSlider.value);
    const opacityValue = Number(opacitySlider.value);
    const densityValue = Number(densitySlider.value);

    const hue = 25 + colorValue * 1.8;
    const opacity = 0.18 + (opacityValue / 100) * 0.55;
    const density = 0.35 + (densityValue / 100) * 1.2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.forEach((p) => {
      const radius = 120 - densityValue * 0.55;
      const r = Math.pow(p.distance, density) * radius;

      const x = centerX + Math.cos(p.angle) * r;
      const y = centerY + Math.sin(p.angle) * r;

      let size = p.size;

      if (selectedShape === "solid") size += 2.4;
      if (selectedShape === "sharp") size += 3.4;

      size += densityValue * 0.035;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.rotation);

      ctx.globalAlpha = opacity * p.softness;
      ctx.fillStyle = `hsl(${hue}, 15%, 79%)`;

      drawShape(ctx, selectedShape, size, hue);

      ctx.restore();
    });
  }

  sliders.forEach((slider) => {
    slider.addEventListener("input", () => {
      updateSliderUI();
      drawVisual();
    });
  });

  seasons.forEach((season) => {
    season.addEventListener("click", () => {
      const name = season.dataset.name;
      const isSelected = season.classList.contains("selected");

      if (isSelected) {
        season.classList.remove("selected");
        season.src = `assets/5.Slider/${name}1.png`;
      } else {
        season.classList.add("selected");
        season.src = `assets/5.Slider/${name}2.png`;
      }
    });
  });

  updateSliderUI();
  drawVisual();

  const nextBtn = document.getElementById("nextBtn");

  if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("perfumeRecord")) || {};

    data.visualImage = canvas.toDataURL("image/png");

    data.colorValue = colorSlider.value;
    data.opacityValue = opacitySlider.value;
    data.densityValue = densitySlider.value;

    const selectedSeasons = [...document.querySelectorAll(".season.selected")]
      .map(s => s.dataset.name);

    data.season = selectedSeasons;

localStorage.setItem("perfumeRecord", JSON.stringify(data));
console.log("2페이지 저장:", data);
  });
}

});