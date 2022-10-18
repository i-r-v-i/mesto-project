import {
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupProfile,
  formProfile,
  elements,
} from "./data.js";
import { openPopup, closePopup } from "./modal.js";

//функция закрытия попапа по Esc
export function closeByEsc(evt) {
   if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

//функция закрытия попапа по оверлею
export function closeByOverlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// заполнение полей профиля
export function setInfoInProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  checkInputValidity(formProfile, nameInput, elements);
  checkInputValidity(formProfile, jobInput, elements);
}

// Обработчик отправки формы редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}
