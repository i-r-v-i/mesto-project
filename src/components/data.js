export const enableValidationConfig = {
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
export const buttonProfileEdit = document.querySelector(".edit-button");
export const formProfile = document.forms.editProfile;
export const nameInput = formProfile.querySelector(".form__item_edit_name");
export const jobInput = formProfile.querySelector(".form__item_edit_activity");

//аватар
export const profileAvatar = document.querySelector(".profile__avatar");
export const avatarInput = document.querySelector(".form__item_avatar-link");
export const buttonAvatarSubmit = document.querySelector(".button-avatar-submit");
export const buttonAvatarEdit = document.querySelector(".button-avatar");
export const formAvatar = document.forms.editAvatar;
export const popupForAvatar = document.querySelector(".popup_type_avatar");

//добавление карточки
export const cardsContainer = document.querySelector(".cards__list");
export const popupNewCard = document.querySelector(".popup_type_newcard");
export const buttonOpenPopupCard = document.querySelector(".add-button");
export const cardNameInput = document.querySelector(".form__item_card_name");
export const cardLinkInput = document.querySelector(".form__item_card_link");
export const formForNewCard = document.forms.cardForm;

//зум картинки
export const popupCardZoom = document.querySelector(".popup_type_zoom");
export const popupZoomTitle = document.querySelector(".popup__title");
export const popupZoomImg = document.querySelector(".popup__img");
