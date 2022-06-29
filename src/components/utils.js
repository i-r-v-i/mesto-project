// спасибо за комментарии по поводу 9 спринта, я вникну и исправлю.

//функция открытия любого попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  //слушатель на esc
  document.addEventListener('keydown', handleEscKey);
  popup.addEventListener('mousedown', handleOverlay); 
}


//функция закрытия любого попапа
const closePopup = function (popup) {
popup.classList.remove('popup_opened');
document.removeEventListener('keydown', handleEscKey);
popup.removeEventListener('mousedown', handleOverlay);
}

export { openPopup, closePopup };
import { handleOverlay, handleEscKey } from './modal.js';
