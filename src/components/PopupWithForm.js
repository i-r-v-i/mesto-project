import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._form.querySelectorAll('.form__item');
        this._buttonSbm = this._form.querySelector(".button");
}

_getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
}

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true, "");
      this._handleFormSubmit(this._getInputValues());
      
    })
  }
closePopup() {
    super.closePopup();
    this._form.reset();
}

renderLoading(isLoading, text) {
     if (isLoading) {
        this._buttonSbm.textContent = "Сохранение...";
    } else {
        this._buttonSbm.textContent = text;
    }
  }
}