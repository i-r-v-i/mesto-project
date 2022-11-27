import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._formValues = {};
        this._buttonSbm = this._form.querySelector(".button");
}

_getInputValues() {
   this._inputList.forEach(input => this._formValues[input.name] = input.value);
   return this._formValues;
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