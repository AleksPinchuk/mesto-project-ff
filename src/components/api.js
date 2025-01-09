export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-29",
  headers: {
    authorization: "2d4d1ed6-fd2e-4fa0-bb7c-3a6168aa5bfd",
    "Content-Type": "application/json",
  },
};

export const getResData = async (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Error: ${res.status}`);
};

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, { headers: config.headers, ...options });
  return getResData(response);
};

// Загрузка информации о пользователе с сервера
export const getUserInfo = () => fetchData(`${config.baseUrl}/users/me`);

// Загрузка карточек с сервера
export const getInitialCards = () => fetchData(`${config.baseUrl}/cards`);

// Загрузка всей начальной информации
export const getInitialInfo = () => Promise.all([getUserInfo(), getInitialCards()]);

// Редактирование профиля
export const editProfile = (userProfileName, userProfileAbout) =>
  fetchData(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: userProfileName,
      about: userProfileAbout,
    }),
  });

// Добавление новой карточки
export const postNewCard = (nameCard, linkCard) =>
  fetchData(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  });

// Добавление лайка
export const putLike = (cardId) =>
  fetchData(`${config.baseUrl}/cards/likes/${cardId}`, { method: "PUT" });

// Удаление лайка
export const deleteLike = (cardId) =>
  fetchData(`${config.baseUrl}/cards/likes/${cardId}`, { method: "DELETE" });

// Удаление карточки
export const deleteMyCard = (cardId) =>
  fetchData(`${config.baseUrl}/cards/${cardId}`, { method: "DELETE" });

// Обновление аватара
export const updateNewAvatar = (avatarLink) =>
  fetchData(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarLink }),
  });