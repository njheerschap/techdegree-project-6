const startButton = document.querySelector('.btn__reset');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let wrongGuess = 0
let phrases = ['rome was not built in a day', 'the early bird gets the worm', 'the end justifies the means', 'a picture is worth a thousand words', 'it takes two to tango', 'a drop in the bucket']

// Generate random phrase from 'phrases'
const getRandomPhrase = arr => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex];
    return randomPhrase;  
}

// Display phrase characters 
const addPhraseToDisplay = arr => {
    const randomPhrase = getRandomPhrase();
    const phraseCharacters = randomPhrase.split('')
    for (let i = 0; i < phraseCharacters.length; i++) {
        const li = document.createElement('li');
        const letterBlock = phrase.appendChild(li);
        letterBlock.textContent = phraseCharacters[i];
        if (li.textContent === ' ') {
            li.className = 'space'
        } else {
            li.className = 'letter'
        }
    }
}

// Check whether clicked letter is a match
const phraseToGuess = getRandomPhrase();
addPhraseToDisplay(phraseToGuess);
const checkLetter = (clicked) => {
    const li = document.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < li.length; i++) {
        if ( clicked.textContent === li[i].textContent ) {
            li[i].className += ' show';
            match = clicked.textContent;
        } 
    }   
    return match;
}

// Check te see when win or lose requirements have been met
const checkWin = () => {
    let letters = document.querySelectorAll('li.letter');
    let shownLetters = document.querySelectorAll('li.show');
    const youWon = document.querySelector('#overlay');
    if (letters.length === shownLetters.length) {
        youWon.className = 'win';
        startButton.textContent = 'You Won!!!'; 
        youWon.style.display = 'flex';
    }
    if (wrongGuess > 4 ) {
        youWon.className = 'lose';
        startButton.textContent = 'Sorry, you lost'
        youWon.style.display = 'flex'; 
    }
    

}

// Display the game board
startButton.addEventListener ('click', () => {
    const startGame = document.querySelector('#overlay');
    startGame.style.display = 'none'    
})

// Capture user clicks. If correct, display in puzzle. If incorrect, lose life
keyboard.addEventListener ('click', (e) => {
    let target = e.target;
    let targetContent = e.target.textContent;
    if ( target.tagName === 'BUTTON') {
        let isCorrectLetter = checkLetter(target);
        if (target.className !== 'chosen' & targetContent === isCorrectLetter) {
            target.className = 'chosen';
        } else if (targetContent !== isCorrectLetter & target.className !== 'chosen') {
            let ol = document.querySelector('ol');
            let li = document.querySelector('.tries');
            ol.removeChild(li);
            target.className = 'chosen';
            wrongGuess += 1;
        }     
    }
    checkWin();
})