//функция открытия любого попапа
export const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  //слушатель на esc
  document.addEventListener("keydown", handleEscKey);
  popup.addEventListener("mousedown", handleOverlay);
};

//функция закрытия любого попапа
export const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
  popup.removeEventListener("mousedown", handleOverlay);
};

//функция по изменению текста на кнопке сабмита
export const renderLoading = (button, isLoading, text) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = text;
  }
};

import { handleOverlay, handleEscKey } from "./modal.js";
