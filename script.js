//GLOBAL VARIABLES
const gameGrid = document.querySelector(".Game");

const settingGrid = document.querySelector(".Setting");

const checkboxes = Array.from(
  document.querySelectorAll(".Grid input[type='checkbox']")
);
const settingButton = document.querySelector(".setting_button");

const levelButtons = Array.from(
  document.querySelectorAll(".Setting .levels input[type='button']")
);

const levelButtonsarea = document.querySelector(".Setting .levels");

const levelSettingsContent = levelButtonsarea.innerHTML;

const settingTitle = document.querySelector(".Setting h1");

const settingTtitleContent = settingTitle.innerHTML;

const playerSettingContent = `
<input type="button" value="x" data-player="x" onclick="ChoosePlayer('x')">
<input type="button" value="o" data-player="o" onclick="ChoosePlayer('o')">
`;

let play = false;
let player = "x";
const cssQuestions = [
  "What is the CSS property to change font/typeface of the text?",
  "What is the CSS property to changesize of the text?",
  "What is the CSS property to add space between its content and its border?",
  "What is the CSS property to change the color of the background of any element?",
  "What is the CSS property to add space around an element, outside of any defined borders?",
  "What is the CSS property to make the text appear in italic",
  "What is the CSS property to make the text underlined",
  "What is the CSS property to change the color of the text",
];
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
  settingButton.style.top = `${-20 * settingButton.clientTop}px`;
  settingButton.style.left = `${-20 * settingButton.clientLeft}px`;
}

//function that makes the setting grid go to the top
function settingOff(eventSelected) {
  settingGrid.style.position = "relative";
  settingGrid.style.top = `${-3 * settingGrid.offsetHeight}px`;
}

//function to switch between level settings and player settings
function switchSettings() {
  if (settingTitle.innerHTML === settingTtitleContent) {
    levelButtonsarea.innerHTML = playerSettingContent;
    settingTitle.innerHTML = `Choose Player`;
  } else {
    levelButtonsarea.innerHTML = levelSettingsContent;
    settingTitle.innerHTML = settingTtitleContent;
  }
}

function EasyLevel() {
  let number = Math.floor(Math.random() * 9);
  console.log(number);
  while (checkboxes[number].checked) {
    number = Math.floor(Math.random() * 9);
  }
  checkboxes[number].checked = true;

  if (player === "x") {
    checkboxes[number].classList.add("o_player");
  } else {
    checkboxes[number].classList.add("x_player");
  }
}

function MediumLevel() {
  console.log("let him start but take your precautions");
}

function HardLevel() {
  console.log("we will start and make it impossible");
}

function GameStarts(difficultyLevel) {
  settingOff();
  play = true;

  switch (difficultyLevel) {
    case "easy":
      EasyLevel();
      break;

    case "medium":
      MediumLevel();
      break;

    case "hard":
      HardLevel();
      break;

    default:
      console.log("not such a thing man");
      break;
  }
}

function ChoosePlayer(playerChoice) {
  if (playerChoice === "o") {
    player = "o";
  } else {
    player = "x";
  }
  console.log(`he is playing with ${player}`);
  switchSettings();
}

function uncheckIt(eventSelected, difficultyLevel = null) {
  if (!eventSelected.target.checked) {
    eventSelected.target.checked = !eventSelected.target.checked;
    return false;
  }
  return true;
}

function PlayerPLays(eventSelected) {
  if (uncheckIt(eventSelected)) {
    if (player === "x") {
      eventSelected.target.classList.add("x_player");
    } else {
      eventSelected.target.classList.add("o_player");
    }
    EasyLevel();
  }
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

/*
levelButtons.forEach((levelButton) =>
  levelButton.addEventListener("click", (eventSelected) => {
    play = true;
    settingOff(eventSelected);
  })
);
*/

settingButton.addEventListener("click", switchSettings);

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", (eventSelected) =>
    PlayerPLays(eventSelected)
  )
);
