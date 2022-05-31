
//функции для открытия и закрытия попапа редактирования профиля пользователя
const editButton = document.querySelector('.edit-button');
const popupProfile = document.querySelector('.popup-profile');
const closeIcon = document.querySelector('.close-icon');

editButton.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened');
})


closeIcon.addEventListener('click', function() {
    popupProfile.classList.remove('popup_opened');
})

// функция для редактирования профиля и сохранения данных
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__item_edit_name');
const activityInput = document.querySelector('.form__item_edit_activity');


function popupProfileClosed() {
    popupProfile.classList.remove('popup_opened');
}

function formSubmit(evt) {
evt.preventDefault();
const infoName = document.querySelector('.info__name');
const infoActivity = document.querySelector('.info__activity');
infoName.textContent = nameInput.value;
infoActivity.textContent = activityInput.value;
popupProfileClosed();
}

formElement.addEventListener('submit', formSubmit);


//функции для открытия и закрытия попапа добавления новых карточек по клику на кнопки
const popupForCard = document.querySelector('.popup_type_card');
const closeIconCard = document.querySelector('.close-icon_type_card');
const addButton = document.querySelector('.add-button');

addButton.addEventListener('click', function() {
    popupForCard.classList.add('popup_opened');
})


closeIconCard.addEventListener('click', function() {
    popupForCard.classList.remove('popup_opened');
})


function popupForCardClosed() {
    popupForCard.classList.remove('popup_opened');
}

// функции открытия попапа c зумом картинки
const popupCardZoom = document.querySelector('.popup_type_zoom');
function popupCardZoomOpened () {
    popupCardZoom.classList.add('popup_opened');
}


// функция для добавления новой карточки пользователем и операций с этими карточками (лайки, удаление, зум)
const formImage = document.querySelector('.form-image');
const template = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards__list');
const cardNameInput = document.querySelector('.form__item_card_name');
const cardLinkInput = document.querySelector('.form__item_card_link');

function cardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = template.querySelector('.card').cloneNode(true);
    const cardTitle = newCard.querySelector('.card__title');
    const cardImg = newCard.querySelector('.card__img');
    cardTitle.textContent = cardNameInput.value;
    cardImg.src = cardLinkInput.value;
    // newCard.querySelector('.card__title').textContent = cardNameInput.value;
    // newCard.querySelector('.card__img').src = cardLinkInput.value;
    cardContainer.prepend(newCard);

    popupForCardClosed();
    cardNameInput.value = '';
    cardLinkInput.value = '';

    const cardLike = document.querySelector('.card__like');
    cardLike.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('card__like_active');
    });

    const cardBin = document.querySelector('.card__bin');
    cardBin.addEventListener('click', function () {
    const cardItem = cardBin.closest('.card');
    cardItem.remove();
  });

    
    const popupZoomTitle = document.querySelector('.popup__title');
    const popupZoomImg = document.querySelector('.popup__img');
         
    cardImg.addEventListener('click', function() {
        popupCardZoomOpened ();
        popupZoomImg.src = cardImg.src;
        popupZoomTitle.textContent = cardTitle.textContent;
    }) 

}
    
    formImage.addEventListener('submit', cardFormSubmit);

// массив карточек, подгружаемых через Js
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


      // функция для подгружения карточек из массива и операций с ними (лайк, удаление, зум)
      
      initialCards.forEach(function(item) {
        
        const newCard = template.cloneNode(true);
        newCard.querySelector('.card__title').textContent = item.name;
        newCard.querySelector('.card__img').src = item.link;
        cardContainer.prepend(newCard);
        
        const cardLike = document.querySelector('.card__like');
        cardLike.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like_active');
        })

        const cardBin = document.querySelector('.card__bin');
        cardBin.addEventListener('click', function () {
        const cardItem = cardBin.closest('.card');
        cardItem.remove();
        })
    
 
        const cardImg = document.querySelector('.card__img');
        const cardTitle = document.querySelector('.card__title');
        const popupZoomTitle = document.querySelector('.popup__title');
        const popupZoomImg = document.querySelector('.popup__img');
         
        cardImg.addEventListener('click', function() {
            popupCardZoomOpened ();
            popupZoomImg.src = cardImg.src;
            popupZoomTitle.textContent = cardTitle.textContent;
        }) 

      });

// функции закрытия попапа c зумом картинки
const closeIconZoom = document.querySelector('.close-icon_type_zoom');
function popupCardZoomClozed () {
popupCardZoom.classList.remove('popup_opened');
}


closeIconZoom.addEventListener('click', function() {
popupCardZoomClozed () 
})
