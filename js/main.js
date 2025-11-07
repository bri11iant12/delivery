import Delivery from './Delivery.js';
import EditDelivery from './EditDelivery.js';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage.js';

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
    const total = Delivery.getTotalDistance(deliveryArr);
    resultEl.textContent = `Общее расстояние: ${total} км`;
  });

  btnWrap.append(countBtn, resultEl);
  document.body.append(btnWrap);
}

export let deliveryArr = loadFromLocalStorage(EditDelivery);

if (deliveryArr.length === 0) {
    deliveryArr = [
        new Delivery('Ольга', 'ул. Вымыслов, д. 12', 8),
        new Delivery('Дмитрий', 'ул. Задачная, д. 7', 3),
        new Delivery('Олеся', 'ул. Ткачей, д. 43', 16),
        new EditDelivery('Дмитрий', 'ул. Задачная, д. 7', 3, 'delivered')
    ];
}

deliveryArr.forEach((Delivery) => {
  app.append(Delivery.getElement(deliveryArr));
});

const form = document.querySelector('#addDeliveryForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#addName').value.trim();
  const address = document.querySelector('#addAddress').value.trim();
  const distanceStr = document.querySelector('#addDistance').value.trim();
  const distance = Number(distanceStr);
  const status = document.querySelector('#addStatus').value.trim();

  if (!name || !address || distanceStr === '' || Number.isNaN(distance)) {
    alert('Заполните поля');
    return;
  }

  const newDelivery = new EditDelivery(name, address, distance, status);
  deliveryArr.push(newDelivery);
  app.append(newDelivery.getElement(deliveryArr));

  saveToLocalStorage(deliveryArr);

  form.reset();
});

createTotalDistanceButton(deliveryArr);
