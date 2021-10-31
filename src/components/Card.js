import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.cards)
    }

    handleClick = () => {
        this.props.onImage(this.props.card);
      }  

    render() {
        return(
                    <article className="elements__item">
                        {/* {console.log(el)} */}
                        <img className="elements__illustration" src={this.props.card.link} alt="Иллюстрация к карточке" onClick = {this.handleClick}/>
                        <div className="elements__info">
                            <h2 className="elements__title">{this.props.card.name}</h2>
                            <div className="elements__info-container">
                            <button className="elements__like" type="button"></button>
                            <span className="elements__like-count">{this.props.card.likes.length}</span>
                            </div>
                        </div>
                        <button className="elements__delete"></button>
                    </article>
                )

        
    }
}

export default Card;