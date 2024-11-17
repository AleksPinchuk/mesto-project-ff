import { handleImageClick } from '../index';
import { openModal } from './popup';
const cardsTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
export function createCard({ name, link, deleteCard, handleLikeButton, handleImageClick }) {
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
  cardImage.addEventListener('click', () => handleImageClick(link, name));
  // handleImageClick(cardImage, link, name);

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







