const avatarInput = document.querySelector(".form__item_avatar_link");

//функция закрытия попапа по клику на оверлей
export function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

//функция закрытия попапа по Esc
export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

const buttonProfileSubmit = document.querySelector(".button-profile-submit");
// функция для редактирования профиля и сохранения данных
export const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  renderLoading(buttonProfileSubmit, true, "текст");
  editProfile({ name: nameInput.value, about: activityInput.value })
    .then((dataFromServer) => {
      infoName.textContent = dataFromServer.name;
      infoActivity.textContent = dataFromServer.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
      );
    })
    .finally(() => {
      renderLoading(buttonProfileSubmit, false, "Сохранить");
    });
};

export const buttonAvatarSubmit = document.querySelector(
  ".button-avatar-submit"
);

// функция для обновления аватара
export const handleAvatarFormSubmit = function (evt) {
  evt.preventDefault();
  renderLoading(buttonAvatarSubmit, true, "текст");
  editAvatar({ avatar: avatarInput.value })
    .then((dataFromServer) => {
      profileAvatar.src = dataFromServer.avatar;
      closePopup(popupForAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при обновлении аватара: ${err}`
      );
    })
    .finally(() => {
      renderLoading(buttonAvatarSubmit, false, "Сохранить");
    });
};

import {
  infoName,
  infoActivity,
  nameInput,
  activityInput,
  popupProfile,
  profileAvatar,
  popupForAvatar,
} from "./index.js";
import { closePopup, renderLoading } from "./utils.js";
import { editProfile, editAvatar } from "./api.js";
