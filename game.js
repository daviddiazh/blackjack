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
const playerCardContainer = document.querySelector('#player-card-container');
const computerCardContainer = document.querySelector('#computer-card-container');

takeCardButton.disabled = true;
stopButton.disabled = true;

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let playerPoints = 0;
let computerPoints = 0;

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
            deck.push(special + type);
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

    return ( isNaN( value ) ) ? 
        ( value === 'A' ) ? 11 : 10
        : +value;
}

const enableButtons = () => {
    takeCardButton.disabled = false;
    newGameButton.disabled = false;
}

const disabledButtons = () => {
    takeCardButton.disabled = true;
    newGameButton.disabled = true;
}

const computerTurn = (minPoints) => {
    do {
        const card = takeCard();
        const value = getValueOfCard(card);
        
        computerPoints = computerPoints + value;
        pointsHTML[1].innerText = computerPoints;

        const createImgElement = document.createElement('img');
        createImgElement.src = `assets/${card}.png`;
        createImgElement.classList.add('card-image')
        computerCardContainer.append(createImgElement);
    } while ( (computerPoints < minPoints) && (minPoints <= 21) );

    setTimeout(() => {
        if ( minPoints > 21 ) {
            alert('La computadora gana');
            newGameButton.disabled = false;
        } else if (minPoints === computerPoints) {
            alert('Nadie gana :/')
        } else if (computerPoints > 21) {
            alert('El jugador gana')
        } else if ((computerPoints > minPoints) && (minPoints < 21)) {
            newGameButton.disabled = false;
        alert('El jugador gana')
    }
    }, 200);
}

takeCardButton.addEventListener('click', () => {
    const card = takeCard();
    const value = getValueOfCard(card);
    
    playerPoints = playerPoints + value;
    pointsHTML[0].innerText = playerPoints;

    const createImgElement = document.createElement('img');
    createImgElement.src = `assets/${card}.png`;
    createImgElement.classList.add('card-image')
    playerCardContainer.append(createImgElement);

    setTimeout(() => {
        if (playerPoints > 21) {
            disabledButtons();
            takeCardButton.disabled = true;
            alert('El jugador perdio la partida');
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            disabledButtons();
            alert('21, Genial!');
            takeCardButton.disabled = true;
            newGameButton.disabled = false;
        }
    }, 200);
});

stopButton.addEventListener('click', () => {
    disabledButtons();

    computerTurn(playerPoints);
});

newGameButton.addEventListener('click', () => {
    takeCardButton.disabled = false;
    stopButton.disabled = false;
    createDeck();
    playerPoints = 0;
    computerPoints = 0;
    pointsHTML[0] = 0;
    pointsHTML[1] = 1;
    playerCardContainer.innerHTML = '';
    computerCardContainer.innerHTML = '';
});
