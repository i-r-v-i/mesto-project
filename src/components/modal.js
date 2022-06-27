//функция закрытия попапа по клику на оверлей
function overlayHandler(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupOpened);
   }
  }

//функция открытия любого попапа
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    //слушатель на esc
    document.addEventListener('keydown', keyHandler);
    popup.addEventListener('mousedown', overlayHandler); 
}


//функция закрытия любого попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('mousedown', overlayHandler);
}

//функция закрытия попапа по Esc
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

export { openPopup, closePopup };