import "../index.css";
import {
  profileAvatar,
  popupForAvatar,
  buttonAvatarEdit,
  formAvatar,
  avatarInput,
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
import { enableValidation, setEventListenersForForm } from "./validate.js";
import { setInfoInProfileInputs } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { getCard, updateLikesStatus } from './card.js';
import { getInfoFromServer, addCard, deleteCard, editProfile, getInfoProfile, editAvatar, changeLike } from "./api.js";

//закрытие любого попапа по крестику
const closeIcons = Array.from(document.querySelectorAll(".close-icon"));
closeIcons.forEach((closeIcon) => {
  const popup = closeIcon.closest(".popup");
  closeIcon.addEventListener("click", () => {
    closePopup(popup);
  });
});

// лайки
export function handleLikeState(cardElement, isLiked, cardId, userId) {
  changeLike(isLiked, cardId)
  .then((dataFromServer) => {
      updateLikesStatus(cardElement, dataFromServer.likes, userId)
  })
  .catch((err) => {
    console.log(`Что-то пошло не так... Ошибка при добавлении лайка: ${err}`);
  });
}


//удаление карточки из сервера и ДОМ
export function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
  .then(() => {
    cardElement.remove();
    cardElement = null;
  })
}


//функция добавления разметки карточки в контейнер
export function addToContainer(container, cardData, userId) {
  const card = getCard(cardData, userId);
  container.prepend(card);
}

// функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  addCard({link: cardLinkInput.value, name: cardNameInput.value})
  .then((dataFromServer) => {
    addToContainer(cardsContainer, dataFromServer, userId);
    closePopup(popupNewCard);
  evt.target.reset();
  setEventListenersForForm(evt.target, elements);
  })
}

//слушатели и установка обработчиков событий
buttonProfileEdit.addEventListener("click", setInfoInProfileInputs);
formProfile.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => openPopup('popup_type_newcard'));
formForNewCard.addEventListener("submit", addNewCard);
buttonAvatarEdit.addEventListener("click", () => openPopup('popup_type_avatar'));
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

export let userId = null;

getInfoFromServer()
.then(([cardsFromServer, userInfoFromServer]) => {
  profileName.textContent = userInfoFromServer.name;
  profileJob.textContent = userInfoFromServer.about;
  profileAvatar.src = userInfoFromServer.avatar;
  userId = userInfoFromServer._id;

  cardsFromServer.reverse().forEach((card) => {
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
    setEventListenersForForm(evt.target, elements)
    
  })
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
    );
    })
}

 enableValidation(elements);