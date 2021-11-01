import React from 'react';

class PopupWithForm extends React.Component {

constructor(props) {
    super(props);

}

render() {
    return(
        <article className={`popup popup_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <h2 className="popup__title">{this.props.title}</h2>
            <form className={`form form_${this.props.name}`} name={`${this.props.name}`} id={`form_${this.props.name}ID`}>
                {this.props.children}
                <button type="submit" className="popup__submit">Сохранить</button>
            </form>
            <button className={`popup__close popup${this.props.name}`} type="button" onClick = {this.props.onCloseAll}></button>
        </div>
    </article>
    )
    }

}

export default PopupWithForm;