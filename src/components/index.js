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
  buttonProfileEdit,
  buttonOpenPopupCard,
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
import { PopupWithForm } from "./PopupWithForm.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { Card } from "./card.js";
import { Api } from "./api.js";
import UserInfo from "./UserInfo.js";
import { Section } from "./Section.js"

const api = new Api(apiConfig);

function setFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validation = new EnableValidator(config, formElement);
    validation.enableValidation();
  })
}
setFormValidation(enableValidationConfig);

const userInfo = new UserInfo({nameSelector : ".profile__name", aboutSelector: ".profile__activity", avatarSelector: ".profile__avatar"})

const popupZoomCard = new PopupWithImage(card, ".popup_type_zoom");

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

const popupEditPtofile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: () => {
    api.editProfile({ name: nameInput.value, about: jobInput.value })
    .then((res) => {
      userInfo.setUserInfo( { name: res.name, about: res.about });
      popupEditPtofile.closePopup();
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
      );
    })
    .finally(() => {
      popupEditPtofile.renderLoading(false, "Cохранить");
    });
  }
})

popupEditPtofile.setEventListeners();


const popupForAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: () => {
    api.editAvatar({ avatar: avatarInput.value })
        .then((res) => {
          userInfo.setUserAvatar({ avatar: res.avatar });
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

//слушатели и установка обработчиков событий
buttonProfileEdit.addEventListener("click", () => { 
  let info = {};
  info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditPtofile.openPopup() 
});

buttonOpenPopupCard.addEventListener("click", () => popupNewCard.openPopup());
buttonAvatarEdit.addEventListener("click", () => popupForAvatar.openPopup());

export let userId = null;

Promise.all([api.getInitialCards(), api.getInfoProfile()])
  .then(([cardsFromServer, userInfoFromServer]) => {
    userInfo.setUserInfo({
        name: userInfoFromServer.name,
        about: userInfoFromServer.about
    })
    userInfo.setUserAvatar({
        avatar: userInfoFromServer.avatar
    })
    userId = userInfoFromServer._id;
      const cardList = new Section({
          items: cardsFromServer,
          renderer: (card) => {
              const newCard = new Card({
                  cardData: card,
                  handleCardClick: () => {

                  },
                  handleDeleteCard: () => {
                      api.deleteCard(newCard.getCardId())
                          .then(() => {
                              cardElement.remove();
                          })
                          .catch((err) => {
                              console.log(
                                  `Что-то пошло не так... Ошибка при удалении карточки: ${err}`
                              );
                          });
                  },
                  handleChangeLike: () => {

                  },
              }, '#card')
          const cardElement = newCard.generateCard(userId);
          cardList.addItem(cardElement)
          }

      }, '.cards__list')
      cardList.renderItems();

    })
    // cardsFromServer.reverse().forEach((card) => {
    //   addToContainer(cardsContainer, card, userId);
    // });
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
    );
  });




