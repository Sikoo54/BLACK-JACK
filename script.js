let sum = 0;
let cards = [];
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.querySelector("#message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let money = 100;
let betAmount = 10;
let moneyEl = document.querySelector("#money-el");
let isReset = true;

console.log(cards);

function startGame() {
  if (isAlive === false && sum < 10 && money >= betAmount) {
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    sum = firstCard + secondCard;
    cards = [firstCard, secondCard];
    isAlive = true;
    money -= betAmount;
    isReset = false;
    playStartSound();
    if (sum === 21) {
      playWinSound();
      messageEl.style.color = "greenyellow";
    } else if (sum > 21) {
      playBustSound();
      messageEl.style.color = "red";
    }
    renderGame();
    if (money < betAmount) {
      renderBroke();
    }
  }
}

function reset() {
  playCashSound();
  sum = "";
  cards = [];
  hasBlackJack = false;
  isAlive = false;
  isReset = true;
  money = Math.max(0, money);
  // Kembalikan nilai properti ke normal untuk memicu efek transisi
  messageEl.style.color = "goldenrod"; // Kembalikan warna teks ke normal
  messageEl.style.textShadow = "3px 3px 10px rgba(0, 0, 0, 0.8)"; // Kembalikan bayangan teks ke normal

  renderGame();
}

function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  if (randomCard === 1) {
    return 11;
  } else if (randomCard > 10) {
    return 10;
  } else {
    return randomCard;
  }
}

function renderGame() {
  cardsEl.textContent = "Cards : ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  if (isAlive === false) {
    message = "Want to Start the Game ?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    money += betAmount * 10;
  } else if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }

  messageEl.textContent = message;
  sumEl.textContent = "Sum : " + sum;
  moneyEl.textContent = "Chips : $" + money;
}

function renderBroke() {
  if (money === 0 && isReset == true) {
    message = "You broke!";
  }
  messageEl.textContent = message;
}

function drawCard() {
  if (isAlive === true && hasBlackJack === false) {
    let newCard = getRandomCard();
    sum += newCard;
    cards.push(newCard);

    let cardsEl = document.querySelector("#cards-el");

    // Terapkan efek transisi pada teks kartu melalui JavaScript
    cardsEl.style.transform = "scale(1.2)";
    if (sum > 21) {
      messageEl.style.color = "red";
    } else if (sum === 21) {
      messageEl.style.color = "greenyellow";
    }
    setTimeout(() => {
      // Kembalikan nilai properti ke normal untuk memicu efek transisi
      cardsEl.style.transform = "scale(1)";
    }, 300);

    if (sum < 21) {
      playDrawSound();
    } else if (sum === 21) {
      playWinSound();
    } else {
      playBustSound();
    }

    renderGame();
  }
}

function playStartSound() {
  let startSound = document.getElementById("startSound");
  startSound.play();
}

function playBustSound() {
  let bustSound = document.getElementById("bustSound");
  bustSound.play();
}

function playWinSound() {
  let winSound = document.getElementById("winSound");
  winSound.play();
}

function playDrawSound() {
  let drawSound = document.getElementById("drawSound");
  drawSound.play();
}

function playCashSound() {
  let cashSound = document.getElementById("cashSound");
  cashSound.play();
}
