// импорт главного файла стилей 
import './index.css';
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, handleLikeButton } from './components/card';
import { openModal, closeModal } from './components/popup';

// Получаем элементы модальных оконк инопок
// export const popupAdd = document.querySelector('.popup_type_new-card');
// export const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const imageElements = document.querySelectorAll('.card__image');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupAdd = document.querySelector('.popup_type_new-card');
const cardContainer = document.querySelector('.places__list');
const formNewCard = document.querySelector('#new-place');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

// Переменные для формы
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.querySelector('#edit-profile');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
// // функция принимает в вызов карточку и метод вставки
// // метод по умолчанию `prepend`, но можно указать `append` 
function renderCard(item, method = "prepend") {

  // создаем карточку, передавая обработчики в виде объекта `callbacks`
  const cardElement = createCard(item);

  // вставляем карточку, используя метод (вставится `prepend` или `append`)
  cardContainer[method](cardElement);
}

// Открытие попапа с картинкой
export function handleImageClick(link, name) {
  console.log(name, link);
  openModal(popupImage);
  // console.log(name, link);

  // Логика для отображения изображения в модальном окне
  popupImageImg.src = link;
  popupImageImg.alt = name;
  popupImageCaption.textContent = name;
}

// // @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardParams = {
    name: element.name,
    link: element.link,
    deleteCard: deleteCard,
    handleLikeButton: handleLikeButton,
    handleImageClick: handleImageClick,
  };
  renderCard(cardParams, 'append');
});

// Обработчик отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardParams = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    deleteCard: deleteCard,
    handleLikeButton: handleLikeButton,
    handleImageClick: handleImageClick,
  };
  renderCard(cardParams, 'prepend');
  formNewCard.reset();
  closeModal(popupAdd);
}

// Открытие модальных окон по клику
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit)
});
addButton.addEventListener('click', () => openModal(popupAdd));

// Закрытие модальных окон по клику на крестик или оверлей
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup)
    }
  })
})

// Обработчик отправки формы редактировария профиля
function profileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
}

formEditProfile.addEventListener('submit', profileForm);

formNewCard.addEventListener('submit', handleAddCardFormSubmit);