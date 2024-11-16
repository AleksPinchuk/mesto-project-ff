// импорт главного файла стилей 
import './index.css'; 
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, handleAddCardFormSubmit, handleLikeButton,
  popupAdd, popupImage, cardContainer, formNewCard, cardNameInput, cardLinkInput } from './components/card';
import { openModal, closeModal, popupEdit,
  formEditProfile, nameInput, jobInput, profileJob, profileName} from './components/popup';

// Получаем элементы модальных оконк инопок
// export const popupAdd = document.querySelector('.popup_type_new-card');
// export const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const imageElements = document.querySelectorAll('.card__image');

// // функция принимает в вызов карточку и метод вставки
// // метод по умолчанию `prepend`, но можно указать `append` 
// function renderCard(item, method = "prepend") {

//   // создаем карточку, передавая обработчики в виде объекта `callbacks`
//   const cardElement = createCard(item, callbacks);

//   // вставляем карточку, используя метод (вставится `prepend` или `append`)
//   cardContainer[ method ](cardElement);
// }

// // @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardParams = {
    name: element.name,
    link: element.link,
    deleteCard: deleteCard,
    handleLikeButton: handleLikeButton,
  };
  const card = createCard(cardParams);
  cardContainer.append(card);
});

// Открытие модальных окон по клику
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit)});
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