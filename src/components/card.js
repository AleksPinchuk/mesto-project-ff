const cardsTemplate = document.querySelector('#card-template').content;
// // @todo: Функция создания карточки
export function createCard(name, link, deleteCard) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// // @todo: Функция удаления карточки
 export function deleteCard(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}