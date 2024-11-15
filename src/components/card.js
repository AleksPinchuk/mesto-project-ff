import {closeModal, openModal} from './popup'
import {popupAdd} from '../index'
const cardsTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');
// // @todo: Функция создания карточки
export function createCard(name, link, deleteCard) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
  const popupImageImg = popupImage.querySelector(".popup__image");
  const popupImageCaption = popupImage.querySelector(".popup__caption");

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

 // Обработчик лайка
 cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
});

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

// // @todo: Функция удаления карточки
 export function deleteCard(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}

// Создание новой карточки
const formNewCard = document.querySelector('#new-place');
const cardContainer = document.querySelector('.places__list');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');


// Обработчик отправки формы добавления карточки
export function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(cardNameInput.value, cardLinkInput.value, deleteCard);
    cardContainer.prepend(newCard);
    formNewCard.reset();
    closeModal(popupAdd);
}


