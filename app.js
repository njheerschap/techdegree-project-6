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
const getRandomPhrase = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomIndex];
    return randomPhrase;  
}

// Display phrase characters 
const addPhraseToDisplay = () => {
    const randomPhrase = getRandomPhrase(phrases);
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
const phraseToGuess = getRandomPhrase(phrases);
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

const restartGame = () => {
    overlay.style.display = 'none';
    let currentPhrase = document.querySelectorAll('#phrase li');
    let lifeCount = document.querySelectorAll('.tries img');
    let key = document.querySelectorAll('button');
    for (let i = 0; i < currentPhrase.length; i++) {
        currentPhrase[i].remove();
    }
    for(let i = 0; i < lifeCount.length; i ++) {
        lifeCount[i].src = 'images/liveHeart.png';
    }
    for (let i = 0; i < key.length; i++) {
        key[i].className = '';
    }
    addPhraseToDisplay();
    wrongGuess = 0;
}

// Display the game board
startButton.addEventListener ('click', () => {
    if(overlay.className !== 'win' & overlay.className !== 'lose'){
        overlay.style.display = 'none'
    }    
})

// Restart game after win or loss
restart.addEventListener('click', () => {
    restartGame();
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
            let lifeCount = document.querySelectorAll('.tries img');
            lifeCount[wrongGuess].src = 'images/lostHeart.png';
            target.className = 'chosen';
            wrongGuess += 1;
        }     
    }
    checkWin();
})
