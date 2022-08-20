const popupProfile = document.querySelector(".popup_type_profile");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__activity");
const popupNewCard = document.querySelector(".popup_type_newcard");

const editButton = document.querySelector(".edit-button");
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector(".form__item_edit_name");
const jobInput = formElement.querySelector(".form__item_edit_activity");
const cardsContainer = document.querySelector(".cards__list");

const buttonOpenPopupCard = document.querySelector(".add-button");
const cardNameInput = document.querySelector(".form__item_card_name");
const cardLinkInput = document.querySelector(".form__item_card_link");
const formForNewCard = document.querySelector(".form-image");

const popupCardZoom = document.querySelector(".popup_type_zoom");
const popupZoomTitle = document.querySelector(".popup__title");
const popupZoomImg = document.querySelector(".popup__img");

// функция открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//лайки
function handleLikeState(evt) {
  evt.target.classList.toggle("card__like_active");
}

//удаление карточки
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

//функция зума картинки
function handleClickImage({ link, name }) {
  popupZoomTitle.textContent = name;
  popupZoomImg.src = link;
  popupZoomImg.alt = name;
  openPopup(popupCardZoom);
}

//подготовка разметки для рендеринга карточек
function getCard({ link, name }) {
  const cardTemplate = document
    .querySelector("#card")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardName = cardElement.querySelector(".card__title");
  const cardBin = cardElement.querySelector(".card__bin");
  const cardLike = cardElement.querySelector(".card__like");
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  cardImage.addEventListener("click", () => handleClickImage({ link, name }));
  cardLike.addEventListener("click", handleLikeState);
  cardBin.addEventListener("click", handleDeleteCard);

  return cardElement;
}

//функция добавления разметки карточки в контейнер
function addToContainer(container, { link, name }) {
  const card = getCard({ link, name });
  container.prepend(card);
}

// функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  addToContainer(cardsContainer, {
    link: cardLinkInput.value,
    name: cardNameInput.value,
  });
  closePopup(popupNewCard);
  // не знаю, какой из двух вариантов ниже лучше. Наверно, с ресет?
  // cardLinkInput.value = "";
  // cardNameInput.value = "";
  formForNewCard.reset();
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

// заполнение полей профиля
function setInfoInProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

//закрытие любого попапа по крестику
const closeIcons = document.querySelectorAll(".close-icon");
closeIcons.forEach((closeIcon) => {
  const popup = closeIcon.closest(".popup");
  closeIcon.addEventListener("click", () => {
    closePopup(popup);
  });
});

//слушатели и установка обработчиков событий
editButton.addEventListener("click", setInfoInProfileInputs);
formElement.addEventListener("submit", handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupNewCard));
formForNewCard.addEventListener("submit", addNewCard);

// рендер карточек из массива
initialCards.forEach((item) => {
  addToContainer(cardsContainer, item);
});
