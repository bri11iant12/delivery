import Delivery from './Delivery.js'
import EditDelivery from './EditDelivery.js';


const app = document.querySelector('#app');

function createTotalDistanceButton(deliveryArr) {
  const btnWrap = document.createElement('div');
  btnWrap.classList.add('btn__wrap');

  const countBtn = document.createElement('button');
  countBtn.classList.add('btn__count');
  countBtn.textContent = 'Общее расстояние';

  const resultEl = document.createElement('div');
  resultEl.classList.add('total__distance');

  countBtn.addEventListener('click', () => {
    const total = EditDelivery.getTotalDistance(deliveryArr);
    resultEl.textContent = `Общее расстояние: ${total} км`;
  });

  btnWrap.append(countBtn, resultEl);
  document.body.append(btnWrap);
}

const deliveryArr = [
  new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
  new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
  new Delivery("Олеся", "ул. Ткачей, д. 43", 16),
  new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivered")
];

deliveryArr.forEach(Delivery => {
    app.append(Delivery.getElement())
})

createTotalDistanceButton(deliveryArr);