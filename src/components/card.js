import { putLike, deleteLike } from "./api.js";

let currentCardId, currentDeleteButton;

/**
 * Обработчик лайка карточки.
 * @param {HTMLElement} likeButton - Кнопка лайка.
 * @param {HTMLElement} likeCounter - Счетчик лайков.
 * @param {string} cardId - Идентификатор карточки.
 */
export function likeCard(likeButton, likeCounter, cardId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : putLike;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => console.error("Ошибка при изменении лайка:", error));
}

/**
 * Создает DOM-элемент карточки.
 * @param {Object} card - Данные карточки.
 * @param {HTMLElement} cardTemplate - Шаблон карточки.
 * @param {Function} likeCard - Функция обработки лайка.
 * @param {Function} showImgPopup - Функция отображения попапа изображения.
 * @param {Function} openDeletePopup - Функция открытия попапа удаления.
 * @param {string} profileId - Идентификатор пользователя.
 * @returns {HTMLElement} - DOM-элемент карточки.
 */
export function createCard(
  card,
  cardTemplate,
  likeCard,
  showImgPopup,
  openDeletePopup,
  profileId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-count");

  const { _id: cardId, link, name, likes, owner } = card;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeCounter.textContent = likes.length;

  // Установка состояния кнопки лайка
  if (likes.some((like) => like._id === profileId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Добавление обработчиков событий
  likeButton.addEventListener("click", () => likeCard(likeButton, likeCounter, cardId));
  cardImage.addEventListener("click", showImgPopup);

  // Проверка на авторство и настройка кнопки удаления
  if (owner._id !== profileId) {
    deleteButton.classList.add("card__delete-button-unactive");
  } else {
    deleteButton.addEventListener("click", () => {
      currentCardId = cardId;
      currentDeleteButton = deleteButton;
      openDeletePopup();
    });
  }

  return cardElement;
}

/**
 * Возвращает данные для удаления карточки.
 * @returns {Object} - Данные карточки (id и кнопка удаления).
 */
export function getCardForDeletion() {
  return { cardId: currentCardId, deleteButton: currentDeleteButton };
}






