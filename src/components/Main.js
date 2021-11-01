import React from 'react';
import changeIcon from '../images/Vector.png';
import avatar from '../images/Avatar.png';
import Api from '../utils/Api';
import Card from './Card'

function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescriptio, setUserDescriptio] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Api.getUserdata()
        .then((data) => {
            setUserName(data.name);
            setUserDescriptio(data.about);
            setUserAvatar(data.avatar);
})
        .catch((err) => {console.log(err)})
    },[])

    React.useEffect(() => {
        Api.getCards()
        .then((items) => {
            setCards(items)
        })
        .catch((err) => {console.log(err)})
    },[])
    
    return(
        <main className="content">
  
        <section className="profile">
            <div className="profile__info-wrapper">
                <div className="profile__illustration-wrapper">
                    <div className="profile__illustration-overlay"></div>
                    <img className="profile__illustration-redact" alt="Изменить аватар" src={changeIcon} onClick = {props.onEditAvatar}/>
                </div>
                    <img className="profile__illustration" alt="Аватар пользователя" src={userAvatar}/>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick = {props.onEditProfile}></button>
                    <p className="profile__subtitle">{userDescriptio}</p>
                </div>
            </div>
            <button className="profile__add-button" type="button" onClick = {props.onAddPlace}></button>
        
        </section>
        
        
        <section className="elements">
            {cards.map((el,ind) => {
                return (<Card card = {el} onImage = {props.onImage}  key = {el._id}/>)
            })}
        
        </section>
        
        </main>
    );
}

export default Main;