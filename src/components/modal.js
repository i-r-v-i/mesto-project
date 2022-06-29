//функция закрытия попапа по клику на оверлей
function handleOverlay(evt) {
   
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
   }
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



export { handleProfileFormSubmit, handleOverlay, handleEscKey };
import { infoName, infoActivity, nameInput, activityInput, popupProfile } from './index.js';
import { closePopup } from './utils.js';