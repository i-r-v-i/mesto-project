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
} from "../utils/data.js";
import { EnableValidator } from "../components/EnableValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

let userId = null;

function handleDeleteCard(cardInstance, cardElement) {
  api
    .deleteCard(cardInstance.getCardId())
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так... Ошибка при удалении карточки: ${err}`
      );
    });
}

function addToContainer(items) {
  const cardList = new Section(
    {
      items,
      renderer: (card) => {
        cardList.addItem(createCard(card));
      },
    },
    ".cards__list"
  );
  return cardList;
}

function createCard(data) {
  const newCard = new Card(
    {
      cardData: data,
      handleCardClick: () => {
        const popupZoom = new PopupWithImage(data, ".popup_type_zoom");
        popupZoom.setEventListeners();
        popupZoom.openPopup();
      },
      handleDeleteCard: () => {
        handleDeleteCard(newCard, cardElement);
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
  let info = {};
  info = userInfo.getUserInfo();
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
    addToContainer(cardsFromServer.reverse()).renderItems();
  })
  .catch((err) => {
    console.log(
      `Что-то пошло не так... Ошибка при получении данных с сервера: ${err}`
    );
  });
