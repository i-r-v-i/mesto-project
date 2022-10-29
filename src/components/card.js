import {
  popupCardZoom,
  popupZoomImg,
  popupZoomTitle
  } from "./data.js";
import { openPopup } from "./modal.js";

//лайки
function handleLikeState(evt) {
  evt.target.classList.toggle("card__like_active");
}

//удаление карточки
function handleDeleteCard(evt) {
  
  evt.target.closest(".card").remove();
}

//функция зума картинки
function handleClickImage(cardData) {
  popupZoomTitle.textContent = cardData.name;
  popupZoomImg.src = cardData.link;
  popupZoomImg.alt = cardData.name;
  openPopup(popupCardZoom);
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

  cardImage.addEventListener("click", () => handleClickImage(cardData));
  cardLike.addEventListener("click", handleLikeState);
  cardBin.addEventListener("click", handleDeleteCard);

  return cardElement;
}


