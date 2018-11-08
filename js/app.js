/*
 * Create a list that holds all of your cards
*/

let symbols = [
    'fa fa-diamond',
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bicycle',
    'fa fa-bomb',
    'fa fa-bomb'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Initialize Variables
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const starsOnScorePanel = document.querySelector('.stars');
const movesOnScorePanel = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
const timer = document.querySelector('.timer');
const timeRecord = timer.innerHTML;
const modalStarsStat = document.querySelector('.modal__stars');
const modalTimeStat = document.querySelector('.modal__time');
const modalMovesStat = document.querySelector('.modal__moves');
const closeModalButton = document.querySelector('.modal__exit');
const newGameModalButton = document.querySelector('.modal__newgame');

let moves = 0;
let timerID;
let passedTime = 0;
let startClock;
let timerCanStart = true;
let firstAndSecondCards = [];
let matchingCards =[];
let allOpenedCards = [];
let cardsBeingChecked = false;

// Shuffle symbols and make a new deck
function shuffleSymbols() {
    symbols = shuffle(symbols);
    for (let i = 0; i < symbols.length; i++) {
        deck.children[i].innerHTML = `<i class = "${symbols[i]}">`;
    }
}

// Create a new deck and display cards
function createNewDeck() {
    symbols = shuffle(symbols);
    for (symbol of symbols) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class = "${symbol}">`;
        deck.appendChild(card);
        click(card);
    }
}

// Process of memory game
function click(card) {
    card.addEventListener('click', function() {
        // Check if any cards are NOT selected and being checked
        // This is so the player cannot select a new card while 2 are being checked
        if (cardsBeingChecked === false) {
            const firstSelectedCard = firstAndSecondCards[0];
            const secondSelectedCard = this;
            const selectedCard = event.target;
            //Check if any cards has 'card' class
            if (selectedCard.classList.contains('card')) {
                selectedCard.classList.add('open', 'show');
                // True when opening 2nd Card
                if (firstAndSecondCards.length === 1) {
                    firstAndSecondCards.push(this);
                    // Check whether 2 cards are matched or not
                    // When matching
                    if (firstSelectedCard.innerHTML === secondSelectedCard.innerHTML) {
                        firstSelectedCard.classList.add('match');
                        secondSelectedCard.classList.add('match');
                        allOpenedCards.push(this);
                        matchingCards.push(firstSelectedCard, secondSelectedCard);
                        firstAndSecondCards = [];
                        // When all matching
                        if (matchingCards.length === 16) {
                            gameOver();
                        }
                    // When not matching
                    } else {
                        // Not allow another card to be clicked
                        cardsBeingChecked = true;
                        countMoves();
                        firstAndSecondCards = [];
                        allOpenedCards.pop(firstSelectedCard, secondSelectedCard);
                        starsOnScorePanel.innerHTML = starRating();
                        setTimeout (function() {
                            secondSelectedCard.classList.remove('open', 'show');
                            firstSelectedCard.classList.remove('open', 'show');
                            cardsBeingChecked = false;
                        }, 500);
                    }
                // Open 1st Card
                } else {
                    startTimer();
                    firstAndSecondCards.push(this);
                    allOpenedCards.push(this);
                }
            }  
        } 
    });
}

// Timer display
function timerDisplay() {
    passedTime = passedTime / 100;
    const minutes = Math.floor(passedTime / 600);
    const seconds = Math.floor(passedTime % 600 / 10);

    if (seconds < 10 && minutes < 10) {
        timer.innerText = `0${minutes}:0${seconds}`;
    } else if (minutes < 10) {
        timer.innerText = `0${minutes}:${seconds}`;
    } else if (seconds < 10) {
        timer.innerText = `${minutes}:0${seconds}`;
    }
}

// Timer clock
function timerClock() {
    timerId = setTimeout(function () {
        passedTime = Date.now() - startClock;
        timerDisplay();
        timerClock();
    }, 10);
}

// Start timer
function startTimer() {
    if (timerCanStart) {
        timerCanStart = false;
        startClock = Date.now();
        timerClock();
    }
}

// Stop timer
function stopTimer() {
    timerCanStart = true;
    clearTimeout(timerId);
}

// Reset timer
function resetTimer() {
    stopTimer();
    passedTime = 0;
    timer.innerHTML = `00:00`;
}

// Count moves
function countMoves() {
    moves++;
    movesOnScorePanel.innerHTML = moves;
}

// Star Rating
function starRating() {
    let starString = '';
    if (0 <= moves && moves <= 10) {
        starString = `<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    } else if (10 < moves && moves <= 15) {
        starString = `<i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    } else {
        starString = `<i class="fa fa-star"></i>`;
    }
    return starString;
}

// Restart Button
restartButton.addEventListener('click', function() {
    restartButton.classList.add('restart');
    starsOnScorePanel.innerHTML = `<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    moves = 0;
    movesOnScorePanel.innerHTML = moves;
    firstAndSecondCards = [];
    resetTimer();
    flipOverAllOpenedCards();
    shuffleSymbols();
});

// Game Over
function gameOver(){
    matchingCards = [];
    stopTimer();
    displayModalWindow();
}

// Flip over all opened cards
function flipOverAllOpenedCards() {
    for (card of allOpenedCards) {
        card.classList.remove('open', 'show', 'match');
    }
}

// Update game status on modal window
function updateGameStatus() {
    modalTimeStat.innerText = `Time: ${timer.innerText}`;
    modalStarsStat.innerHTML = `Stars: ${starRating()}`;
    modalMovesStat.innerText = `Moves: ${moves}`;
}

// Display modal window
function displayModalWindow() {
    modal.classList.toggle('hide');
    updateGameStatus();
}

// Close modal window
closeModalButton.addEventListener('click', function() {
    modal.classList.toggle('hide');
});

// New game button on modal window
newGameModalButton.addEventListener('click', function () {
    starsOnScorePanel.innerHTML = `<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    modal.classList.toggle('hide');
    moves = 0;
    movesOnScorePanel.innerHTML = moves;
    resetTimer();
    shuffleSymbols();
    flipOverAllOpenedCards();
});

// Start a new game
createNewDeck();
