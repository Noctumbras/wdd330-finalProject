function loadScore() {
    const score = localStorage.getItem("bestScore") || 0;
    document.querySelector("#score").textContent = `Best Score: ${score}`;
};

function saveScore(score) {
    localStorage.setItem("bestScore", score);
    document.querySelector("#score").textContent = `Best Score: ${score}`;
};

function getBestScore() {
    const score = localStorage.getItem("bestScore") || 0;
    return score;
}

function getSettings() {
    const gameMode = localStorage.getItem("gameMode") || "standard";
    const crossGame = localStorage.getItem("crossGame") || true;
    const monsters = localStorage.getItem("monsters") || false;

    return [gameMode, crossGame, monsters];
}

function loadSettings() {
    const settings = getSettings();

    document.querySelector(`#${settings[0]}`).checked = true;
    if (settings[1] == 'true')
        document.querySelector("#cross-game").checked = true;
    else
        document.querySelector("#cross-game").checked = false;
    if (settings[2] == 'true')
        document.querySelector("#monsters").checked = true;
    else
        document.querySelector("#monsters").checked = false;

}

function saveSettings() {
    const gameMode = document.querySelector("input[name=game-mode]:checked").value;
    let crossGame = false;
    if (document.querySelector("input[name=cross-game]:checked"))
        crossGame = true;
    let monsters = false;
    if (document.querySelector("input[name=monsters]:checked"))
        monsters = true;

    localStorage.setItem("gameMode", gameMode);
    localStorage.setItem("crossGame", crossGame);
    localStorage.setItem("monsters", monsters);

    document.querySelector("#game-settings").classList.toggle("hide");
}

export { loadScore, saveScore, getBestScore, getSettings, loadSettings, saveSettings };