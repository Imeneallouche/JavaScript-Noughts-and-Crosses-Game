//GLOBAL VARIABLES
const gameGrid = document.querySelector(".Grid");
const settingGrid = document.querySelector(".Setting");
const checkboxes = Array.from(
  document.querySelectorAll(".Grid input[type='checkbox']")
);
/*










function to make elements' height equals to their width (squares)*/
function makeSquares(element) {
  element.style.height = `${element.clientWidth}px`;
}

//function to make the setting grid at the level of the game grid
settingOn();
function settingOn() {
  settingGrid.offsetTop = `${-gameGrid.offsetTop}px`;
}

/*








make the:
1-Game Grid
2- Checkboxes
squared*/
makeSquares(gameGrid);
makeSquares(settingGrid);
checkboxes.forEach((checkbox) => makeSquares(checkbox));

window.addEventListener("resize", () => {
  makeSquares(gameGrid);
  makeSquares(settingGrid);
  checkboxes.forEach((checkbox) => makeSquares(checkbox));
});
