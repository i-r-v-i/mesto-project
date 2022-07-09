import "../index.css";

export const popupCardZoom = document.querySelector(".popup_type_zoom");
//профиль
const editButtonProfile = document.querySelector(".edit-button");
export const popupProfile = document.querySelector(".popup-profile");
export const popupForAvatar = document.querySelector(".popup_type_avatar");
//форма редактирования профиля
const profileForm = document.querySelector(".form");
export const nameInput = document.querySelector(".form__item_edit_name");
export const activityInput = document.querySelector(
  ".form__item_edit_activity"
);
export const infoName = document.querySelector(".info__name");
export const infoActivity = document.querySelector(".info__activity");
export const profileAvatar = document.querySelector(".profile__avatar");
const buttonAvatar = document.querySelector(".button-avatar");
const formAvatar = document.querySelector(".form-avatar");
//добавление новой карточки
export const popupForCard = document.querySelector(".popup_type_card");
const addButtonCard = document.querySelector(".add-button");
const formImage = document.querySelector(".form-image");

export let userId = null;

getAllInfo()
  .then(([cardsFromServer, user]) => {
    infoName.textContent = user.name;
    infoActivity.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;

    cardsFromServer.forEach((cardItem) => {
      renderCard(cardItem, cardContainer, userId);
    });
  })
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
    );
  });

//лайк
export const handleChangeLike = (cardElement, cardId, isLiked) => {
  changeLike(cardId, isLiked)
    .then((dataFromServer) => {
      updateLikesState(cardElement, dataFromServer.likes, userId);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так... Ошибка при добавлении лайка: ${err}`);
    });
};

// удаление карточки
export const handleDeleteCard = function (cardElement, cardId) {
  removeCard(cardId)
    .then(() => {
      clickButtonDelete(cardElement);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при удалении карточки: ${err}`
      );
    });
};

//слушатель на кнопку закрытия попапа профиля
const closeButtons = document.querySelectorAll(".close-icon");
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
formImage.addEventListener("submit", addNewCard);
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

//слушатель для  открытия попапа добавления новых карточек
addButtonCard.addEventListener("click", function () {
  openPopup(popupForCard);
});

buttonAvatar.addEventListener("click", function () {
  openPopup(popupForAvatar);
});

//слушатель на кнопку открытия попапа редактирования профиля пользователя
//установление значений в поля ввода формы профиля

editButtonProfile.addEventListener("click", function () {
  nameInput.value = infoName.textContent;
  activityInput.value = infoActivity.textContent;
  openPopup(popupProfile);
  checkInputValidity(profileForm, nameInput, elements);
  checkInputValidity(profileForm, activityInput, elements);
});

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const elements = {
  formSelector: ".form",
  inputSelector: ".form__item",
  buttonSelector: ".button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input-error",
  errorClass: "form__item_type_error",
};

// Вызовем функцию валидации
enableValidation(elements);

import { enableValidation, checkInputValidity } from "./validate.js";
import {
  renderCard,
  addNewCard,
  cardContainer,
  updateLikesState,
  clickButtonDelete,
} from "./card.js";
import { handleProfileFormSubmit, handleAvatarFormSubmit } from "./modal.js";
import { openPopup, closePopup } from "./utils.js";
import { getAllInfo, changeLike, removeCard } from "./api.js";
