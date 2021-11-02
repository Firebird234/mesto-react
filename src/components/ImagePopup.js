import React from 'react';

function ImagePopup(props) {
    return(
        <article className={`popup popup${props.card.name} ${props.card._id && 'popup_opened'}`}>
        <div className="popup__wrapper">
            <img className="popup__illustration" src={`${props.card.link}`} alt="Картинка места"/>
            <h2 className="popup__image-title">{props.card.name}</h2>
            <button className="popup__close popup__close_opened-image" onClick = {props.onClose} type="button"></button>
        </div>
        </article>
    )
}

export default ImagePopup;