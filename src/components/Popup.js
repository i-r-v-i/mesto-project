export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(popupSelector);
    this.closeIcons = Array.from(document.querySelectorAll(".close-icon"));
    this.popupOpened = document.querySelector(".popup_opened");
  }

  openPopup() {
    this.popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  closePopup() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.popup.removeEventListener("mousedown", this._closeByOverlay);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  
  _closeByOverlay = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      const popupOpened = document.querySelector(".popup_opened");
      closePopup(popupOpened);
    }
  }

  //закрытие любого попапа по крестику
  // _setCloseIconListener = () => {
  //   this.closeIcons.forEach((closeIcon) => {
  //     popup = closeIcon.closest(this.popupSelector);
  //     closeIcon.addEventListener("click", () => {
  //       this.closePopup;
  //     });
  //   });
  // }

  setEventListeners() {
    // this._setCloseIconListener();
    document.addEventListener("keydown", this._handleEscClose);
    this.popup.addEventListener("mousedown", this._closeByOverlay);
  }
}


// // функция открытия модального окна
// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEsc);
//   popup.addEventListener("mousedown", closeByOverlay);
// }

//функция закрытия модального окна
// export function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
//   popup.removeEventListener("mousedown", closeByOverlay);
// }

//функция закрытия попапа по Esc
// function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const popupOpened = document.querySelector(".popup_opened");
//     closePopup(popupOpened);
//   }
// }

//функция закрытия попапа по оверлею
// function closeByOverlay(evt) {
//   if (evt.target.classList.contains("popup_opened")) {
//     const popupOpened = document.querySelector(".popup_opened");
//     closePopup(popupOpened);
//   }
// }
