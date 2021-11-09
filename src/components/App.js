import React from 'react';


import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';

import {CurrentUserContext, currentUser} from '../contexts/CurrentUserContext'


function App() {
 

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    
    const [isOpened, setIsOpened] = React.useState(true);

    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setCurrentUser ] = React.useState({});

    const [cards, setCards] = React.useState([]);
    console.log(cards)

    React.useEffect(() => {
        Api.getUserdata()
        .then((data) => {setCurrentUser(data)
        console.log(data)})
        .catch((err) => {console.log(err)})
    }, [])


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(cardData) {
        setSelectedCard(cardData);
    }


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    function handleEsc(event) {
       if (event.key === `Escape`) {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});}
    }


    function handleUpdateUser(data) {
        Api.sendUserData(data).then((data) => {setCurrentUser(data)})
    }

    function handleUpdatAvatar(data) {
        Api.changeAvatarRequest(data.avatar).then((data) => {setCurrentUser(data);})
    }
    

    function handleAddPlaceSubmit(data) {
        Api.sendUserCard(data).then((data) => {setCards([data,...cards])})
    }

//CARDS


    React.useEffect(() => {
        Api.getCards()
        .then((items) => {
            setCards(items)
        })
        .catch((err) => {console.log(err)})
    },[])


    function handleCardLike(card) {
        //Снова проверяем, есть ли уже лайк на этой карточке
         console.log(card)
        const isLiked = card.likes.some((i) => {return i._id === currentUser._id});
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            console.log(newCard)
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        });
     }

     function handleDeleteClick(card) {
      
        Api.deleteCardRequest(card._id).then((newCard) => {
            console.log(newCard)
            setCards((cards) => cards.filter((c) => c !== card));
        });
     }





  return (
<CurrentUserContext.Provider value = {currentUser}>

<div className="App" onKeyDown = {handleEsc}>

    <Header/>

    <Main currentUser = {currentUser} onEditProfile = {handleEditProfileClick} 
    onAddPlace = {handleAddPlaceClick} onEditAvatar = {handleEditAvatarClick} onImage = {handleCardClick}
    cards = {cards} onCardLike = {handleCardLike} onCardDelete = {handleDeleteClick}/>
        
    <EditProfilePopup onUpdateUser = {handleUpdateUser} isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups}/>

    <EditAvatarPopup onUpdateUser = {handleUpdatAvatar} isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups}/>

    <AddPlacePopup onAddCard = {handleAddPlaceSubmit} isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups}/>


    <PopupWithForm title = "Вы уверены?" name = "reset-avatar"
    children = {<>
 </>}/>

    <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>


    <Footer/>  

    </div>

</CurrentUserContext.Provider>


)
}

export default App;
