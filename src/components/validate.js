// показываем текст ошибки
function showInputError({formElement, inputElement, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//скрываем текст ошибки
function hideInputError({formElement, inputElement, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

export function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, ...config});
  } else {
    hideInputError({formElement, inputElement, ...config});
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function setButtonDisabled({buttonElement, inactiveButtonClass}) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

function setbuttonActive({buttonElement, inactiveButtonClass}) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

function toogleButtonState({inputList, buttonElement, config}) {
  if (hasInvalidInput(inputList)) {
    setButtonDisabled({buttonElement, ...config});
  } else {
    setbuttonActive({buttonElement, ...config});
  }
}

export function setEventListenersForForm({formElement, inputSelector, buttonSelector, config}) {
  const inputList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const buttonSubmit = formElement.querySelector(buttonSelector);
  toogleButtonState({inputList, buttonSubmit, config});
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toogleButtonState({inputList, buttonSubmit, config});
    });
  });
}

export function enableValidation({formSelector, ...config}) {
   const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      // setEventListenersForForm(formElement, config); от этого избавляюсь, так?
    });
    setEventListenersForForm({formElement, ...config});
  });
}