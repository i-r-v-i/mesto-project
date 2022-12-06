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
    
    this._likeCounter.textContent = this._cardLikesArray.length;
    this._setBinOnCard(userId);
    this._setEventListeners();
    this._changeLikeStatus(userId);

    return this._card;
  }

  getCardId(){
    return this._cardId;
  }

  removeCardFromDOM() {
    this._card.remove();
    this._card = null;
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

  setLikeActive() {
    this._cardLike.classList.add("card__like_active");
  }

  unsetLikeActive() {
    this._cardLike.classList.remove("card__like_active");
  }

  _changeLikeStatus(userId) {
    if (this._isMyLike(userId)) {
      this.setLikeActive();
    } else {
      this.unsetLikeActive();
    }
  }

  _setLikesCount(array) {
    this._likeCounter.textContent = array.length;
  }
  
  updateLikesStatus(array, userId) {
    this._setLikesCount(array);
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
      if (this._cardLike.classList.contains("card__like_active")) {
        this._handleChangeLike(true);
     } else {
      this._handleChangeLike(false);
    }
    });
  }

  _setEventListeners() {
    this._setZoomListener();
    this._setDeleteListener();
    this._setLikeListener();
  }
}
