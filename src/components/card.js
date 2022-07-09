// ищем шаблон по id и его ребенка
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");
//задаем переменную на элемент, в который копируем шаблон
export const cardContainer = document.querySelector(".cards__list");
const popupZoomTitle = document.querySelector(".popup__title");
const popupZoomImg = document.querySelector(".popup__img");
const cardNameInput = document.querySelector(".form__item_card_name");
const cardLinkInput = document.querySelector(".form__item_card_link");

//функция реализации зума картинки (передаем ее как параметр внутри функции createCard)
const handleClickImage = function (data) {
  popupZoomImg.src = data.link;
  popupZoomTitle.textContent = data.name;
  popupZoomImg.alt = data.name;
  openPopup(popupCardZoom);
};

export const isLiked = (likesArray, userId) => {
  return Boolean(
    likesArray.find((likeObj) => {
      return likeObj._id === userId;
    })
  );
};

export const updateLikesState = (cardElement, likesArray, userId) => {
  const cardLike = cardElement.querySelector(".card__like");
  const likeCounter = cardElement.querySelector(".card__like-count");
  likeCounter.textContent = likesArray.length;

  if (isLiked(likesArray, userId, cardElement)) {
    cardLike.classList.add("card__like_active");
  } else {
    cardLike.classList.remove("card__like_active");
  }
};

// функция удаления карточки из ДОМ
export const clickButtonDelete = (card) => {
  card.remove();
  card = null;
};

// функция создания карточки
const createCard = function (cardData, userId, handleChangeLike) {
  // клонируем шаблон и сохраняем в переменную
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardName = cardElement.querySelector(".card__title");
  const cardBin = cardElement.querySelector(".card__bin");
  const cardLike = cardElement.querySelector(".card__like");

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  updateLikesState(cardElement, cardData.likes, userId);

  //значок корзинки на карточке
  if (cardData.owner._id !== userId) {
    cardBin.remove();
  }
  //удаление карточки
  cardBin.addEventListener("click", () =>
    handleDeleteCard(cardElement, cardData._id)
  );
  //зум картинки
  cardImage.addEventListener("click", () => handleClickImage(cardData));
  //лайк
  cardLike.addEventListener("click", () => {
    handleChangeLike(
      cardElement,
      cardData._id,
      cardLike.classList.contains("card__like_active")
    );
  });

  return cardElement;
};

//функция добавления карточки в контейнер
export const renderCard = function (cardData, container, userId) {
  const card = createCard(cardData, userId, handleChangeLike, handleDeleteCard);
  container.prepend(card);
};
const newCardButton = document.querySelector(".new-card-button");
// функция для добавления новой карточки пользователем
export const addNewCard = function (evt) {
  evt.preventDefault();

  renderLoading(newCardButton, true, "текст");

  const cardTitle = cardNameInput.value;
  const cardImg = cardLinkInput.value;

  addCard({ name: cardTitle, link: cardImg })
    .then((cardData) => {
      renderCard(cardData, cardContainer, userId);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при добавлении карточки: ${err}`
      );
    })
    .finally(() => renderLoading(newCardButton, false, "Создать"));

  closePopup(popupForCard);
  evt.target.reset();
};

import { openPopup, closePopup, renderLoading } from "./utils.js";
import {
  userId,
  popupCardZoom,
  popupForCard,
  handleChangeLike,
  handleDeleteCard,
} from "./index.js";
import { addCard } from "./api.js";
