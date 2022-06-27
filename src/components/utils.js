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


const toggleButtonState = (button, isActive = false, config) => {
    // Если есть хотя бы один невалидный инпут
    if (isActive) {
      // сделать кнопку активной
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      // иначе сделать кнопку неактивной
      button.classList.add(config.inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }; 

  export { toggleButtonState, showInputError, hideInputError };