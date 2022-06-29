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
//ищем заголовок в попапе
const popupZoomTitle = document.querySelector('.popup__title');
//ищем саму картинку в попапе
const popupZoomImg = document.querySelector('.popup__img');
const cardNameInput = document.querySelector('.form__item_card_name');
const cardLinkInput = document.querySelector('.form__item_card_link');



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
initialCards.forEach(function(item) {
    renderCard(item, cardContainer)
})



// функция для добавления новой карточки пользователем
const addNewCard = function(evt) {
    evt.preventDefault();
    const cardTitle = cardNameInput.value;
    const cardImg = cardLinkInput.value;
    
    const cardInfo = {
      name: cardTitle,
      link: cardImg  
    }
  
    renderCard(cardInfo, cardContainer);
    closePopup(popupForCard);
    evt.target.reset();
     
  }

  export { addNewCard };
  import { openPopup, closePopup } from './utils.js';
  import {  popupCardZoom, popupForCard } from './index.js';
 
  
 