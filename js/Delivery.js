import { saveToLocalStorage } from './localStorage.js';

export default class Delivery {

    _name = '';
    _address = '';
    _distance = 0

    constructor(name, address, distance) {
        this.name = name;
        this.address = address;
        this.distance = distance;
    }

    getElement(deliveryArr) {
        this.cardEl = document.createElement('div');
        this.cardEl.classList.add('card');

        this.nameLabelEl = document.createElement('span');
        this.nameLabelEl.classList.add('card__label');
        this.nameLabelEl.textContent = 'Имя';

        this.nameEl = document.createElement('div');
        this.nameEl.classList.add('card__name');
        this.nameEl.textContent = this.name;

        this.addressLabelEl = document.createElement('span');
        this.addressLabelEl.classList.add('card__label');
        this.addressLabelEl.textContent = 'Адрес';

        this.addressEl = document.createElement('div');
        this.addressEl.classList.add('card__address');
        this.addressEl.textContent = this.address;

        this.distanceLabelEl = document.createElement('span');
        this.distanceLabelEl.classList.add('card__label');
        this.distanceLabelEl.textContent = 'Расстояние';

        this.distanceEl = document.createElement('span');
        this.distanceEl.classList.add('card__distance');
        this.distanceEl.textContent = `${this.distance} км`;
        
        this.cardEl.append(this.nameLabelEl, this.nameEl, this.addressLabelEl, this.addressEl, this.distanceLabelEl ,this.distanceEl);
        this.removeBtn = this._createRemoveButton(deliveryArr);
        this.cardEl.append(this.removeBtn);
        return this.cardEl
    }

    _createRemoveButton(deliveryArr) {
        const btn = document.createElement('button');
        btn.classList.add('btn__remove');
        btn.textContent = 'Удалить';

        btn.addEventListener('click', () => {
            this.remove(deliveryArr);
        })

        return btn;
    }

    remove(deliveryArr) {
        if (this.cardEl) {
            this.cardEl.remove();
        }

        this._removeFromArray(deliveryArr);
        this._updateTotalDistance(deliveryArr);
        saveToLocalStorage(deliveryArr);
    }

    _removeFromArray(deliveryArr) {
        const index = deliveryArr.indexOf(this);
        if(index !== -1) {
            deliveryArr.splice(index, 1);
        }
    }

    _updateTotalDistance(deliveryArr) {
        const distanceEl = document.querySelector('.total__distance');
        if(distanceEl) {
            const total = this.constructor.getTotalDistance(deliveryArr);
            distanceEl.textContent = `Общее расстояние: ${total} км`;
        }
    }

    static getTotalDistance(deliveryArr) {
        let total = 0;
        for (const delivery of deliveryArr) {
            if (delivery.status !== 'canceled') {
                total += delivery.distance;
            }
        }
        return total;
    }

    get name() {
        return this._name
    }

    get address() {
        return this._address
    }

    get distance() {
        return this._distance
    }

    set name(value) {
        this._name = value;
        if(this.nameEl) this.nameEl.textContent = value;
    }

    set address(value) {
        this._address = value;
        if(this.addressEl) this.addressEl.textContent = value;
    }

    set distance(value) {
        this._distance = value;
        if(this.distanceEl) this.distanceEl.textContent = `${value} км`;
    }

}
