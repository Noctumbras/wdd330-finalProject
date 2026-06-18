import { loadScore, loadSettings, saveSettings, getSettings } from "./localStorage.mjs";
import { cardSelection, getNewCards, gameOver } from "./game.mjs";


const preGameSection = document.querySelector("#pre-game");
const startHead = document.querySelector("#pre-game-head");
const gameDisplaySection = document.querySelector("#game-display");

const settingsButton = document.querySelector("#settings-button");
const gameSettingsSection = document.querySelector("#game-settings");
const saveSettingsButton = document.querySelector("#save-settings");

const startGameButton = document.querySelector("#start-game");
const firstCardButton = document.querySelector("#first-card-button");
const secondCardButton = document.querySelector("#second-card-button");
const nextCardsButton = document.querySelector("#next-cards-button");

const questionNumberDisplay = document.querySelector("#question-number");
const settingsError = document.querySelector("#settings-error");

const resultDialog = document.querySelector("#result-dialog");
const closeResultButton = document.querySelector("#close-dialog");


const STANDARD_GAME_LENGTH = 10;

let cardPrices = [];
let gameScore = 0;
let questionNumber = 1;
let gameSettings = [];
let gameActive = false;

loadScore();
loadSettings();

// Event listeners

settingsButton.addEventListener('click', () => {
    loadSettings();
    gameSettingsSection.classList.toggle("hide");
    settingsError.classList.add("hide");
});

saveSettingsButton.addEventListener('click', () => {
    if (!gameActive)
        saveSettings();
    else {
        settingsError.textContent = "Finish your current game before changing settings!"
        settingsError.classList.remove("hide");
    }
})

startGameButton.addEventListener('click', async () => {
    if (gameActive) {
        gameActive = false;

        startHead.classList.remove("hide");
        gameDisplaySection.classList.add("hide");
        startGameButton.textContent = "Start New Game";
    }
    else {
        gameScore = 0;
        questionNumber = 1;
        gameSettings = getSettings();
        gameActive = true;

        if(gameSettings[0] == 'standard')
        {
            questionNumberDisplay.classList.remove("hide");
            questionNumberDisplay.textContent = `Comparison ${questionNumber}/${STANDARD_GAME_LENGTH}`;
        }    
        else
            questionNumberDisplay.classList.add("hide");

        startHead.classList.add("hide");
        gameDisplaySection.classList.remove("hide");

        startGameButton.textContent = "Quit Game";

        cardPrices = await getNewCards();
    }
});

firstCardButton.addEventListener('click', () => {
    if(cardSelection(cardPrices, true))
        gameScore++;

    firstCardButton.classList.toggle("hide");
    secondCardButton.classList.toggle("hide");
    if (questionNumber == STANDARD_GAME_LENGTH)
    {
        gameActive = false;
        gameOver(gameScore);
    }
        
    else
        nextCardsButton.classList.toggle("hide");
});

secondCardButton.addEventListener('click', () => {
    if(cardSelection(cardPrices, false))
        gameScore++;

    firstCardButton.classList.toggle("hide");
    secondCardButton.classList.toggle("hide");
    if (questionNumber == STANDARD_GAME_LENGTH)
        gameOver(gameScore);
    else
        nextCardsButton.classList.toggle("hide");
});

nextCardsButton.addEventListener('click', async () => {
    firstCardButton.classList.toggle("hide");
    secondCardButton.classList.toggle("hide");
    nextCardsButton.classList.toggle("hide");

    if(gameSettings[0] == 'standard')
    {
        questionNumber++;
        questionNumberDisplay.textContent = `Comparison ${questionNumber}/${STANDARD_GAME_LENGTH}`;
    }
        
    cardPrices = await getNewCards();
});

closeResultButton.addEventListener('click', () => {
    resultDialog.close();
});