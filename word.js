// Must require the letter.js file to work with our words.js creator
var Letter = require("./letter.js");

// Word grabber and letter filler
var Word = function(word) {
    this.word = word;
    this.letters = [];
    this.wordFound = false;

    // Captures user letter selection and push it to our empty letters array
    this.getLetters = function() {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
            // console.log(newLetter);
        }
    };

    // Function to check if user selected letter is in the word
    this.letterFound = function(userLetter) {
        var userSelection = 0;

        // Function to check userSelection against random word
        this.letters.forEach(function(ltr) {
            if (ltr.letter === userLetter) {
                ltr.appear = true;
                userSelection++;
            }
        });

        // If userLetter matches a letter, we show it
        return userSelection;
    };

    // Function to check if the user has found the current word
    this.checkWord = function() {
        if (this.letters.every(function(ltr) {
                return ltr.appear === true;
            })) {
            this.wordFound = true;
            return true;
        }
    };


    // Function to actually display the word based on if letters are found or not
    this.wordShow = function() {
        var display = "";

        this.letters.forEach(function(ltr) {

            var currentLetter = ltr.letterRender();
            display += currentLetter;
        });
        return display;
    };

};

module.exports = Word;
