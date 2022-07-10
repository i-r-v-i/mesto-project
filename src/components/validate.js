// Функция, которая добавляет класс с ошибкой
const showInputError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.errorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = inputElement.validationMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

export const toggleButtonState = (button, isActive = false, config) => {
  if (isActive) {
    // сделать кнопку активной
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    // иначе сделать кнопку неактивной
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};

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

const setEventListeners = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  toggleButtonState(buttonElement, formElement.checkValidity(), config);

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    toggleButtonState(buttonElement, formElement.checkValidity(), config);
  });

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      // Внутри колбэка вызовем  checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, input, config);
      toggleButtonState(buttonElement, formElement.checkValidity(), config);
    });
  });
};

// функция, запускающая валидацию
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export { enableValidation, checkInputValidity };
