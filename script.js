//GLOBAL VARIABLES
const gameGrid = document.querySelector(".Game");
const settingGrid = document.querySelector(".Setting");
const checkboxes = Array.from(
  document.querySelectorAll(".Grid input[type='checkbox']")
);
const settingButton = document.querySelector(".Setting button");
const levelButtons = Array.from(
  document.querySelectorAll(".Setting input[type='button']")
);

let play = false;
/*












FUNCTIONS
function to make elements' height equals to their width (squares)*/
function makeSquares(element) {
  element.style.height = `${element.clientWidth}px`;
}

//function to make the setting grid at the level of the game grid
function SettingOn() {
  settingGrid.style.position = "relative";
  settingGrid.style.top = `${-settingGrid.offsetHeight}px`;
}

//function to fix setting button's place
function SettingButtonFix() {
  settingButton.style.position = "relative";
  settingButton.style.top = `${-settingButton.offsetHeight / 2}px`;
  settingButton.style.left = `${-settingButton.offsetWidth}px`;
}

//function that makes the setting grid go to the top
function settingOff(eventSelected) {
  console.log(`Up now! because of ${eventSelected.target.value} button`);
  settingGrid.style.position = "relative";
  settingGrid.style.top = `${-3 * settingGrid.offsetHeight}px`;
}
/*














EVENT LISTENERS*/
["DOMContentLoaded", "resize"].forEach((event) => {
  window.addEventListener(event, () => {
    //make squares
    makeSquares(gameGrid);
    makeSquares(settingGrid);
    checkboxes.forEach((checkbox) => makeSquares(checkbox));

    //fix the place of the setting button
    SettingButtonFix();

    //make settings grid at same level as game grid
    if (!play) {
      SettingOn();
    }
  });
});

levelButtons.forEach((levelButton) =>
  levelButton.addEventListener("click", (eventSelected) => {
    play = true;
    settingOff(eventSelected);
  })
);
