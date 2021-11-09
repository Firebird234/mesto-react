export class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserdata() {
        return fetch(`${this._baseUrl}users/me`, {
                method: 'GET',
                headers: this._headers
        })
        .then(this._checkResponse);

    }

    getCards() {
        return fetch(`${this._baseUrl}cards`, {
                method: 'GET',
                headers: this._headers
        })
        .then(this._checkResponse);
    }

    sendUserData(data) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: data.name,
              about: data.about
            })
          })
          .then(this._checkResponse);
    
    }

    sendUserCard(data) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name: data.name,
              link: data.link
            })
          })
          .then(this._checkResponse);
    }

    //ЭТО ТЕСТЕР
    //     sendUserCard() {
    //     return fetch(`${this._baseUrl}cards`, {
    //         method: 'POST',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //           name: 'EMPERROR GUIDES',
    //           link: 'https://yobte.ru/uploads/posts/2019-11/warhammer-40000-55-foto-39.jpg'
    //         })
    //       })
    //       .then(this._checkResponse);
    // }

    deleteCardRequest(cardId) {
      return fetch(`${this._baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);

    }


    pressLikeRequest(cardId) {
      return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse);

    }

    deleteLikeRequest(cardId) {

      return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);

    }


    changeAvatarRequest(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data,
        })
      })
      .then(this._checkResponse);

    }




    changeLikeCardStatus(cardId, isLiked) {
      if (isLiked) {
      return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then((res) => {console.log(res); return res})
      .then(this._checkResponse);}
      else {return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => {console.log(res); return res})
      .then(this._checkResponse);
    }

    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
    }
    }


    const sendRequest = new Api('https://mesto.nomoreparties.co/v1/cohort-28/', {
      authorization: '7623580f-b1ba-482c-8170-fbcdd1434884',
      'Content-Type': 'application/json'
      } );

      export default sendRequest;


      // sendRequest.sendUserCard();
      // sendRequest.sendUserCard();
      // sendRequest.sendUserCard();
      // sendRequest.sendUserCard();

    
