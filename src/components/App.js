import React from 'react';

import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Header from './Header';


function App() {
 

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    
    const [isOpened, setIsOpened] = React.useState(true);

    const [selectedCard, setSelectedCard] = React.useState({});


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


  return (
  

<div className="App">

    <Header/>

    <Main onEditProfile = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onEditAvatar = {handleEditAvatarClick} onImage = {handleCardClick}/>

    <PopupWithForm title = "Редактировать&nbsp;профиль" name = "edit" isOpen = {isEditProfilePopupOpen} onCloseAll = {closeAllPopups}
    children = {<>
            <input type="text" className="popup__field popup__field_type_name" placeholder="Жак-Ив-Кусто" name="name" id="name" required minLength="2" maxLength="40"/>
            <span className="error" id="name-error"></span>
            <input type="text" className="popup__field popup__field_type_job" placeholder="Исследователь океана" name="about" id="profession" required minLength="2" maxLength="200"/>
            <span className="error" id="profession-error"></span></>
        }/>


    <PopupWithForm title = "Новое&nbsp;место" name = "add" isOpen = {isAddPlacePopupOpen} onCloseAll = {closeAllPopups}
    children = {<>
            <input type="text" className="popup__field popup__field_type_place" placeholder="Название" name="name" id="place" minLength="2" maxLength="30" required/>
            <span className="error" id="place-error"></span>
            <input type="url" className="popup__field popup__field_type_link" placeholder="Ссылка на картинку" name="image-link" id="link" required/>
            <span className="error" id="link-error"></span></>}/>


    <PopupWithForm title = "Вы уверены?" name = "reset-avatar"
    children = {<>
 </>}/>


    <PopupWithForm title = "Обновить&nbsp;аватар" name = "card-removal" isOpen = {isEditAvatarPopupOpen} onCloseAll = {closeAllPopups}
    children = {<>
        <input type="url" className="popup__field popup__field_type_link" placeholder="Ссылка на аватар" name="link" id="ava-link" required/>
        <span className="error" id="ava-link-error"></span></>}/>


    <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>


    <Footer/>  

</div>
)
}

export default App;
