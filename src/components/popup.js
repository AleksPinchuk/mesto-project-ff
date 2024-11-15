// Переменные для формы
const formEditProfile = document.querySelector('#edit-profile');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
import {popupEdit} from '../index'
// Функция для открытия и закрытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}

// Обработчик для закрытия на клавишу Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
      const openModal = document.querySelector('.popup_is-opened');
      if (openModal) closeModal(openModal);
  }
}

// Обработчик отправки формы
export function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(popupEdit);
}



