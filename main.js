/*
Acciones:
1. Usuario hace click en una letra determinada.
2. Esa letra queda deshabilitada y se filtra del abecedario.
3. Se chequea que esté la letra y en qué posición de la palabra.
4. Se chequea que la palabra esté completada, si es así el usuario gana.
5. El usuario puede arriesgar por medio de un input para tratar de adivinar.
6. Si el usuario no tiene mas vidas, pierde la partida.

*/

const player = {
    tries: 6,
    canPlay: true,

    continuePlaying() {
        this.canPlay = this.tries > 0;
        return this.canPlay;
    },

    decrementTries() {
        this.tries = this.tries - 1;
    },

    getTries() {
        return this.tries;
    },

    updatePlayer(boolean) {
        this.canPlay = boolean;
    },
};

const words = [
    "Sonrojarse",
    "Llaves",
    "Escuadra",
    "Obsequio",
    "Cera",
    "Bicicleta",
    "Resbalar",
    "Virus",
    "Telescopio",
    "Dinosaurio",
];

const alphabet = {
    letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "Ñ",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ],

    filterLetter(letter) {
        this.letters = this.letters.filter((character) => character != letter);
    },
};

const selectedWord = getRandomWord(words);
const wordArray = createArrayWord(selectedWord);
const gameArray = createEmptyArray(selectedWord);

/* HTML ELEMENTS */
const htmlAlphabet = document.getElementById("abc");
const htmlLifes = document.getElementById("vidas");
const htmlWord = document.getElementById("texto");
const htmlGuest = document.getElementById("arriesgar");

renderAlphabet(alphabet.letters);
renderTries(player.tries);
renderGameWord(gameArray);

htmlAlphabet.addEventListener("click", guestLetter);
htmlAlphabet.addEventListener("click", winByClick);
htmlGuest.addEventListener("click", winByInput);

/* SETUP FUNCTIONS */

function getRandomWord(words) {
    const index = Math.floor(Math.random() * (words.length - 1));
    return words[index].toUpperCase();
}

function createArrayWord(word) {
    return word.split("");
}

function createEmptyArray(word) {
    return "_".repeat(word.length).split("");
}

/* RENDER HTML FUNCIONS */

function renderAlphabet(alphabet) {
    for (let letter of alphabet) {
        let button = document.createElement("button");
        button.value = letter;
        button.textContent = letter;
        button.classList.add("btn", "btn-info");
        htmlAlphabet.appendChild(button);
    }
}

function renderTries(tries) {
    htmlLifes.textContent = tries;
}

function renderGameWord(gameArray) {
    htmlWord.textContent = gameArray.join(" ");
}

/* GAME FUNCIONS */

function checkLetter(letter) {
    const hasWord = wordArray.some((character) => character === letter);

    if (hasWord) {
        updateGameArray(letter);
    } else {
        player.decrementTries();
    }

    alphabet.filterLetter(letter);
}

function updateGameArray(letter) {
    for (let word in wordArray) {
        if (letter == wordArray[word]) {
            gameArray[word] = letter;
        }
    }
}

function guestWord(word, selectedWord) {
    return word == selectedWord;
}

function checkGameStatus(hasWin, canPlay) {
    if (hasWin) {
        successLog("Has ganado!");
        player.canPlay = false;
    } else if (!canPlay) {
        errorLog(`Has Perdido! La palabra correcta era: ${selectedWord}`);
    }
}

/* GAME EVENTS */

function guestLetter(event) {
    if (event.target.classList.contains("btn-info") && player.canPlay) {
        event.target.disabled = true;
        checkLetter(event.target.value, wordArray, gameArray);
        renderGameWord(gameArray);
        renderTries(player.tries);
    }
}

function winByClick() {
    if (player.canPlay) {
        const gameWord = gameArray.join("");
        const hasWin = guestWord(gameWord, selectedWord);
        checkGameStatus(hasWin, player.continuePlaying());
    }
}

function winByInput() {
    if (player.canPlay) {
        const userGuest = document.getElementById("input").value.toUpperCase();
        const hasWin = guestWord(userGuest, selectedWord);

        if (!hasWin) {
            player.decrementTries();
            renderTries(player.tries);
        }

        checkGameStatus(hasWin, player.continuePlaying());
    }
}

/* MESSAGES */

function successLog(msg) {
    console.log(
        `%c${msg}`,
        "background-color: #00ff00 ; color: #00; padding: 4px; font-weight: bold;"
    );
}

function errorLog(msg) {
    console.log(
        `%c${msg}`,
        "background-color: #FF9494 ; color: #ff; padding: 4px; font-weight: bold;"
    );
}
