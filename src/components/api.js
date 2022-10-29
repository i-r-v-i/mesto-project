const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-16",
  headers: {
    authorization: "34adb4d1-3b9f-4221-8c5f-16ba80991dd4",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function getInitialCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function getInfoProfile() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function getInfoFromServer() {
  return Promise.all([getInitialCards(), getInfoProfile()]);
}

export function editProfile(data) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(checkResponse);
}

export function addCard(data) {
    return fetch(`${config.url}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
        }).then(checkResponse);
}

export function editAvatar(avatar) {
    return fetch(`${config.url}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(avatar),
    }).then(checkResponse);
  }

  export function deleteCard(cardId) {
    return fetch(`${config.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  }
  
//   fetch(`${config.url}/users/me`, {
//     headers: config.headers
//      })
//   .then((res) => {
//     return res.json();; // если всё хорошо, получили ответ
//   })
//   .then((data) => {
//     console.log(data);
//   })
