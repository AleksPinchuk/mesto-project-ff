import {closeModal, openModal} from './popup'
const cardsTemplate = document.querySelector('#card-template').content;
export const popupImage = document.querySelector('.popup_type_image');
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
export const popupAdd = document.querySelector('.popup_type_new-card');
export const cardContainer = document.querySelector('.places__list');
export const formNewCard = document.querySelector('#new-place');
export const cardNameInput = document.querySelector('.popup__input_type_card-name');
export const cardLinkInput = document.querySelector('.popup__input_type_url');


//Функция создания карточки
export function createCard({name, link, deleteCard, handleLikeButton}) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Обработчик лайка
  likeButton.addEventListener('click', handleLikeButton);
  // Открытие картинки в полноэкранном режиме
  handleImageClick(cardImage, link, name);

  // Удаление карточки
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

//Функция удаления карточки
 export function deleteCard(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}

// Функция лайка
export function handleLikeButton(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function handleImageClick(img, link, name) {
  img.addEventListener('click', () => { 

    openModal(popupImage); 
  
    // Логика для отображения изображения в модальном окне 
    popupImageImg.src = link; 
    popupImageImg.alt = name;
    popupImageCaption.textContent = name; 
  
   }); 
}




