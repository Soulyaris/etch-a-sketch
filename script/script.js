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
  var cellWidth = (gameField.offsetWidth - 52) / fieldSize.value;
  var cellHeight = (gameField.offsetHeight - 52) / fieldSize.value
  for (var i = 0; i < fieldSize.value * fieldSize.value; i++) 
    gameField.innerHTML += `<div class="fieldCell" style="width:${cellWidth-2}px; height:${cellHeight-2}px; min-height: 1px">&nbsp</div>`;
  generateCellEvents();
}

function generateCellEvents(){
  var fieldCells = document.querySelectorAll('.fieldCell');
  fieldCells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
      var colorScheme = document.querySelector('input[name=colorScheme]:checked').value;
      switch(true) {
        case colorScheme == "black" : cell.style.backgroundColor = "black"; break;
        case colorScheme == "rainbow" : {
          cell.style.backgroundColor = `rgb(${colorIntensity()}, ${colorIntensity()}, ${colorIntensity()})`;
        } break;
      }
    });
  });
}

function colorIntensity() {
  var rand = 0 - 0.5 + Math.random() * (255 - 0 + 1)
  rand = Math.round(rand);
  return rand;
}