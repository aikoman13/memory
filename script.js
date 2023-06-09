const CARDS = [
  {
      id: 1,
      name: 'Lama',
      img: 'images/1.png'
  },
  {
      id: 2,
      name: 'Genea Pig',
      img: 'images/2.png'
  },
  {
      id: 3,
      name: 'Dog',
      img: 'images/3.png'
  },
  {
      id: 4,
      name: 'Horse',
      img:'images/4.png'
          
  },
  {
      id: 5,
      name: 'Goat',
      img: 'images/5.png'
  },
  {
      id: 6,
      name: 'Fox',
      img: 'images/6.png'
  },
  {
      id: 7,
      name: 'Mouse',
      img:'images/7.png'
          
  },
  {
      id: 8,
      name: 'Bear',
      img:'images/8.png'
          
  },
  {
      id: 9,
      name: 'Cat',
      img:'images/9.png'
          
  },
  {
      id: 10,
      name: 'Monkey',
      img:'images/10.png'
          
  },
  {
      id: 11,
      name: 'Genea Pig 2',
      img:'images/11.png'
          
  },
  {
      id: 12,
      name: 'Ant eater',
      img:'images/12.png'
          
  }
];
const cardContainer = document.querySelector('.card-container');
const available = document.querySelector('#available');
const modalTitle = document.querySelector('#modal-title');
const modal = document.querySelector('#modal');
let currentCards = [...CARDS, ...CARDS];
let isPaused = false;
let counter = CARDS.length + 10;
let isLose = false;

// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let counter = array.length,
      temp,
      index;
  while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
}

function win() {
  isPaused = true;
  modalTitle.innerHTML = 'You win! 🙌🥳';
  modal.classList.add('modal--open');
}

function lose() {
  isLose = true;
  modalTitle.innerHTML = 'You lose 😢😩';
  modal.classList.add('modal--open');
}

function handleClick(e) {
  const { target } = e;
  if (
      !isPaused &&
      !isLose &&
      !target.classList.contains('card--guessed') &&
      !target.classList.contains('card--picked')
  ) {
      isPaused = true;
      const picked = cardContainer.querySelector('.card--picked');
      if (picked) {
          if (picked.dataset.id === target.dataset.id) {
              target.classList.remove('card--picked');
              picked.classList.remove('card--picked');
              target.classList.add('card--guessed');
              picked.classList.add('card--guessed');
              isPaused = false;
          } else {
              target.classList.add('card--picked');
              setTimeout(() => {
                  target.classList.remove('card--picked');
                  picked.classList.remove('card--picked');
                  isPaused = false;
              }, 1500);
          }
          console.log('counter', counter);
          counter -= 1;
          available.innerHTML = counter;
          if (counter === 0) {
              lose();
          }
      } else {
          target.classList.add('card--picked');
          isPaused = false;
      }

      // Validate is already win
      /*const isWin = cardContainer.querySelectorAll('card--guessed').length === currentCards.length;
      if (isWin) {
          win();
      }*/
      const isWin = cardContainer.querySelectorAll('.card--guessed').length === currentCards.length;
if (isWin || guessesLeft === 0) {
    win();
}

  }
}

function drawCards() {
  cardContainer.innerHTML = '';
  available.innerHTML = counter;

  shuffle(currentCards).forEach((el) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-id', el.id);
      card.innerHTML = `
        <div class="card__front">
          <img
            class="front__img"
            src="${el.img}"
            alt="${el.name}"
          />
          <h6 class="card__name">${el.name}</h6>
        </div>
        <div class="card__back">
          <img
            class="back__img"
            src="images/thought_pr1pzv.png"
            alt="Thought"
          />
        </div>
      `;
      card.addEventListener('click', handleClick);
      cardContainer.appendChild(card);
  });
}

document.querySelector('#play-again').addEventListener('click', function () {
  modal.classList.remove('modal--open');
  isPaused = false;
  isLose = false;
  counter = CARDS.length + 10;
  drawCards();
});

drawCards();