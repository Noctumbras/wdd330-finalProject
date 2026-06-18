function slideCardsIn() {
    const firstCard = document.querySelector("#first-card");
    const secondCard = document.querySelector("#second-card");

    firstCard.classList.remove("slide-from-left");
    secondCard.classList.remove("slide-from-right");

    void firstCard.offsetWidth;
    void secondCard.offsetWidth;

    firstCard.classList.add("slide-from-left");
    secondCard.classList.add("slide-from-right");
}

export { slideCardsIn };