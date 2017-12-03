var inquirer = require("inquirer");
var isLetter = require("is-letter");
var Word = require("./word.js");


var wordBank = {
    randomWords: ["sun", "sky", "clouds", "grass", "trees", "day", "night", "light", "dark", "stars", "galaxy", "planets", "astronomy"]
};
var remainingGuesses = 10;
var lettersGuessed = [];
var display = 0;
var currentWord;


startGame();
// Build a starting point function for the game to begin
function startGame() {
    console.log("-----------------------------" + "\n" +
        "Astronomer's Paradise Hangman" + "\n" +
        "-----------------------------");

    // Clears lettersGuessed before a new game begins
    if (lettersGuessed.length > 0) {
        lettersGuessed = [];
    }

    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "Ready to Play?"
    }]).then(function(answer) {
        if (answer.play) {
            console.log("\n" + "You get 10 turns to guess the right word." + "\n" + "Good Luck!");
            newGame();

        }
        else {
            console.log("Fine then. We'll play another time.");
        }
    });
}


// Function to reset the game whena newGame is called
function newGame(chooseWord) {
    if (remainingGuesses === 10) {
        console.log("----------------------------");

        var random = Math.floor((Math.random() * wordBank.randomWords.length) + 1);
        currentWord = new Word(wordBank.randomWords[random]);
        // console.log(currentWord);
        currentWord.getLetters();
        // console.log("getLetters");
        console.log("\n" + currentWord.wordShow() + "\n");
        promptUser();
    }
    else {
        resetRemainingGuesses();
        newGame();
    }
}

// Function to reset the remaingGuesses
function resetRemainingGuesses() {
    remainingGuesses = 0;
}

// function to have the user enter a letter using inquirer
function promptUser() {
    inquirer.prompt([{
            name: "chosenLetter",
            type: "input",
            message: "Choose a letter",
            validate: function(value) {
                if (isLetter(value)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

    ]).then(function(ltr) {

        var letterReturned = ltr.chosenLetter;

        // Check if you guess that letter already and set flag to false
        var alreadyGuessed = false;
        for (var i = 0; i < lettersGuessed.length; i++) {
            if (letterReturned === lettersGuessed[i]) {
                alreadyGuessed = true;
            }
        }

        if (alreadyGuessed === false) {
            lettersGuessed.push(letterReturned);

            //Creat variable to check if letter was in word
            var found = currentWord.letterFound(letterReturned);

            if (found === 0) {
                console.log("Wrong guess");

                remainingGuesses--;

                console.log("Remaining Guesses: " + remainingGuesses);
                console.log("-------------------------------" + "\n" +
                    currentWord.wordShow() + "\n" + "-------------------------------" + "\n" +
                    "Letters Guessed: " + lettersGuessed);
            }
            else {
                console.log("You are correct!");

                if (currentWord.checkWord() === true) {
                    console.log("\n" + currentWord.wordShow() + "\n" +
                        "---------- YOU WIN! ----------" + "\n" + "---------- Play again? ----------");

                    return startGame();
                }
                else {
                    console.log("Remaining guesses: " + remainingGuesses + "\n" +
                        currentWord.wordShow() + "\n" + "-------------------------------" + "\n" +
                        "Letters Guessed: " + lettersGuessed);
                }
            }

            // If guesses run out, and word is not found...
            if (remainingGuesses > 0 && currentWord.wordFound === false) {
                promptUser();
            }
            else if (remainingGuesses === 0) {
                console.log("\n" + "---------- GAME OVER ----------" + "\n" +
                    "The word you were trying to guess was: " + currentWord.word + "\n" + "Play again?" + "\n");
                return startGame();
            }
            else if () {
                console.log("You've guessed that letter already, try again.");
                promptUser();
            }
        }
    });
}
