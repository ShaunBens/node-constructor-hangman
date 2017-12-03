// Create a constructor to handle letter creation
var Letter = function(ltr) {
    this.letter = ltr;
    this.appear = false;

    // creating a function to show  letter on screen as a blank or true letter
    this.letterRender = function(letter) {
        if (this.letter == " ") {
            this.appear = true;
            return " ";
        }
        if (this.appear === false) {
            return " _ ";
        }
        else {
            return this.letter;
        }
    };
};

module.exports = Letter;
