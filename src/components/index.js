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
        addToContainer(dataFromServer).addItem(createCard(dataFromServer));
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

// export function removeCardfromDOM(cardElement) {
//   cardElement.remove();
//   cardElement = null;
// }
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

function handleDeleteCard(cardInstance, cardElement) {
    api.deleteCard(cardInstance.getCardId())
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(
                `Что-то пошло не так... Ошибка при удалении карточки: ${err}`
            );
        });
}

function addToContainer(items){
    const cardList = new Section({
        items,
        renderer: (card) => {
            cardList.addItem(createCard(card))
        }
    }, '.cards__list')
    return cardList;
}


function createCard(data){
    const newCard = new Card({
        cardData: data,
        // handleCardClick: ,
        handleDeleteCard: () => {
            handleDeleteCard(newCard, cardElement)
        },
        // handleChangeLike: ,
    }, '#card')
    const cardElement = newCard.generateCard(userId);
    return cardElement;
}

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
    addToContainer(cardsFromServer).renderItems();
    })
    // cardsFromServer.reverse().forEach((card) => {
    //   addToContainer(cardsContainer, card, userId);
    // });
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
    );
  });




