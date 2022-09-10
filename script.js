//GLOBAL VARIABLES
const gameGrid = document.querySelector(".Game");
const settingGrid = document.querySelector(".Setting");
const checkboxes = Array.from(
  document.querySelectorAll(".Grid input[type='checkbox']")
);

/*












FUNCTIONS
function to make elements' height equals to their width (squares)*/
function makeSquares(element) {
  element.style.height = `${element.clientWidth}px`;
}

//function to make the setting grid at the level of the game grid
function settingOn() {
  settingGrid.style.position = "relative";
  settingGrid.style.top = `${-settingGrid.offsetHeight}px`;
}

/*














EVENT LISTENERS*/
["DOMContentLoaded", "resize"].forEach((event) => {
  window.addEventListener(event, () => {
    //make squares
    makeSquares(gameGrid);
    makeSquares(settingGrid);
    checkboxes.forEach((checkbox) => makeSquares(checkbox));

    //make settings grid at same level as game grid
    settingOn();
  });
});
