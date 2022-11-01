import {
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupProfile,
  formProfile,
  enableValidationConfig
} from "./data.js";
import { openPopup } from "./modal.js";
import { checkInputValidity } from "./validate.js";


// заполнение полей профиля
export function setInfoInProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  checkInputValidity(formProfile, nameInput, enableValidationConfig);
  checkInputValidity(formProfile, jobInput, enableValidationConfig);
}

export function renderLoading(formElement, isLoading, text) {
  const buttonSbm = formElement.querySelector('.button');
  if (isLoading) {
    buttonSbm.textContent = 'Сохранение...';
  } else {
    buttonSbm.textContent = text;
  }
}