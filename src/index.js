import './index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from './scripts/cards';
import { createCard, deleteCard } from './components/card';
import { openModal, closeModal } from './components/popup';

// Получаем элементы модальных оконк инопок
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const imageElements = document.querySelectorAll('.card__image');

// Получаем элементы popupImageView
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// // @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// // @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, deleteCard);
  cardContainer.append(card);
});

// Нужно чтобы попап оплучал данные карточки - текст и ссылку
imageElements.forEach(image => {
  image.addEventListener('click', function() {popupImageImg.src = element.link;
    popupImageImg.alt = element.name;
    popupImageCaption.textContent = element.name;
    openModal(popupImage);});
});

// Открытие модальных окон по клику
editButton.addEventListener('click', () => openModal(popupEdit));
addButton.addEventListener('click', () => openModal(popupAdd));

// Закрытие модальных окон по клику на крестик или оверлей
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
      const modal = button.closest('.popup');
      closeModal(modal);
  });
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
  }
});
