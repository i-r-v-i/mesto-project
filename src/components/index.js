import "../index.css";
import {
  nameInput,
  jobInput,
  profileAvatar,
  popupForAvatar,
  popupProfile,
  buttonAvatarEdit,
  formAvatar,
  avatarInput,
  profileName,
  profileJob,
  buttonProfileEdit,
  buttonOpenPopupCard,
  formProfile,
  formForNewCard,
  cardsContainer,
  popupNewCard,
  cardLinkInput,
  cardNameInput,
  buttonNewCardSubmit,
  enableValidationConfig,
  buttonAvatarSubmit,
} from "./data.js";
import { enableValidation, setButtonDisabled } from "./validate.js";
import { setInfoInProfileInputs, renderLoading } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { getCard, updateLikesStatus, removeCardfromDOM } from "./card.js";
import {
    Api
} from "./api.js";

const api = new Api({
    token: "34adb4d1-3b9f-4221-8c5f-16ba80991dd4",
    url: "https://nomoreparties.co/v1/plus-cohort-16"
})

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
  api.changeLike(isLiked, cardId)
    .then((dataFromServer) => {
      updateLikesStatus(cardElement, dataFromServer.likes, userId);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так... Ошибка при добавлении лайка: ${err}`);
    });
}

//удаление карточки из сервера и ДОМ
export function handleDeleteCard(cardElement, cardId) {
  api.deleteCard(cardId)
    .then(() => {
      removeCardfromDOM(cardElement);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при удалении карточки: ${err}`
      );
    });
}

//функция добавления разметки карточки в контейнер
export function addToContainer(container, cardData, userId) {
  const card = getCard(cardData, userId);
  container.prepend(card);
}

// функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true, "Cоздать");
  api.addCard({ link: cardLinkInput.value, name: cardNameInput.value })
    .then((dataFromServer) => {
      addToContainer(cardsContainer, dataFromServer, userId);
      closePopup(popupNewCard);
      evt.target.reset();
      setButtonDisabled(buttonNewCardSubmit, enableValidationConfig);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при добвлении новой карточки: ${err}`
      );
    })
    .finally(() => {
      renderLoading(evt.target, false, "Cоздать");
    });
}

//слушатели и установка обработчиков событий
buttonProfileEdit.addEventListener("click", setInfoInProfileInputs);
formProfile.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupNewCard));
formForNewCard.addEventListener("submit", addNewCard);
buttonAvatarEdit.addEventListener("click", () => openPopup(popupForAvatar));
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

export let userId = null;

Promise.all([api.getInitialCards(), api.getInfoProfile()])
  .then(([cardsFromServer, userInfoFromServer]) => {
    profileName.textContent = userInfoFromServer.name;
    profileJob.textContent = userInfoFromServer.about;
    profileAvatar.src = userInfoFromServer.avatar;
    userId = userInfoFromServer._id;

    cardsFromServer.reverse().forEach((card) => {
      addToContainer(cardsContainer, card, userId);
    });
  })
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
    );
  });

//получение данных профиля с сервера
export function setInfoProfileFromServer() {
  api.getInfoProfile()
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
    });
}
// Обработчик отправки формы редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true, "Cохранить");
  api.editProfile({ name: nameInput.value, about: jobInput.value })
    .then(() => {
      setInfoProfileFromServer();
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
      );
    })
    .finally(() => {
      renderLoading(evt.target, false, "Cохранить");
    });
}

export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true, "Cохранить");
  api.editAvatar({ avatar: avatarInput.value })
    .then(() => {
      setInfoProfileFromServer();
      closePopup(popupForAvatar);
      evt.target.reset();
      setButtonDisabled(buttonAvatarSubmit, enableValidationConfig);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
      );
    })
    .finally(() => {
      renderLoading(evt.target, false, "Cохранить");
    });
}

enableValidation(enableValidationConfig);