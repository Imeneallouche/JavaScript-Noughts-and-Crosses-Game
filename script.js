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
let LevelOfDifficulty = "easy";

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

const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*















FUNCTIONS
function to make elements' height equals to their width (squares)*/
function makeSquares(element) {
  element.style.height = `${element.clientWidth}px`;
}

/*



function to make the setting grid at the level of the game grid*/
function SettingOn() {
  settingGrid.style.position = "relative";
  settingGrid.style.top = `${-settingGrid.offsetHeight}px`;
}

/*



function to fix setting button's place*/
function SettingButtonFix() {
  settingButton.style.position = "relative";
  settingButton.style.top = `${-20 * settingButton.clientTop}px`;
  settingButton.style.left = `${-20 * settingButton.clientLeft}px`;
}

/*



function that makes the setting grid go to the top*/
function settingOff(eventSelected) {
  settingGrid.style.position = "relative";
  settingGrid.style.top = `${-3 * settingGrid.offsetHeight}px`;

  //unchek the buttons to start playing
  uncheckAll();

  //remove both classes if they are
  removeClasses();
}

/*



function to switch between level settings and player settings*/
function switchSettings() {
  if (settingTitle.innerHTML === settingTtitleContent) {
    levelButtonsarea.innerHTML = playerSettingContent;
    settingTitle.innerHTML = `Choose Player`;
  } else {
    levelButtonsarea.innerHTML = levelSettingsContent;
    settingTitle.innerHTML = settingTtitleContent;
  }
}

/*



play x o with an easy computer level*/
function EasyLevel() {
  if (allChecked()) {
    Draw();
    return;
  } else {
    let number = Math.floor(Math.random() * 9);
    while (checkboxes[number].checked) {
      number = Math.floor(Math.random() * 9);
    }
    checkboxes[number].checked = true;

    if (player === "x") {
      checkboxes[number].classList.add("o_player");
    } else {
      checkboxes[number].classList.add("x_player");
    }

    //check if the computer has won this
    CheckWinner();
  }
}

/*



play x o on a medium leve*/
function MediumLevel() {
  console.log("let him start but take your precautions");
}

/*



play x o on a hard level*/
function HardLevel() {
  console.log("we will start and make it impossible");
}

/*



set the settings off => detect difficulty level*/
function GameStarts(difficultyLevel) {
  settingOff();
  play = true;
  LevelOfDifficulty = difficultyLevel;

  if (difficultyLevel === "hard") {
    HardLevel();
  }
}

/*



detect the players choice (x or o) => switch the settings from player to difficulty*/
function ChoosePlayer(playerChoice) {
  if (playerChoice === "o") {
    player = "o";
  } else {
    player = "x";
  }
  switchSettings();
}

/*



avoid unchecking checkboxes after being checked*/
function uncheckIt(eventSelected, difficultyLevel = null) {
  if (!eventSelected.target.checked) {
    eventSelected.target.checked = !eventSelected.target.checked;
    return false;
  }
  return true;
}

/*



*/
function CheckWinner() {
  //loop over possible wins
  for (let i = 0; i < possibleWins.length; i++) {
    //one of the possible wins arrays
    let possibleWin = possibleWins[i];
    let j = 0;
    let winner = true;
    let playerClass = null;

    //loop over the 3 checkboxes of possible win
    while (j < possibleWin.length && winner == true) {
      if (checkboxes[possibleWin[j]].checked) {
        //the player who is playing
        playerClass = checkboxes[possibleWin[0]].classList[0];

        if (!(checkboxes[possibleWin[j]].classList[0] == playerClass)) {
          winner = false;
        }
      } else {
        winner = false;
      }
      j++;
    }
    if (winner == true) {
      if (playerClass.includes(player)) {
        YouWin();
      } else {
        YouLost();
      }
      return true;
    }
  }
  return false;
}

/*



*/
function Draw() {
  console.log("Draw");
  SettingOn();
  //settingTtitleContent = `<h1 class="Title">Draw <br> Select Difficulty</h1>`;
  settingTitle.innerHTML = `Draw <br> Select Difficulty`;
}

/*



*/
function YouWin() {
  console.log("You win");
  SettingOn();
  //settingTtitleContent = `<h1 class="Title">You Won <br> Select Difficulty</h1>`;
  settingTitle.innerHTML = `Youn Won <br> Select Difficulty`;
}

/*



*/
function YouLost() {
  console.log("you lose");
  SettingOn();
  //settingTtitleContent = `<h1 class="Title">You Lost <br> Select Difficulty</h1>`;
  settingTitle.innerHTML = `You Lost <br> Select Difficulty`;
}

/*



*/
function allChecked() {
  let allCheckboxesChecked = true;
  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      allCheckboxesChecked = false;
      break;
    }
  }
  return allCheckboxesChecked;
}

/*



*/
function uncheckAll() {
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
}

/*



*/
function removeClasses() {
  checkboxes.forEach((checkbox) => {
    checkbox.classList.remove("x_player");
    checkbox.classList.remove("o_player");
  });
}

/*



*/
function PlayerPLays(eventSelected) {
  if (uncheckIt(eventSelected)) {
    if (player === "x") {
      eventSelected.target.classList.add("x_player");
    } else {
      eventSelected.target.classList.add("o_player");
    }

    //check if there is a win after player's move
    if (!CheckWinner()) {
      //if not continue with computer's turn
      switch (LevelOfDifficulty) {
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
