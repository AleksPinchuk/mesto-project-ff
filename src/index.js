import './index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from '../scripts/cards';

// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// // @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// // @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// // @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}

// // @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, deleteCard);
  cardContainer.append(card);
});




