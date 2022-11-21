export default class EnableValidator {
  constructor(config) {
    this._errorClass = config.errorClass;
    this._formList = document.querySelectorAll(config.formSelector);
    this._inputSeletor = config.inputSelector;
    this._buttonSelector = config.buttonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  //Метод отображения текста ошибки
  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Метод скрытия текста ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Метод смены текста и показывания/скрытия ошибки в зависимости от валидности
  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  //Метод проверки поля ввода на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод смены состояния кнопки ввода на выключенную
  setButtonDisabled(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  //Метод смены состояния кнопки ввода на активную
  _setButtonActive(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }

  //Метод смены состояния кнопки ввода (вкл выкл)
  _toogleButtonState(inputList , buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.setButtonDisabled(buttonElement);
    } else {
      this._setButtonActive(buttonElement);
    }
  }

  //Метода навешивания слушателей ввода на поля ввода форм
  _setEventListenersForForm(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    const buttonElement = formElement.querySelector(this._buttonSelector)
    this._toogleButtonState(inputList , buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toogleButtonState(inputList , buttonElement);
      });
    });
  }

  //Метод включения валидации
  enableValidation() {
    this._formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      this._setEventListenersForForm(formElement);
    });
  }
}

// показываем текст ошибки
// function showInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.errorClass);
//   errorElement.textContent = inputElement.validationMessage;
// }
//
// //скрываем текст ошибки
// function hideInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.errorClass);
//   errorElement.textContent = inputElement.validationMessage;
// }
//
// export function checkInputValidity(formElement, inputElement, config) {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// export function setButtonDisabled(buttonElement, config) {
//   buttonElement.classList.add(config.inactiveButtonClass);
//   buttonElement.disabled = true;
// }

// function setButtonActive(buttonElement, config) {
//   buttonElement.classList.remove(config.inactiveButtonClass);
//   buttonElement.disabled = false;
// }

// function toogleButtonState(inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     setButtonDisabled(buttonElement, config);
//   } else {
//     setButtonActive(buttonElement, config);
//   }
// }

// export function setEventListenersForForm(formElement, config) {
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const buttonSubmit = formElement.querySelector(config.buttonSelector);
//   toogleButtonState(inputList, buttonSubmit, config);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement, config);
//       toogleButtonState(inputList, buttonSubmit, config);
//     });
//   });
// }

// export function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     setEventListenersForForm(formElement, config);
//   });
// }
