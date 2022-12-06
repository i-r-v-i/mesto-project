export const enableValidationConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  buttonSelector: ".button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input-error",
  errorClass: "form__item_type_error",
};

export const apiConfig = {
  token: "34adb4d1-3b9f-4221-8c5f-16ba80991dd4",
  url: "https://nomoreparties.co/v1/plus-cohort-16"
}

//профиль
export const buttonProfileEdit = document.querySelector(".edit-button");
export const formProfile = document.forms.editProfile;
export const nameInput = formProfile.querySelector(".form__item_edit_name");
export const jobInput = formProfile.querySelector(".form__item_edit_activity");

//аватар
export const buttonAvatarEdit = document.querySelector(".button-avatar");
export const formAvatar = document.forms.editAvatar;


//добавление карточки
export const buttonOpenPopupCard = document.querySelector(".add-button");

//зум картинки
export const popupZoomTitle = document.querySelector(".popup__title");
export const popupZoomImg = document.querySelector(".popup__img");
