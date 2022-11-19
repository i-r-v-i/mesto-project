export class Api {
  constructor({url, token}) {
    this._url = url;
    this._headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }
  _checkResponse(res) {
    return res.ok
        ? res.json()
        : Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLike(isLike, cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}