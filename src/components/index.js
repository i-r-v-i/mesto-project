import "../index.css";
import {
  nameInput,
  jobInput,
  profileAvatar,
  // popupForAvatar,
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
  // popupNewCard,
  cardLinkInput,
  cardNameInput,
  buttonNewCardSubmit,
  enableValidationConfig,
  buttonAvatarSubmit,
  apiConfig
} from "./data.js";
import EnableValidator from "./validate.js";
import { setInfoInProfileInputs } from "./utils.js";
import { PopupWithForm } from "./PopupWithForm.js"
import { getCard, updateLikesStatus } from "./card.js";
import { Api } from "./api.js";
import { UserInfo } from "./UserInfo.js";

const api = new Api(apiConfig);

function setFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validation = new EnableValidator(config, formElement);
    validation.enableValidation();
  })
}
setFormValidation(enableValidationConfig);

const userInfo = new UserInfo(".profile__name", ".profile__activity", ".profile__avatar")

// const newCardValidation = new EnableValidator(enableValidationConfig, '.form[name=cardForm]');
// newCardValidation.enableValidation();

// const avatarValidation = new EnableValidator(enableValidationConfig, '.form[name=editAvatar]');
// avatarValidation.enableValidation();

// const profileValidation = new EnableValidator(enableValidationConfig, '.form[name=editProfile]');
// profileValidation.enableValidation();

const popupNewCard = new PopupWithForm({
  popupSelector: ".popup_type_newcard",
  handleFormSubmit: () => {
    api.addCard({ link: cardLinkInput.value, name: cardNameInput.value })
      .then((dataFromServer) => {
        addToContainer(cardsContainer, dataFromServer, userId);
        popupNewCard.closePopup();
        
      })
      .catch((err) => {
        console.log(
          `Что-то пошло не так... Ошибка при добвлении новой карточки: ${err}`
        );
      })
      .finally(() => {
        popupNewCard.renderLoading(false, "Cоздать");
      });
    }
})

popupNewCard.setEventListeners();

const popupForAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: () => {
    api.editAvatar({ avatar: avatarInput.value })
        .then(() => {
          setInfoProfileFromServer();
          popupForAvatar.closePopup();
          
        })
        .catch((err) => {
          console.log(
            `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
          );
        })
        .finally(() => {
          popupForAvatar.renderLoading(false, "Cохранить");
        });
  }
})
popupForAvatar.setEventListeners();

export function removeCardfromDOM(cardElement) {
  cardElement.remove();
  cardElement = null;
}
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

// // функция добавления новой карточки
// function addNewCard(evt) {
//   evt.preventDefault();
//   renderLoading(evt.target, true, "Cоздать");
//   api.addCard({ link: cardLinkInput.value, name: cardNameInput.value })
//     .then((dataFromServer) => {
//       addToContainer(cardsContainer, dataFromServer, userId);
//       popupNewCard.closePopup();
//       evt.target.reset();
//     })
//     .catch((err) => {
//       console.log(
//         `Что-то пошло не так... Ошибка при добвлении новой карточки: ${err}`
//       );
//     })
//     .finally(() => {
//       renderLoading(evt.target, false, "Cоздать");
//     });
// }

//слушатели и установка обработчиков событий
buttonProfileEdit.addEventListener("click", () => userInfo.getUserInfo());
formProfile.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => popupNewCard.openPopup());
// formForNewCard.addEventListener("submit", () => popupNewCard.handleFormSubmit());
buttonAvatarEdit.addEventListener("click", () => popupForAvatar.openPopup());
// formAvatar.addEventListener("submit", handleAvatarFormSubmit);

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

// export function handleAvatarFormSubmit(evt) {
//   evt.preventDefault();
//   renderLoading(evt.target, true, "Cохранить");
//   api.editAvatar({ avatar: avatarInput.value })
//     .then(() => {
//       setInfoProfileFromServer();
//       closePopup(popupForAvatar);
//       evt.target.reset();
//     })
//     .catch((err) => {
//       console.log(
//         `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
//       );
//     })
//     .finally(() => {
//       renderLoading(evt.target, false, "Cохранить");
//     });
// }


