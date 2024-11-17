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





