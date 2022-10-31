// функция открытия модального окна
export function openPopup(popupSelector) {
  const popup = document.querySelector(`.${popupSelector}`)
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

//функция закрытия попапа по Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
   const popupOpened = document.querySelector(".popup_opened");
   closePopup(popupOpened);
 }
}

//функция закрытия попапа по оверлею
function closeByOverlay(evt) {
   if (evt.target.classList.contains("popup_opened")) {
   const popupOpened = document.querySelector(".popup_opened");
   closePopup(popupOpened);
 }
}