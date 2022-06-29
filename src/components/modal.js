//функция закрытия попапа по клику на оверлей
function handleOverlay(evt) {
   
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
   }
  }

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

//функция закрытия попапа по Esc
function handleEscKey(evt) {
   
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

// функция для редактирования профиля и сохранения данных
const handleProfileFormSubmit = function(evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoActivity.textContent = activityInput.value;
  closePopup(popupProfile);
}



export { openPopup, closePopup, handleProfileFormSubmit };
import { infoName, infoActivity, nameInput, activityInput, popupProfile } from './index.js';