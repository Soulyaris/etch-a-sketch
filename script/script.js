const fieldSize = document.querySelector('#fieldSize');
const gameField = document.querySelector('#gameField');
const resetButton = document.querySelector('#clear');

fieldSize.value = 16;
fieldSizeLabelChange();
fillGameField();

resetButton.addEventListener('click', (e) => {
  fillGameField();
})

fieldSize.addEventListener('input', (e) => {
  fieldSizeLabelChange();
})

fieldSize.addEventListener('change', (e) => {
  fillGameField();
})

function fieldSizeLabelChange(){
  document.getElementById('fieldSizeLabel').innerHTML = `${fieldSize.value} х ${fieldSize.value}`;
}

function fillGameField() {
  gameField.innerHTML = "";
  gameField.style.gridTemplateRows = `repeat(${fieldSize.value}, 1fr)`;
  gameField.style.gridTemplateColumns = `repeat(${fieldSize.value}, 1fr)`;
  for (let i = 0; i < fieldSize.value ** 2; i++) {
    let  fieldCell = document.createElement('div');
    fieldCell.classList.add('fieldCell');
    gameField.appendChild(fieldCell);};
  generateCellEvents();
}

function generateCellEvents(){
  let fieldCells = document.querySelectorAll('.fieldCell');
  fieldCells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
      applyNewColor(cell);
    });
  });
}

function applyNewColor(cell){
  let colorScheme = document.querySelector('input[name=colorScheme]:checked').value;
  switch(true) {
    case colorScheme == "black" : cell.style.backgroundColor = `rgba(255,255,255,0)`; break;
    case colorScheme == "rainbow" : {
      cell.style.backgroundColor = `rgba(${colorIntensity()}, ${colorIntensity()}, ${colorIntensity()}, 1)`;
    } break;
    case colorScheme == "+10% black" : {
      let alphaColor = getComputedStyle(cell).getPropertyValue("background-color");
      let parts = alphaColor.match(/[\d.]+/g);
      if (parts.length === 3) parts.push(1);
      parts[3] = Math.min(1, Math.max(0, parseFloat(parts[3]) - 0.1));
      cell.style.backgroundColor = `rgba(${ parts.join(',') })`;
    } break;
  }
}

let colorIntensity = () => Math.round(0 - 0.5 + Math.random() * (255 - 0 + 1));