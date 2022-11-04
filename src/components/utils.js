import {
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupProfile,
} from "./data.js";
import { openPopup } from "./modal.js";



// заполнение полей профиля
export function setInfoInProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  
}

export function renderLoading(formElement, isLoading, text) {
  const buttonSbm = formElement.querySelector('.button');
  if (isLoading) {
    buttonSbm.textContent = 'Сохранение...';
  } else {
    buttonSbm.textContent = text;
  }
}

