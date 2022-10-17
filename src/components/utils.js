import {
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupProfile,
  elements,
} from "./data.js";
import { openPopup, closePopup } from "./modal.js";

//функция закрытия попапа по Esc
export function closeByEsc(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

//функция закрытия попапа по оверлею
export function closeByOverlay(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(popupOpened);
  }
}

// заполнение полей профиля
export function setInfoInProfileInputs() {
  const formElement = document.querySelector(".form");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  checkInputValidity(formElement, nameInput, elements);
  checkInputValidity(formElement, jobInput, elements);
}

// Обработчик отправки формы редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}
