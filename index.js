//FORMVALIDATOR,INDEX


import './index.css'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { RemovalPopup } from "../components/RemovalPopup.js"

import { popupEditButton, closeEditButton, popupEditProfile, formEditElement, nameInput, jobInput, profileName, profileJob, popupAddButton,
  popupAdd, popupAddCardCloseButton, popupAddSubmitButton, placeInput, linkInput, formAdded, imageOpen, imageCloseButton, imagePopup,
  imagePopupIllustration, imagePopupTitle, elementsSection, initialCards, changeAvatarButton, avatar } from '../utils/constants.js'

  let userId;


const requestServerData = new Api('https://mesto.nomoreparties.co/v1/cohort-28/', {
  authorization: '7623580f-b1ba-482c-8170-fbcdd1434884',
  'Content-Type': 'application/json'
  } );
const editUserInfo = new UserInfo( {name: '.profile__title', job: '.profile__subtitle', avatar: '.profile__illustration'} );
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  requestServerData.sendUserData(data)
  .then((data) => {editUserInfo.setUserInfo(data);})
  .then((res) => { popupEdit.close();})
  .catch((res) => {console.log(err)})

});
const popupDeleteIcon = new RemovalPopup('.popup_card-removal', (cardId, kard) => {
  requestServerData.deleteCardRequest(cardId)
  .then(() => {popupDeleteIcon.close();
    kard.remove();
  })
});
popupDeleteIcon.setEventListeners();



function insertEditPopupData() {
  const data = editUserInfo.getUserInfo();
  console.log(data)
  nameInput.value = data.nameInput;
  jobInput.value = data.jobInput;
}


// const promis1 = requestServerData.getUserdata()
// .then((data) => {editUserInfo.setUserInfo(data);
// popupEdit.setEventListeners();
// avatar.src = data.avatar;
// const obj = data;
// popupEditButton.addEventListener('click', (data) => { popupEdit.open();
//                                                     insertEditPopupData(obj);
//                                                   })
// })

// const promis2 = requestServerData.getCards()
// .then((data) => {
//   console.log(data);
//     cardsSection = new Section({ items: data, renderer: (item) => {
//     const cardElement = createCard(item.name, item.link, item.likes, item._id, item.owner._id);
//       console.log(cardElement)
//     if (item.owner.name !==  document.querySelector('.profile__title').textContent) {

//       cardElement.querySelector('.elements__delete').classList.add('elements__delete_hidden');
//     }
//     cardsSection.addItem(cardElement);
//   } 
//   }, elementsSection);
//   cardsSection.renderItems();
//   return cardsSection;
// })

const promis1 = requestServerData.getUserdata();

const promis2 = requestServerData.getCards();


Promise.all([promis1, promis2])
.then((data) => {
  const user = data[0];
  userId = data[0]._id;
  console.log(data);
  editUserInfo.setUserInfo(user);
  popupEdit.setEventListeners();
  editUserInfo.setUserAvatar(user.avatar);
const obj = user;
popupEditButton.addEventListener('click', (user) => { popupEdit.open();
                                                    insertEditPopupData();
                                                  })
return data;
})
.then((data) => {
  const cards = data[1];
    cardsSection = new Section({ items: cards, renderer: (item) => {
    const cardElement = createCard(item.name, item.link, item.likes, item._id, item.owner._id);
      console.log(cardElement)
    // if (item.owner.name !==  document.querySelector('.profile__title').textContent) {

    //   cardElement.querySelector('.elements__delete').classList.add('elements__delete_hidden');
    // }
    cardsSection.addItem(cardElement);
  } 
  }, elementsSection);
  cardsSection.renderItems();
  return cardsSection;
})
.catch((err) => {console.log(err)})


const imageCardPopup = new PopupWithImage('.popup_press-image');
imageCardPopup.setEventListeners();



function createCard(name, link, likes, cardId, ownerId) {

   const card = new Card(
    name,
    link,
    likes,
    '#template__cards',
    { 
      handleCardClick: (name, link) => imageCardPopup.open(name, link),
      deleteCardPopup: (cardId, kard) => popupDeleteIcon.open(cardId, kard),

      pressLikeRequest: (cardId) => {
        if( likes.some((el) => {return el._id === userId})) {
            requestServerData.deleteLikeRequest(cardId)
              .then((data) => {
                card.pressDislike(data);
                console.log('dislike');
                likes = data.likes;
              })
              .catch(() => {console.log(err)})
          
        } else {
          requestServerData.pressLikeRequest(cardId)
          .then((data) => {
            console.log('like');
            card.pressLike(data);
            likes = data.likes;
          })
          .catch(() => {console.log(err)})

        }
      },
    },
    cardId,
    ownerId,
    userId
    );

   const cardElement = card.generateCard();
   return cardElement;
}



popupAddButton.addEventListener('click', () => {
 popupWithFromClass.open();
});


let cardsSection = {};





console.log( document.querySelector('.profile__title').textContent);


const popupWithFromClass = new PopupWithForm(
  '.popup_add',
  (data) => {
popupWithFromClass.renderLoading(true, 'Сохранение', 'Создать');
requestServerData.sendUserCard(data)
  .then((data) => {
    popupWithFromClass.close();
    const cardElement = createCard(data.name, data.link, data.likes, data._id, data.owner._id);
    cardsSection.addItem(cardElement);
  })
  .finally(() => {popupWithFromClass.renderLoading(false, 'Сохранение', 'Создать');})
  }
  );
  popupWithFromClass.setEventListeners()


const popupAvatarReset = new PopupWithForm(
  '.popup_reset-avatar',
  (inputData) => {
  popupAvatarReset.renderLoading(true, 'Сохранение', 'Сохранить');
  requestServerData.changeAvatarRequest(inputData)
  .then((data) => {
    // avatar.src = data.avatar;
    const link = data.avatar;
    editUserInfo.setUserAvatar(link);
    console.log(data);
    popupAvatarReset.close();
  })
  .finally(() => {popupAvatarReset.renderLoading(false, 'Сохранение', 'Сохранить');
})
  }
  );
  popupAvatarReset.setEventListeners()

  changeAvatarButton.addEventListener('click', () => {
    popupAvatarReset.open();
  })

  


Array.from(document.querySelectorAll('.form')).forEach((formEl) => {
  const dataObj = {
      formSelector: '.form',
      inputSelector: '.popup__field',
      submitButtonSelector: '.popup__submit',
      inactiveButtonClass: 'submit-invalid',
      inputInvalid : '.popup__field_invalid'
    }

  const form = new FormValidator(dataObj, formEl)
  form.enableValidation();
})

console.log('abobus');

