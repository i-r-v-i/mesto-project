const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ищем шаблон по id и его ребенка
const cardTemplate = document.querySelector('#card').content.querySelector('.card');
//задаем переменную на элемент, в который копируем шаблон
const cardContainer = document.querySelector('.cards__list');

// ищем попап для зума картинки
const popupCardZoom = document.querySelector('.popup_type_zoom');
//ищем заголовок в попапе
const popupZoomTitle = document.querySelector('.popup__title');
//ищем саму картинку в попапе
const popupZoomImg = document.querySelector('.popup__img');
const closeIconZoom = document.querySelector('.close-icon_type_zoom');

//профиль
const editButtonProfile = document.querySelector('.edit-button');
const popupProfile = document.querySelector('.popup-profile');
const closeIconProfile = document.querySelector('.close-icon');   
   
//форма редактирования профиля
const formProfile = document.querySelector('.form');
const nameInput = document.querySelector('.form__item_edit_name');
const activityInput = document.querySelector('.form__item_edit_activity');
const infoName = document.querySelector('.info__name');
const infoActivity = document.querySelector('.info__activity');

//добавление новой карточки
const popupForCard = document.querySelector('.popup_type_card');
const closeIconCard = document.querySelector('.close-icon_type_card');
const addButtonCard = document.querySelector('.add-button');

const formImage = document.querySelector('.form-image');
const cardNameInput = document.querySelector('.form__item_card_name');
const cardLinkInput = document.querySelector('.form__item_card_link');

//функция открытия любого попапа
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    //слушатель на esc
    document.addEventListener('keydown', keyHandler);
    popup.addEventListener('mousedown', overHandler); 
}


//функция закрытия любого попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('mousedown', overHandler);
}

//функция закрытия попапа по Esc
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

//функция закрытия попапа по клику на оверлей
function overHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupOpened);
 }
}

//слушатель на кнопку открытия попапа редактирования профиля пользователя
//установление значений в поля ввода формы профиля

editButtonProfile.addEventListener('click', function () {
  nameInput.value = infoName.textContent;
  activityInput.value = infoActivity.textContent;
  openPopup(popupProfile);
});

//слушатель на кнопку закрытия попапа профиля
closeIconProfile.addEventListener('click', function () {
   closePopup(popupProfile);
})

//слушатель на кнопку закрытия попапа c зумом картинки
closeIconZoom.addEventListener('click', function () {
    closePopup(popupCardZoom);
})

//функция реализации зума картинки (передаем ее как параметр внутри функции createCard) 
const handleClickImage = function(data) {
  popupZoomImg.src = data.link;
  popupZoomTitle.textContent = data.name;
  popupZoomImg.alt = data.name;
  openPopup(popupCardZoom)
}

//функция удаления карточки (и теперь ее вешаем как обработчик событий в createCard)
const handleClickButtonDelete = function(e) {
    const target = e.target;
    const cardItem = target.closest('.card');
    cardItem.remove()
}

//лайк
const handleClickLike = function(e) {
  const target = e.target;
  target.classList.toggle('card__like_active');
}


// функция рендера одной карточки из массива данных
const createCard = function(data){
// клонируем шаблон и сохраняем в переменную
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardName = cardElement.querySelector('.card__title');
  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
 
  const cardBin = cardElement.querySelector('.card__bin');
  const cardLike = cardElement.querySelector('.card__like');


//здесь три обрабочика события: кнопка удаления, корзинка, лайк и зум
//событие зум картинки при клике - передаем функцию handleClickImage:
cardImage.addEventListener('click', () => handleClickImage(data));
//событие удаление карточки передаем функцию как обрабочик событий внутри функции создания
cardBin.addEventListener('click', handleClickButtonDelete);
cardLike.addEventListener('click', handleClickLike);

return cardElement;
}



//функция добавления карточки в контейнер
const renderCard = function(data, container) {
const card = createCard(data);
container.prepend(card);
}

//функция для прохождения массива карточек, в ней вызываем функцию рендера карточек и передаем данные - карточку и тот контейнер, куда их складывать
initialCards.forEach(function(item){
  renderCard(item, cardContainer)
})


// функция для редактирования профиля и сохранения данных
const profileFormSubmit = function(evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoActivity.textContent = activityInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', profileFormSubmit);


// функция для добавления новой карточки пользователем

const addNewCard = function(evt) {
  evt.preventDefault();
  const cardTitle = cardNameInput.value;
  const cardImg = cardLinkInput.value;
  cardImg.alt = cardNameInput.value;
  const cardInfo = {
    name: cardTitle,
    link: cardImg  
  }

  renderCard(cardInfo, cardContainer);
  closePopup(popupForCard);
  evt.target.reset();
  
}

formImage.addEventListener('submit', addNewCard);

//слушатели для  открытия и закрытия попапа добавления новых карточек
addButtonCard.addEventListener('click', function() {
  openPopup(popupForCard);
})

closeIconCard.addEventListener('click', function() {
  closePopup(popupForCard);
})


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
   // Заменим содержимое span с ошибкой на переданный параметр
   errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('input-error');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
 // Скрываем сообщение об ошибке
 errorElement.classList.remove('input-error');
 // Очистим ошибку
 errorElement.textContent = '';
};




// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};
 
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('button_disabled');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('button_disabled');
  }
}; 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach(function (inputElement) {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем  checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
       // Вызовем toggleButtonState и передадим ей массив полей и кнопку
       toggleButtonState(inputList, buttonElement);
    });
  });
}; 


//функция поиска невалидного поля из всех полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

// функция, запускающая валидацию
const enableValidation = () => {
  const formList = document.querySelectorAll('.form');
  [...formList].forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // Для каждой формы вызовем функцию setEventListeners,
  // передав ей элемент формы
  setEventListeners(formElement);
});
};

// Вызовем функцию валидации
enableValidation(); 

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formElement: '.form__item',
//   inputElement: '.popup__input',
//   buttonElement: '.button',
//   inactiveButtonClass: 'button_disabled',
//   inputErrorClass: 'input-error',
//   errorClass: 'form__item_type_error'
// }); 