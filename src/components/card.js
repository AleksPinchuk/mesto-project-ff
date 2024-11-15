import {closeModal, openModal} from './popup'
import {popupAdd, popupImage, cardContainer, formNewCard, cardNameInput, cardLinkInput} from '../index'
const cardsTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
export function createCard(name, link, deleteCard, handleLikeButton) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
  const popupImageImg = popupImage.querySelector(".popup__image");
  const popupImageCaption = popupImage.querySelector(".popup__caption");

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  // Обработчик лайка
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeButton);

  // Открытие картинки в полноэкранном режиме
  cardElement.querySelector('.card__image').addEventListener('click', () => {
  openModal(popupImage);
  // Логика для отображения изображения в модальном окне
  popupImageImg.src = link;
  popupImageCaption.textContent = name;
 });

  // Удаление карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
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

// Обработчик отправки формы добавления карточки
export function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(cardNameInput.value, cardLinkInput.value, deleteCard, handleLikeButton);
    cardContainer.prepend(newCard);
    formNewCard.reset();
    closeModal(popupAdd);
}


