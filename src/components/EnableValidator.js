export class EnableValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._errorClass = config.errorClass;
    this._inputSelector = config.inputSelector;
    this._buttonSelector = config.buttonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._buttonSelector);
  }

  //Метод отображения текста ошибки
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Метод скрытия текста ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Метод смены текста и показывания/скрытия ошибки в зависимости от валидности
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Метод проверки поля ввода на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод смены состояния кнопки ввода на выключенную
  setButtonDisabled() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  //Метод смены состояния кнопки ввода на активную
  _setButtonActive() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //Метод смены состояния кнопки ввода (вкл выкл)
  _toogleButtonState() {
    if (this._hasInvalidInput()) {
      this.setButtonDisabled();
    } else {
      this._setButtonActive();
    }
  }

  //Метод навешивания слушателей ввода на поля ввода форм
  _setEventListenersForForm() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    })
    this._toogleButtonState();
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toogleButtonState();
        this._hasInvalidInput();
      }, 0)
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toogleButtonState();
      });
    });
  }

  //Метод включения валидации
  enableValidation() {
      this._setEventListenersForForm();
    };
}

