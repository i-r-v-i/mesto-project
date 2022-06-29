import '../index.css';




// ищем попап для зума картинки
const popupCardZoom = document.querySelector('.popup_type_zoom');


//профиль
const editButtonProfile = document.querySelector('.edit-button');
const popupProfile = document.querySelector('.popup-profile');
 
   
//форма редактирования профиля
const profileForm = document.querySelector('.form');
const nameInput = document.querySelector('.form__item_edit_name');
const activityInput = document.querySelector('.form__item_edit_activity');
const infoName = document.querySelector('.info__name');
const infoActivity = document.querySelector('.info__activity');

//добавление новой карточки
const popupForCard = document.querySelector('.popup_type_card');
const closeIconCard = document.querySelector('.close-icon_type_card');
const addButtonCard = document.querySelector('.add-button');
const formImage = document.querySelector('.form-image');



//слушатель на кнопку закрытия попапа профиля
const closeButtons = document.querySelectorAll('.close-icon');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});



profileForm.addEventListener('submit', handleProfileFormSubmit);

formImage.addEventListener('submit', addNewCard);

//слушатели для  открытия и закрытия попапа добавления новых карточек
addButtonCard.addEventListener('click', function() {
 
  openPopup(popupForCard);
  
})

closeIconCard.addEventListener('click', function() {
  closePopup(popupForCard);
})

//слушатель на кнопку открытия попапа редактирования профиля пользователя
//установление значений в поля ввода формы профиля

editButtonProfile.addEventListener('click', function () {
  
  nameInput.value = infoName.textContent;
  activityInput.value = infoActivity.textContent;
  openPopup(popupProfile);
  checkInputValidity(profileForm, nameInput, elements);
  checkInputValidity(profileForm, activityInput, elements);
});

 
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const elements = {
  formSelector: '.form',
  inputSelector: '.form__item',
  buttonSelector: '.button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'input-error',
  errorClass: 'form__item_type_error'
}; 

// Вызовем функцию валидации
enableValidation(elements); 

export { infoName, infoActivity, popupCardZoom, nameInput, activityInput, popupProfile, popupForCard };
import { enableValidation, checkInputValidity,  } from './validate.js';
import { addNewCard } from './card.js';
import { handleProfileFormSubmit } from './modal.js';
import { openPopup, closePopup } from './utils.js';