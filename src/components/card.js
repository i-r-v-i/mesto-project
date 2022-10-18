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
function handleClickImage({ link, name }) {
  popupZoomTitle.textContent = name;
  popupZoomImg.src = link;
  popupZoomImg.alt = name;
  openPopup(popupCardZoom);
}

//подготовка разметки для рендеринга карточек
export function getCard({ link, name }) {
  const cardTemplate = document
    .querySelector("#card")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardName = cardElement.querySelector(".card__title");
  const cardBin = cardElement.querySelector(".card__bin");
  const cardLike = cardElement.querySelector(".card__like");
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  cardImage.addEventListener("click", () => handleClickImage({ link, name }));
  cardLike.addEventListener("click", handleLikeState);
  cardBin.addEventListener("click", handleDeleteCard);

  return cardElement;
}


