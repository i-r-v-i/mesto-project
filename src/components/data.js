export const initialCards = [
  {
    name: "Исаакиевский собор",
    link: "https://images.unsplash.com/photo-1555460285-763ba96917d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHJ1c3NpYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Санкт-Петербург",
    link: "https://images.unsplash.com/photo-1560203513-9ae08101e661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzM0fHxydXNzaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Рускеала",
    link: "https://images.unsplash.com/photo-1573156667495-f14c98bc2ebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQzfHxydXNzaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Иркутск",
    link: "https://images.unsplash.com/photo-1551844931-2436eb1a9bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzMzfHxydXNzaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Лениградская область",
    link: "https://images.unsplash.com/photo-1613736687604-d836c2731176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDI1fHxydXNzaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Байкал",
    link: "https://images.unsplash.com/photo-1552588354-984f25026b77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDI5fHxydXNzaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];

export const elements = {
  formSelector: ".form",
  inputSelector: ".form__item",
  buttonSelector: ".button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input-error",
  errorClass: "form__item_type_error",
};

//профиль
export const popupProfile = document.querySelector(".popup_type_profile");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__activity");
export const editButton = document.querySelector(".edit-button");
export const formProfile = document.forms.editProfile;
export const nameInput = formProfile.querySelector(".form__item_edit_name");
export const jobInput = formProfile.querySelector(".form__item_edit_activity");

//добавление карточки
export const cardsContainer = document.querySelector(".cards__list");
export const popupNewCard = document.querySelector(".popup_type_newcard");
export const buttonOpenPopupCard = document.querySelector(".add-button");
export const cardNameInput = document.querySelector(".form__item_card_name");
export const cardLinkInput = document.querySelector(".form__item_card_link");
export const formForNewCard = document.querySelector(".form-image");

//зум картинки
export const popupCardZoom = document.querySelector(".popup_type_zoom");
export const popupZoomTitle = document.querySelector(".popup__title");
export const popupZoomImg = document.querySelector(".popup__img");
