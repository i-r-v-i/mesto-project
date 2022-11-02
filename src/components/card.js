import {
  popupCardZoom,
  popupZoomImg,
  popupZoomTitle
  } from "./data.js";
import { openPopup } from "./modal.js";
import { handleDeleteCard, handleLikeState } from "./index.js"



export function removeCardfromDOM(cardElement) {
  cardElement.remove();
  cardElement = null;
}

function isMyLike(likesArray, userId) {
  return Boolean(likesArray.find((likesObj) => { return likesObj._id === userId}));
}

function changeLikeStatus(cardElement, likesArray, userId) {
  const cardLike = cardElement.querySelector(".card__like");
if (isMyLike(likesArray, userId)) {
  cardLike.classList.add("card__like_active");
  } else {
  cardLike.classList.remove("card__like_active");
  }
}

function updateLikesCount(cardElement, likesArray) {
  const likeCounter = cardElement.querySelector(".card__like-count");
  likeCounter.textContent = likesArray.length;
}

export function updateLikesStatus(cardElement, likesArray, userId) {
  updateLikesCount(cardElement, likesArray);
  changeLikeStatus(cardElement, likesArray, userId) 
}

//функция зума картинки
function handleClickImage(cardData, popup) {
  popupZoomTitle.textContent = cardData.name;
  popupZoomImg.src = cardData.link;
  popupZoomImg.alt = cardData.name;
  openPopup(popup);
}

//подготовка разметки для рендеринга карточек
export function getCard(cardData, userId) {
  const cardTemplate = document
    .querySelector("#card")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardName = cardElement.querySelector(".card__title");
  const cardBin = cardElement.querySelector(".card__bin");
  const cardLike = cardElement.querySelector(".card__like");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;

  //значок корзинки на карточке
  if (cardData.owner._id !== userId) {
    cardBin.remove();
  }

  updateLikesStatus(cardElement, cardData.likes, userId);

  cardImage.addEventListener("click", () => handleClickImage(cardData, popupCardZoom));
  cardLike.addEventListener("click", () => {
    if (cardLike.classList.contains("card__like_active")) {
      handleLikeState(cardElement, true, cardData._id, userId);
    } else {
      handleLikeState(cardElement, false, cardData._id, userId);
    }
    });
  
  cardBin.addEventListener("click", () => handleDeleteCard(cardElement, cardData._id));

  return cardElement;
}


