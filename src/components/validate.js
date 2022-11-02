// Спасибо большое, что подсказали создать функцию, блокирующую кнопку сабмита после сабмита! Я четыре дня думала, какую же функцию взывать, чтобы заблокировать, а оказалось, что все так просто. Рест- спред, надеюсь скоро реализую. Пока не поняла, как передать поля, ведь они от функции к функции накапливаются, и в setEventListenersForForm приходятся все подряд что ли перечислять? Попробую доразобраться еще.


// показываем текст ошибки
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//скрываем текст ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

export function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function buttonDisabled(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

function buttonActive(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

function toogleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonDisabled(buttonElement, config);
  } else {
    buttonActive(buttonElement, config);
  }
}

export function setEventListenersForForm(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonSubmit = formElement.querySelector(config.buttonSelector);
  toogleButtonState(inputList, buttonSubmit, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toogleButtonState(inputList, buttonSubmit, config);
    });
  });
}

export function enableValidation(config) {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      setEventListenersForForm(formElement, config);
    });
    setEventListenersForForm(formElement, config);
  });
}