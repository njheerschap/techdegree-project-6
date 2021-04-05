const startButton = document.querySelector('.btn__reset');
const restart = document.querySelector('.restart');
const overlay = document.querySelector('#overlay');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let wrongGuess = 0
let phrases = [
    'rome was not built in a day', 
    'the early bird gets the worm', 
    'the end justifies the means', 
    'it takes two to tango', 
    'a drop in the bucket'
]

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
        letterBlock.textContent = phraseCharacters[i].toUpperCase();
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
        if ( clicked.textContent.toUpperCase() === li[i].textContent ) {
            li[i].className += ' show';
            li[i].style.transition = '.5s'
            match = clicked.textContent;
        } 
    }   
    return match;
}

// Check te see when win or lose requirements have been met
const checkWin = () => {
    let letters = document.querySelectorAll('li.letter');
    let shownLetters = document.querySelectorAll('li.show');
    console.log(restart);
    if (letters.length === shownLetters.length) {
        overlay.className = 'win';
        startButton.textContent = 'You Won!!!'; 
        overlay.style.display = 'flex';
        restart.style.display = 'flex';
    }
    if (wrongGuess > 4 ) {
        overlay.className = 'lose';
        startButton.textContent = 'Sorry, you lost'
        overlay.style.display = 'flex'; 
        restart.style.display = 'flex';
    }    
}

// Display the game board
startButton.addEventListener ('click', () => {
    if(overlay.className !== 'win' & overlay.className !== 'lose'){
        overlay.style.display = 'none'
    }    
})

// Restart game after win or loss
restart.addEventListener('click', () => {
    location.reload();
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
