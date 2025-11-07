import Delivery from "./Delivery.js";


export default class EditDelivery extends Delivery {
    constructor(name, address, distance, status) {
        super(name, address, distance)
        this._status = status;
    }

    getElement(deliveryArr) {
        const card = super.getElement(deliveryArr);
        this._deliveryArr = deliveryArr;
        card.classList.add(this._status);

        const editBtn = this._createEditBtn();
        card.append(editBtn);

        return card;
    }

    _createEditBtn() {
        const btn = document.createElement('button');
        btn.classList.add('btn__edit');
        btn.textContent = 'Изменить';
        btn.addEventListener('click', () => this._openEditModal());
        return btn;
    }

    _openEditModal() {
        this._createModalOverlay();
        document.body.append(this.editOverlay);
    }

    _createModalOverlay() {
        this.editOverlay = document.createElement('div');
        this.editOverlay.classList.add('edit__window-overlay');

        const form = this._createEditForm();
        this.editOverlay.append(form);
    }

    _createEditForm() {
        this.editWindow = document.createElement('form');
        this.editWindow.classList.add('edit__window');
        this.editWindow.addEventListener('submit', (e) => {
            e.preventDefault()
        });

        const header = this._createModalHeader();
        const input = [
            this._createNameInput(),
            this._createAddressInput(),
            this._createDistanceInput(),
            this._createStatusSelect(),
        ];
        const saveBtn = this._createSaveBtn();

        this.editWindow.append(header, ...input, saveBtn);
        return this.editWindow;
    }

    _createModalHeader() {
        const title = document.createElement('h2');
        title.classList.add('edit__window-title');
        title.textContent = 'Изменить';

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('edit__window-btn-close');
        closeBtn.textContent = '𐄂';
        closeBtn.addEventListener('click', () => this._closeModal());

        const headerWrap = document.createElement('div');
        headerWrap.append(title, closeBtn);
        return headerWrap;
    }

    _createNameInput() {
        this.editName = document.createElement('input');
        this.editName.classList.add('edit__window-value');
        this.editName.type = 'text';
        this.editName.value = this.name;
        return this.editName;
    }

    _createAddressInput() {
        this.editAddress = document.createElement('input');
        this.editAddress.classList.add('edit__window-value');
        this.editAddress.type = 'text';
        this.editAddress.value = this.address;
        return this.editAddress;
    }

    _createDistanceInput() {
        this.editDistance = document.createElement('input');
        this.editDistance.classList.add('edit__window-value');
        this.editDistance.type = 'text';
        this.editDistance.value = this.distance;
        return this.editDistance;
    }

    _createStatusSelect() {
        this.editStatus = document.createElement('select');
        this.editStatus.classList.add('edit__window-value');

        const statusOption = [
            { label: 'Доставляется', value: 'delivery' },
            { label: 'Доставлен', value: 'delivered' },
            { label: 'Отменен', value: 'canceled' }
        ];

        statusOption.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.label;
            if (this._status === optionData.value) {
                option.selected = true;
            }

            this.editStatus.append(option);;
        });

        return this.editStatus;
    }

    _createSaveBtn() {
        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.classList.add('edit__window-btn-save');
        saveBtn.textContent = 'Сохранить';
        saveBtn.addEventListener('click', () => this._saveChange());
        return saveBtn;
    }

    _saveChange() {
        const newName = this.editName.value.trim();
        const newAddress = this.editAddress.value.trim();
        const newDistanceStr = this.editDistance.value.trim();
        const newStatus = this.editStatus.value;

        const newDistance = Number(newDistanceStr);

        if (!newName || !newAddress || newDistanceStr === '' || Number.isNaN(newDistance)) {
            alert('Заполните все поля верно');
            return;
        }

        this.name = newName;
        this.address = newAddress;
        this.distance = newDistance;
        this.status = newStatus;

        const card = this.cardEl;
        card.classList.remove('delivery', 'delivered', 'canceled');
        card.classList.add(this._status);

        this._closeModal();
        if (this._deliveryArr) {
            this._updateTotalDistance(this._deliveryArr);
            saveToLocalStorage(this._deliveryArr);
        }
    }

    _closeModal() {
        if (this.editOverlay) {
            this.editOverlay.remove();
            this.editOverlay = null;
        }
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (!['delivery', 'delivered', 'canceled'].includes(value)) {
            throw new Error('Некорректный статус');
        }
        this._status = value;
    }
}
