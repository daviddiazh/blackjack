/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

const newGameButton = document.querySelector('#new-game');
const takeCardButton = document.querySelector('#take-card');
const stopButton = document.querySelector('#stop');
const pointsHTML = document.querySelectorAll('small');

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let playerPoints = 0;
let computerPoints = 10;

const shuffle = (arr = []) => {
    return arr.sort(() => Math.random() - 0.5)
}

const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for(const type of types) {
            deck.push(i + type);
        }
    }

    for (const type of types) {
        for (const special of specials) {
            deck.push(type + special);
        }
    }

    deck = shuffle(deck);

    return deck;
}

const takeCard = () => {
    if (deck.length <= 0) {
        throw 'Ya no hay cartas...'
    };

    const card = deck.pop();
    return card;
}

const getValueOfCard = (card) => {
    const value = card.substring(0, card.length - 1);
    let points = 0;

    if (isNaN(value)) {
        console.log('No es un número.')
        return points = (value === 'A') ? 11 : 10;
    }

    return points = +value;
}

createDeck();

takeCardButton.addEventListener('click', () => {
    const card = takeCard();
    const value = getValueOfCard(card);
    
    playerPoints = playerPoints + value;
    pointsHTML[0].innerText = playerPoints;
    pointsHTML[1].innerText = computerPoints;
});
