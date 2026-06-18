import { saveScore, getBestScore, getSettings } from "./localStorage.mjs";
import { getPokemonCard, getYugiohCard } from "./data.mjs";
import { slideCardsIn } from "./animations.mjs";

function cardSelection(cardPrices, selectedFirstCard)  {
    const firstPriceDisplay = document.querySelector("#first-card > p");
    const secondPriceDisplay = document.querySelector("#second-card > p");
    const firstCardPriceString = Number(cardPrices[0]).toFixed(2);
    const secondCardPriceString = Number(cardPrices[1]).toFixed(2);
    const resultDialog = document.querySelector("#result-dialog");
    const resultText = document.querySelector("#result-text");
    let correct = false;

    firstPriceDisplay.textContent = `$ ${firstCardPriceString}`;
    secondPriceDisplay.textContent = `$ ${secondCardPriceString}`;

    if (cardPrices[0] > cardPrices[1])
    {
        if (selectedFirstCard)
            correct = true;

        firstPriceDisplay.classList.toggle("correct");
        secondPriceDisplay.classList.toggle("incorrect");
    }
    else
    {
        if (!selectedFirstCard)
            correct = true;

        firstPriceDisplay.classList.toggle("incorrect");
        secondPriceDisplay.classList.toggle("correct");
    }

    if (correct)
        resultText.textContent = 'Correct!';
    else
        resultText.textContent = 'Incorrect.';

    resultDialog.showModal();

    return correct;
};

async function getNewCards() {
    const gameSettings = getSettings();

    const firstCard = document.querySelector("#first-card");
    const secondCard = document.querySelector("#second-card");
    let firstCardPrice = 0.01;
    let secondCardPrice = 0.01;

    //firstCard.classList.add("hide");
    //secondCard.classList.add("hide");

    let randomSelection = Math.floor(Math.random() * 2);

    // 0 for Pokemon, 1 for Yugioh
    if (randomSelection == 0)
        firstCardPrice = await getPokemonCard(firstCard);
    else
        firstCardPrice = await getYugiohCard(firstCard);

    // Cross-game comparisons
    if (gameSettings[1] == 'true')
        randomSelection = Math.floor(Math.random() * 2);

    if (randomSelection == 0)
        secondCardPrice = await getPokemonCard(secondCard);
    else
        secondCardPrice = await getYugiohCard(secondCard);

    slideCardsIn();

    return [firstCardPrice, secondCardPrice];
};

function gameOver(score) {
    const resultDialog = document.querySelector("#result-dialog");
    const finalResult = document.querySelector("#final-result");
    let finalResultString = `Your final score is ${score}.`;

    if (score > getBestScore())
    {
        saveScore(score);
        finalResultString += ' Incredible!';
    }
        
    finalResult.textContent = finalResultString;
    document.querySelector("#start-game").textContent = "Start New Game";
};

export { cardSelection, getNewCards, gameOver };