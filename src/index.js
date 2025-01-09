import "./index.css";
import { createCard, likeCard, getCardForDeletion } from "./components/card.js";
import { openModal, closeModal } from "./components/popup.js";
import { enableValidation, clearValidation, validationConfig } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  getInitialInfo,
  deleteMyCard,
  editProfile,
  postNewCard,
  updateNewAvatar,
} from "./components/api.js";

// Элементы списка карточек
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");
const profilePopup = document.querySelector(".popup_type_avatar");
const deletePopup = document.querySelector(".popup_type_delete");

// Кнопки и связанные элементы профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImageButton = document.querySelector(".profile__image_cover");
const profileImage = document.querySelector(".profile__image");

// Формы и элементы форм
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const editSaveButton = editPopup.querySelector(".popup__button");

const addForm = document.querySelector('form[name="new-place"]');
const cardInput = addForm.querySelector(".popup__input_type_card-name");
const linkInput = addForm.querySelector(".popup__input_type_url");
const addSaveButton = addCardPopup.querySelector(".popup__button");

const profileForm = document.forms["avatar_edit"];
const profileLinkInput = profileForm.querySelector(".popup__input_type_url");
const profileSaveButton = profilePopup.querySelector(".popup__button");

const deleteForm = document.querySelector('form[name="delete-card"]');
const closeDeleteButton = deletePopup.querySelector(".popup__close");
const closeEditButton = editPopup.querySelector(".popup__close");
const closeAddButton = addCardPopup.querySelector(".popup__close");

// Элементы для попапа увеличения изображения
const closePhotoButton = imgPopup.querySelector(".popup__close");
const zoomedPopupImage = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");

// Глобальная переменная для хранения ID пользователя
let profileId;

const openDeletePopup = () => {
  openModal(deletePopup);
};

// Функция добавления карточки
function addCard(
  card,
  placesList,
  cardTemplate,
  createCard,
  likeCard,
  showImgPopup,
  openDeletePopup,
  profileId
) {
  const cardElement = createCard(
    card,
    cardTemplate,
    likeCard,
    showImgPopup,
    openDeletePopup,
    profileId
  );
  placesList.append(cardElement);
}

// Функция заполнения страницы карточками
function fillCards(initialCards, profileId) {
  initialCards.forEach((card) => {
    addCard(
      card,
      placesList,
      cardTemplate,
      createCard,
      likeCard,
      showImgPopup,
      openDeletePopup,
      profileId
    );
  });
}

// Функция button loading пока данные загружаются
const showLoadingBtn = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

// Функция сохранения полей ввода формы
function fillPopupEditInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция редактирования профиля
function handleEditForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  showLoadingBtn(true, editSaveButton);
  editSaveButton.disabled = true;
  editProfile(nameValue, jobValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(editPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      showLoadingBtn(false, editSaveButton);
    });
}

// Функция загрузки с сервера и добавления карточек на страницу
function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  showLoadingBtn(true, addSaveButton);
  addSaveButton.disabled = true;
  postNewCard(cardValue, linkValue)
    .then((card) => {
      const newCard = createCard(
        card,
        cardTemplate,
        likeCard,
        showImgPopup,
        openDeletePopup,
        profileId
      );
      placesList.prepend(newCard);
      closeModal(addCardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      addForm.reset();
      showLoadingBtn(false, addSaveButton);
    });
}

// Функция показа Popup увеличения картинок
function showImgPopup(evt) {
  openModal(imgPopup);
  zoomedPopupImage.setAttribute("src", evt.target.src);
  zoomedPopupImage.setAttribute("alt", evt.target.alt);
  imgPopupCaption.textContent = evt.target.alt;
}

// Функция смены аватара
function handleProfileForm(evt) {
  evt.preventDefault();
  const linkValue = profileLinkInput.value;
  showLoadingBtn(true, profileSaveButton);
  profileSaveButton.disabled = true;
  updateNewAvatar(linkValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileForm.reset();
      showLoadingBtn(false, profileSaveButton);
    });
}

// Функция удаления карточки
function deleteThisCard({ cardId, deleteButton }) {
  deleteMyCard(cardId)
    .then(() => {
      const deleteItem = deleteButton.closest(".places__item");
      deleteItem.remove();
      closeModal(deletePopup);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Функция подтверждения удаления карточки
function handleDeleteForm(evt) {
  evt.preventDefault();
  deleteThisCard(getCardForDeletion());
}

// Обработчики событий
profileEditButton.addEventListener("click", () => {
  openModal(editPopup);
  fillPopupEditInputs();
  clearValidation(editForm, validationConfig);
});

editForm.addEventListener("submit", handleEditForm);

const openAddButton = document.querySelector(".profile__add-button");
openAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
  addForm.reset();
  clearValidation(addForm, validationConfig);
});

addForm.addEventListener("submit", handleAddForm);

profileImageButton.addEventListener("click", () => {
  openModal(profilePopup);
  profileForm.reset();
  clearValidation(profileForm, validationConfig);
});

profileForm.addEventListener("submit", handleProfileForm);

// Универсальная функция для закрытия попапов
function setupCloseButtons() {
  const closeButtons = document.querySelectorAll(".popup__close"); // Общий селектор для всех кнопок закрытия
  closeButtons.forEach((button) => {
    const popup = button.closest(".popup"); // Находим соответствующий попап
    button.addEventListener("click", () => closeModal(popup));
  });
}

// Вызов функции для настройки обработчиков
setupCloseButtons();

deleteForm.addEventListener("submit", handleDeleteForm);

// Получение информации о пользователе и карточках
getInitialInfo();
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userList, initialCards]) => {
    profileTitle.textContent = userList.name;
    profileDescription.textContent = userList.about;
    profileId = userList._id;
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    fillCards(initialCards, profileId);
  })
  .catch((error) => {
    console.log(error);
  });

// Включение валидации
enableValidation(validationConfig);
// const cardTemplate = document.querySelector("#card-template").content;
// const placesList = document.querySelector(".places__list");

// /// Функция добавления карточки
// function addCard(
//   card,
//   placesList,
//   cardTemplate,
//   createCard,
//   likeCard,
//   showImgPopup,
//   openDeletePopup,
//   profileId
// ) {
//   const cardElement = createCard(
//     card,
//     cardTemplate,
//     likeCard,
//     showImgPopup,
//     openDeletePopup,
//     profileId
//   );
//   placesList.append(cardElement);
// }

// /// Функция заполнения страницы карточками
// function fillCards(initialCards, profileId) {
//   initialCards.forEach((card) => {
//     addCard(
//       card,
//       placesList,
//       cardTemplate,
//       createCard,
//       likeCard,
//       showImgPopup,
//       openDeletePopup,
//       profileId
//     );
//   });
// }

// /// Функция button loading пока данные загружаются
// const showLoadingBtn = (isLoading, button) => {
//   button.textContent = isLoading ? "Сохранение..." : "Сохранить";
// };

// /// Popup редактирования профиля
// const editPopup = document.querySelector(".popup_type_edit");
// const profileEditButton = document.querySelector(".profile__edit-button");
// const closeEditButton = editPopup.querySelector(".popup__close");
// const editForm = document.querySelector('form[name="edit-profile"]');
// const nameInput = editForm.querySelector(".popup__input_type_name");
// const jobInput = editForm.querySelector(".popup__input_type_description");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const editSaveButton = editPopup.querySelector(".popup__button");

// profileEditButton.addEventListener("click", () => {
//   openModal(editPopup);
//   fillPopupEditInputs();
//   clearValidation(editForm, validationConfig);
// });

// closeEditButton.addEventListener("click", () => {
//   closeModal(editPopup);
// });

// /// Функция сохранения полей ввода формы
// function fillPopupEditInputs() {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileDescription.textContent;
// }

// /// Функция редактирования профиля
// function handleEditForm(evt) {
//   evt.preventDefault();
//   const nameValue = nameInput.value;
//   const jobValue = jobInput.value;
//   showLoadingBtn(true, editPopup.querySelector(".popup__button"));
//   editSaveButton.disabled = true;
//   editProfile(nameValue, jobValue)
//     .then((res) => {
//       profileTitle.textContent = res.name;
//       profileDescription.textContent = res.about;
//       closeModal(editPopup);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => {
//       showLoadingBtn(false, editPopup.querySelector(".popup__button"));
//     });
// }

// editForm.addEventListener("submit", handleEditForm);

// /// Popup добавления карточек
// const addCardPopup = document.querySelector(".popup_type_new-card");
// const openAddButton = document.querySelector(".profile__add-button");
// const closeAddButton = addCardPopup.querySelector(".popup__close");
// const addForm = document.querySelector('form[name="new-place"]');
// const cardInput = addForm.querySelector(".popup__input_type_card-name");
// const linkInput = addForm.querySelector(".popup__input_type_url");
// const addSaveButton = addCardPopup.querySelector(".popup__button");

// openAddButton.addEventListener("click", () => {
//   openModal(addCardPopup);
//   addForm.reset();
//   clearValidation(addForm, validationConfig);
// });

// closeAddButton.addEventListener("click", () => {
//   closeModal(addCardPopup);
// });

// /// Функция загрузки с сервера и добавления карточек на страницу
// function handleAddForm(evt) {
//   evt.preventDefault();
//   const cardValue = cardInput.value;
//   const linkValue = linkInput.value;
//   showLoadingBtn(true, addForm.querySelector(".popup__button"));
//   addSaveButton.disabled = true;
//   postNewCard(cardValue, linkValue)
//     .then((card) => {
//       const newCard = createCard(
//         card,
//         cardTemplate,
//         likeCard,
//         showImgPopup,
//         openDeletePopup,
//         profileId
//       );
//       placesList.prepend(newCard);
//       closeModal(addCardPopup);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => {
//       addForm.reset();
//       showLoadingBtn(false, addForm.querySelector(".popup__button"));
//     });
// }

// addForm.addEventListener("submit", handleAddForm);

// /// Popup увеличение картинок
// const imgPopup = document.querySelector(".popup_type_image");
// const closePhotoButton = imgPopup.querySelector(".popup__close");
// const zoomedPopupImage = imgPopup.querySelector(".popup__image");
// const imgPopupCaption = imgPopup.querySelector(".popup__caption");

// closePhotoButton.addEventListener("click", () => {
//   closeModal(imgPopup);
// });

// /// Функция показа Popup увеличения картинок
// function showImgPopup(evt) {
//   openModal(imgPopup);
//   zoomedPopupImage.setAttribute("src", evt.target.src);
//   zoomedPopupImage.setAttribute("alt", evt.target.alt);
//   imgPopupCaption.textContent = evt.target.alt;
// }

// /// Popup редактирования аватара
// const profileImageButton = document.querySelector(".profile__image_cover");
// const profileImage = document.querySelector(".profile__image");
// const profilePopup = document.querySelector(".popup_type_avatar");
// const closeProfileButton = profilePopup.querySelector(".popup__close");
// const profileForm = document.forms["avatar_edit"];
// const profileLinkInput = profileForm.querySelector(".popup__input_type_url");
// const profileSaveButton = profilePopup.querySelector(".popup__button");

// profileImageButton.addEventListener("click", () => {
//   openModal(profilePopup);
//   profileForm.reset();
//   clearValidation(profileForm, validationConfig);
// });

// closeProfileButton.addEventListener("click", () => {
//   closeModal(profilePopup);
// });

// /// Функция смены аватара
// function handleProfileForm(evt) {
//   evt.preventDefault();
//   const linkValue = profileLinkInput.value;
//   profileImage.style.backgroundImage = linkValue;
//   showLoadingBtn(true, profilePopup.querySelector(".popup__button"));
//   profileSaveButton.disabled = true;
//   updateNewAvatar(linkValue)
//     .then((res) => {
//       profileImage.style.backgroundImage = `url('${res.avatar}')`;
//       closeModal(profilePopup);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => {
//       profileForm.reset();
//       showLoadingBtn(false, profileForm.querySelector(".popup__button"));
//     });
// }

// profileForm.addEventListener("submit", handleProfileForm);

// /// Popup удаления карточки с сервера
// const deletePopup = document.querySelector(".popup_type_delete");
// const closeDeleteButton = deletePopup.querySelector(".popup__close");
// const deleteForm = document.querySelector('form[name="delete-card"');

// const openDeletePopup = () => {
//   openModal(deletePopup);
// };

// const closeDeletePopup = () => {
//   closeModal(deletePopup);
// };

// closeDeleteButton.addEventListener("click", closeDeletePopup);

// /// Функция удаления карточки
// function deleteThisCard({ cardId, deleteButton }) {
//   deleteMyCard(cardId)
//     .then(() => {
//       const deleteItem = deleteButton.closest(".places__item");
//       deleteItem.remove();
//       closeDeletePopup();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// ///функция подтверждения удаления карточки
// function handleDeleteForm(evt) {
//   evt.preventDefault();
//   deleteThisCard(getCardForDeletion());
// }

// deleteForm.addEventListener("submit", handleDeleteForm);

// ///вызов функции получение информации о пользователе и карточках с сервера и заполнение ими страницы
// let profileId;

// getInitialInfo();
// Promise.all([getUserInfo(), getInitialCards()])
//   .then((array) => {
//     const [userList, initialCards] = array;
//     profileTitle.textContent = userList.name;
//     profileDescription.textContent = userList.about;
//     profileId = userList._id;
//     profileImage.style.backgroundImage = `url(${userList.avatar})`;
//     fillCards(initialCards, profileId);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// ///валидация
// enableValidation(validationConfig);