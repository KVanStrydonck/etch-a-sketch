const container = document.querySelector(".container");

function randomizeColor(element) {
  let opacity = parseFloat(element.dataset.opacity || 0);

  if (opacity === 0) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
    element.dataset.baseColor = `rgb(${r}, ${g}, ${b})`;
    console.log("New color set:", `rgb(${r}, ${g}, ${b})`);
  }

  opacity = Math.min(opacity + 0.1, 1);

  const baseColor = element.dataset.baseColor;
  element.style.backgroundColor = baseColor.replace("rgb", "rgba").replace(")", `, ${opacity})`);

  // Add visual indicator of opacity level for testing
  element.textContent = Math.round(opacity * 100) + "%";
  element.style.color = opacity > 0.5 ? "black" : "white";
  element.style.textAlign = "center";
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.fontSize = "10px";

  element.dataset.opacity = opacity;

  console.log("After: opacity =", opacity);
  console.log("Current backgroundColor:", element.style.backgroundColor);
}

function resetGrid() {
  let rows = parseInt(prompt("How many rows should the new grid have?"));
  let cols = parseInt(prompt("How many columns should the new grid have?"));

  if (isNaN(rows) || isNaN(cols)) {
    alert("Invalid input");
    return;
  }

  if (rows < 1 || cols < 1) {
    rows = 16;
    cols = 16;
  }

  if (rows > 100 || cols > 100) {
    rows = 100;
    cols = 100;
  }

  container.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.style.width = `calc(100% / ${cols})`;
      div.style.height = `calc(100% / ${rows})`;
      div.dataset.opacity = 0;

      div.addEventListener("mouseover", function () {
        randomizeColor(div);
      });

      container.appendChild(div);
    }
  }
}

function createGrid() {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      const div = document.createElement("div");
      div.dataset.opacity = 0;

      div.addEventListener("mouseover", function () {
        randomizeColor(div);
      });

      container.appendChild(div);
    }
  }
}

const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", resetGrid);

createGrid();
