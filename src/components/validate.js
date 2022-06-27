// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      if (!isInputValid) {
        showInputError(errorElement, inputElement, config);
      } else {
        // Если проходит, скроем
        hideInputError(errorElement, inputElement, config);
      }
    };


// функция, запускающая валидацию
 const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
  };


  export { enableValidation, checkInputValidity };
  import { setEventListeners } from './index.js';
  import {  showInputError, hideInputError } from './utils.js';