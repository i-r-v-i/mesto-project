import "../index.css";
import {
  profileAvatar,
  popupForAvatar,
  buttonAvatarEdit,
  formAvatar,
  profileName,
  profileJob,
  elements,
  buttonProfileEdit,
  buttonOpenPopupCard,
  formProfile,
  formForNewCard,
  cardsContainer,
  popupNewCard,
  cardLinkInput,
  cardNameInput,
  } from "./data.js";
import { enableValidation } from "./validate.js";
import { setInfoInProfileInputs } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { getCard } from './card.js';
import { getInfoFromServer, addCard } from "./api.js";

//закрытие любого попапа по крестику
const closeIcons = Array.from(document.querySelectorAll(".close-icon"));
closeIcons.forEach((closeIcon) => {
  const popup = closeIcon.closest(".popup");
  closeIcon.addEventListener("click", () => {
    closePopup(popup);
  });
});

//функция добавления разметки карточки в контейнер
export function addToContainer(container, cardData, userId) {
  const card = getCard(cardData, userId);
  container.prepend(card);
}

// функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  addCard({link: cardLinkInput.value, name: cardNameInput.value})
  .then((data) => {
    addToContainer(cardsContainer, {
      link: data.link,
      name: data.name,
    }, userId);
    closePopup(popupNewCard);
  formForNewCard.reset();
  enableValidation(elements);
  })
}

//слушатели и установка обработчиков событий
buttonProfileEdit.addEventListener("click", setInfoInProfileInputs);
formProfile.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupNewCard));
formForNewCard.addEventListener("submit", addNewCard);
buttonAvatarEdit.addEventListener("click", () => openPopup(popupForAvatar));
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

export let userId = null;

getInfoFromServer()
.then(([cardsFromServer, userInfoFromServer]) => {
  // setInfoProfileFromServer(userInfoFromServer);
  profileName.textContent = userInfoFromServer.name;
  profileJob.textContent = userInfoFromServer.about;
  profileAvatar.src = userInfoFromServer.avatar;
  userId = userInfoFromServer._id;

  cardsFromServer.forEach((card) => {
      addToContainer(cardsContainer, card, userId);
})
})
.catch((err) => {
  console.log(
    `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
  );
});

//получение данных профиля с сервера
export function setInfoProfileFromServer() {
getInfoProfile()
.then((userInfoFromServer) => {
  profileName.textContent = userInfoFromServer.name;
  profileJob.textContent = userInfoFromServer.about;
  profileAvatar.src = userInfoFromServer.avatar;
  userId = userInfoFromServer._id;
})
.catch((err) => {
  console.log(
    `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
  );
  })
}
// Обработчик отправки формы редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfile({name: nameInput.value, about: jobInput.value})
  .then(() => {
    setInfoProfileFromServer();
    closePopup(popupProfile);
    })  
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
    );
    })
}

export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  editAvatar({avatar: avatarInput.value})
  .then(() => {
    setInfoProfileFromServer();
    closePopup(popupForAvatar);
    evt.target.reset();
    enableValidation(elements);
  })
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
    );
    })
}

enableValidation(elements);