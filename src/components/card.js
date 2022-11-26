export class Card {
  constructor( {cardData, handleCardClick, handleDeleteCard, handleChangeLike}, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardName = cardData.name;
    this._cardImageLink = cardData.link;
    this._cardLikesArray = cardData.likes;
    this._cardId = cardData._id;
    this._cardOwner = cardData.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleChangeLike = handleChangeLike;
  }

  _getCard() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");
    this._cardElement = this._cardTemplate.cloneNode(true);
    return this._cardElement;
  }

  generateCard(userId) {
    this._card = this._getCard(); //получаем склонированную карточку для заполнения

    this._cardImage = this._card.querySelector(".card__img");
    this._cardBin = this._card.querySelector(".card__bin");
    this._cardLike = this._card.querySelector(".card__like");
    this._likeCounter = this._card.querySelector(".card__like-count");
    this._card.querySelector(".card__title").textContent = this._cardName;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = `Фото ${this._cardName}`;

    this.updateLikesStatus(userId);
    this._setBinOnCard(userId);
    this._setEventListeners();

    return this._card;
  }

  getCardId(){
    return this._cardId;
  }

  _setBinOnCard(userId) {
  if (this._cardOwner !== userId) {
    this._cardBin.remove();
  }
  }

  _isMyLike(userId) {
    return Boolean(
      this._cardLikesArray.find((likesObj) => {
        return likesObj._id === userId;
      })
    );
  }

  _setLikeActive() {
    this._cardLike.classList.add("card__like_active");
  }

  _unsetLikeActive() {
    this._cardLike.classList.remove("card__like_active");
  }

  _changeLikeStatus(userId) {
    if (this._isMyLike(userId)) {
      this._setLikeActive();
    } else {
      this._unsetLikeActive();
    }
  }

  _updateLikesCount() {
    this._likeCounter.textContent = this._cardLikesArray.length;
  }
  
  updateLikesStatus(userId) {
    this._updateLikesCount();
    this._changeLikeStatus(userId);
  }

  _setZoomListener() {
    this._cardImage.addEventListener("click", this._handleCardClick);
  }

  _setDeleteListener() {
    this._cardBin.addEventListener("click", () => {
      this._handleDeleteCard()
    });
  }

  _setLikeListener() {
    this._cardLike.addEventListener("click", () => {
      this._handleChangeLike();
      // this._cardLike.classList.toggle(".card__like_active");
    });
    
  }

  // cardLike.addEventListener("click", () => {
  //   if (cardLike.classList.contains("card__like_active")) {
  //     handleLikeState(cardElement, true, cardData._id, userId);
  //   } else {
  //     handleLikeState(cardElement, false, cardData._id, userId);
  //   }
  // });
  
  _setEventListeners() {
    this._setZoomListener();
    this._setDeleteListener();
    this._setLikeListener();
  }
}

// function isMyLike(likesArray, userId) {
//   return Boolean(
//     likesArray.find((likesObj) => {
//       return likesObj._id === userId;
//     })
//   );
// }

// function changeLikeStatus(cardElement, likesArray, userId) {
//   const cardLike = cardElement.querySelector(".card__like");
//   if (isMyLike(likesArray, userId)) {
//     cardLike.classList.add("card__like_active");
//   } else {
//     cardLike.classList.remove("card__like_active");
//   }
// }

// function updateLikesCount(cardElement, likesArray) {
//   const likeCounter = cardElement.querySelector(".card__like-count");
//   likeCounter.textContent = likesArray.length;
// }

// export function updateLikesStatus(cardElement, likesArray, userId) {
//   updateLikesCount(cardElement, likesArray);
//   changeLikeStatus(cardElement, likesArray, userId);
// }

//функция зума картинки
// function handleClickImage(cardData, popup) {
//   popupZoomTitle.textContent = cardData.name;
//   popupZoomImg.src = cardData.link;
//   popupZoomImg.alt = cardData.name;
//   openPopup(popup);
// }

//подготовка разметки для рендеринга карточек
//  export function getCard(cardData, userId) {
//   const cardTemplate = document
//     .querySelector("#card")
//     .content.querySelector(".card");

//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__img");
//   const cardName = cardElement.querySelector(".card__title");
//   const cardBin = cardElement.querySelector(".card__bin");
//   const cardLike = cardElement.querySelector(".card__like");
//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   cardName.textContent = cardData.name;

//   //значок корзинки на карточке
//   if (cardData.owner._id !== userId) {
//     cardBin.remove();
//   }

//   updateLikesStatus(cardElement, cardData.likes, userId);

//   const popupZoomCard = new PopupWithImage(cardData, ".popup_type_zoom");

//   cardImage.addEventListener("click", () => popupZoomCard.openPopup());

  
//   cardLike.addEventListener("click", () => {
//     if (cardLike.classList.contains("card__like_active")) {
//       handleLikeState(cardElement, true, cardData._id, userId);
//     } else {
//       handleLikeState(cardElement, false, cardData._id, userId);
//     }
//   });

//   cardBin.addEventListener("click", () =>
//     handleDeleteCard(cardElement, cardData._id)
//   );

//   return cardElement;
// }
