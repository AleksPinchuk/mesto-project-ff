import './index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, handleAddCardFormSubmit } from './components/card';
import { openModal, closeModal, handleFormSubmit } from './components/popup';

// Получаем элементы модальных оконк инопок
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const imageElements = document.querySelectorAll('.card__image');
// Форма
const formEditProfile = document.querySelector('#edit-profile');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
// Создание новой карточки
const formNewCard = document.querySelector('#new-place');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

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

// Предзаполнение формы текущими значениями
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

formEditProfile.addEventListener('submit', handleFormSubmit);

formNewCard.addEventListener('submit', handleAddCardFormSubmit);