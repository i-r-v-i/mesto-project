import "../index.css";
import {
  initialCards,
  elements,
  editButton,
  buttonOpenPopupCard,
  formProfile,
  formForNewCard,
  cardsContainer,
  popupNewCard,
  cardLinkInput,
  cardNameInput,
  } from "./data.js";
import { enableValidation } from "./validate.js";
import { setInfoInProfileInputs, handleProfileFormSubmit } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { getCard } from './card.js';

//закрытие любого попапа по крестику
const closeIcons = Array.from(document.querySelectorAll(".close-icon"));
closeIcons.forEach((closeIcon) => {
  const popup = closeIcon.closest(".popup");
  closeIcon.addEventListener("click", () => {
    closePopup(popup);
  });
});

//функция добавления разметки карточки в контейнер
function addToContainer(container, { link, name }) {
  const card = getCard({ link, name });
  container.prepend(card);
}

// функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  addToContainer(cardsContainer, {
    link: cardLinkInput.value,
    name: cardNameInput.value,
  });
  closePopup(popupNewCard);
  formForNewCard.reset();
}

//слушатели и установка обработчиков событий
editButton.addEventListener("click", setInfoInProfileInputs);
formProfile.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupNewCard));
formForNewCard.addEventListener("submit", addNewCard);

// рендер карточек из массива
initialCards.forEach((item) => {
  addToContainer(cardsContainer, item);
});

enableValidation(elements);
