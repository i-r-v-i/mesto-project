import "../index.css";
import {
  initialCards,
  elements,
  editButton,
  formElement,
  buttonOpenPopupCard,
  formForNewCard,
  cardsContainer,
  popupNewCard,
} from "./data.js";
import { enableValidation } from "./validate.js";
import { addToContainer, addNewCard } from "./card.js";
import { setInfoInProfileInputs, handleProfileFormSubmit } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";

//закрытие любого попапа по крестику
const closeIcons = Array.from(document.querySelectorAll(".close-icon"));
closeIcons.forEach((closeIcon) => {
  const popup = closeIcon.closest(".popup");
  closeIcon.addEventListener("click", () => {
    closePopup(popup);
  });
});

//слушатели и установка обработчиков событий
editButton.addEventListener("click", setInfoInProfileInputs);
formElement.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupNewCard));
formForNewCard.addEventListener("submit", addNewCard);

// рендер карточек из массива
initialCards.forEach((item) => {
  addToContainer(cardsContainer, item);
});

enableValidation(elements);
