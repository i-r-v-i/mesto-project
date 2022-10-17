import { closeByEsc, closeByOverlay } from "./utils.js";

// функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeByOverlay);
}

//функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("mousedown", closeByOverlay);
}
