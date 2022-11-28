import "../index.css";
import {
  nameInput,
  jobInput,
  buttonAvatarEdit,
  avatarInput,
  buttonProfileEdit,
  buttonOpenPopupCard,
  cardLinkInput,
  cardNameInput,
  enableValidationConfig,
  apiConfig,
  popupZoomTitle,
  popupZoomImg
} from "../utils/data.js";
import { EnableValidator } from "../components/EnableValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

let userId = null;

function handleDeleteCard(cardInstance) {
  api
    .deleteCard(cardInstance.getCardId())
    .then(() => {
      cardInstance.removeCardFromDOM();
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при удалении карточки: ${err}`
      );
    });
}

const cardList = new Section(
      {
        renderer: (cards) => {
          cardList.addItem(createCard(cards));
        },
      },
      ".cards__list"
    );


// function addToContainer(items) {
//   const cardList = new Section(
//     {
//       items,
//       renderer: (card) => {
//         cardList.addItem(createCard(card));
//       },
//     },
//     ".cards__list"
//   );
//   return cardList;
// }

const popupZoom = new PopupWithImage(".popup_type_zoom", popupZoomTitle, popupZoomImg);

function createCard(data) {
  const newCard = new Card(
    {
      cardData: data,
      handleCardClick: () => {
          console.log(data)
        popupZoom.setEventListeners();
        popupZoom.openPopup(data);
      },
      handleDeleteCard: () => {
        handleDeleteCard(newCard);
      },
      handleChangeLike: (isLiked) => {
        api
          .changeLike(isLiked, newCard.getCardId())
          .then((dataFromServer) => {
            newCard.updateLikesStatus(dataFromServer.likes, userId);
            if (isLiked) {
              newCard.unsetLikeActive();
            } else {
              newCard.setLikeActive();
            }
          })
          .catch((err) => {
            console.log(
              `Что-то пошло не так... Ошибка при добавлении лайка: ${err}`
            );
          });
      },
    },
    "#card"
  );
  const cardElement = newCard.generateCard(userId);

  return cardElement;
}

const api = new Api(apiConfig);

function setFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validation = new EnableValidator(config, formElement);
    validation.enableValidation();
  });
}
setFormValidation(enableValidationConfig);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__activity",
  avatarSelector: ".profile__avatar",
});

const popupNewCard = new PopupWithForm({
  popupSelector: ".popup_type_newcard",
  handleFormSubmit: () => {
    api
      .addCard({ link: cardLinkInput.value, name: cardNameInput.value })
      .then((dataFromServer) => {
        cardList.addItem(createCard(dataFromServer));
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
  },
});

popupNewCard.setEventListeners();

const popupEditPtofile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: () => {
    api
      .editProfile({ name: nameInput.value, about: jobInput.value })
      .then((res) => {
        userInfo.setUserInfo({ name: res.name, about: res.about });
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
  },
});

popupEditPtofile.setEventListeners();

const popupForAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: () => {
    api
      .editAvatar({ avatar: avatarInput.value })
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
  },
});
popupForAvatar.setEventListeners();

//слушатели и установка обработчиков событий
buttonProfileEdit.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditPtofile.openPopup();
});

buttonOpenPopupCard.addEventListener("click", () => popupNewCard.openPopup());
buttonAvatarEdit.addEventListener("click", () => popupForAvatar.openPopup());

Promise.all([api.getInitialCards(), api.getInfoProfile()])
  .then(([cardsFromServer, userInfoFromServer]) => {
    userInfo.setUserInfo({
      name: userInfoFromServer.name,
      about: userInfoFromServer.about,
    });
    userInfo.setUserAvatar({
      avatar: userInfoFromServer.avatar,
    });
    userId = userInfoFromServer._id;
    cardList.renderItems(cardsFromServer.reverse());
  })
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
    );
  });
