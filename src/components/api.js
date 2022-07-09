const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "a434af12-b8a8-4663-bb3a-17a3b7d3cfa8",
    "Content-Type": "application/json",
  },
};
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

//функция, которая осуществляет доставку запроса о карточках
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};
//функция, которая осуществляет доставку запроса о данных пользователя
export function getInfoProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
// функция, которая получает данные о крточках и пользователе сразу

export function getAllInfo() {
  return Promise.all([getInitialCards(), getInfoProfile()]);
}

export function addCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function editProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatar),
  }).then(checkResponse);
}

export function changeLike(cardId, islike) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: islike ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(checkResponse);
}
