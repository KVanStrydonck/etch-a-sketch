const container = document.querySelector(".container");
const resetBtn = document.querySelector(".resetBtn");

function changeColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  // Only change background color once on hover
  if (this.dataset.baseColor < 1) {
    this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    this.dataset.baseColor = `rgb(${r}, ${g}, ${b})`;
  }

  // Set opacity, capped at 1 and min 0.1
  let opacity = Math.min(1, parseFloat(this.dataset.opacity) + 0.1);

  this.style.opacity = opacity;
  this.dataset.opacity = opacity;
}

// Create 16x16 grid on page load
for (let rows = 0; rows < 16; rows++) {
  for (let cols = 0; cols < 16; cols++) {
    // Create new cell
    const cell = document.createElement("div");
    // Save initial color
    cell.dataset.baseColor = 0;
    // Save initial opacity
    cell.dataset.opacity = 0;
    // Create hover event listener
    cell.addEventListener("mouseenter", changeColor);
    // Add cell to container
    container.appendChild(cell);
  }
}

resetBtn.addEventListener("click", function () {
  const rows = parseInt(prompt("How many rows should the new grid have?"));
  const cols = parseInt(prompt("How many columns should the new grid have?"));

  // Don't allow invalid input
  if (isNaN(rows) || isNaN(cols)) {
    alert("You entered invalid input, try again");
    return;
  }

  // Don't allow more than 100 rows or columns
  if (rows > 100 || cols > 100) {
    rows = 100;
    cols = 100;
  }

  // Don't allow less than 1 row or column
  if (rows < 1 || cols < 1) {
    rows = 16;
    cols = 16;
  }

  // Clear current grid
  container.innerHTML = "";

  // Create new grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Create new cell
      const cell = document.createElement("div");
      // Save initial color
      cell.dataset.baseColor = 0;
      // Save initial opacity
      cell.dataset.opacity = 0;
      // Add hover event listener
      cell.addEventListener("mouseenter", changeColor);
      // Update width and height of cells
      cell.style.width = `calc(100% / ${cols})`;
      cell.style.height = `calc(100% / ${rows})`;
      // Add cell to container
      container.appendChild(cell);
    }
  }
});
