import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [inputName, setName] = React.useState({ name: "", link: "" });

    function handleChange(e) {
        setName({ ...inputName, [e.target.name]: e.target.value });
        console.log(inputName);
    }
    console.log(inputName);

    function handleSubmit(e) {
        e.preventDefault(e);
        props.onAddCard(inputName);
        props.onClose();
        setName({ name: "", link: "" });
    }

    return (
        <PopupWithForm
            loader={props.loader}
            onSubmit={handleSubmit}
            title="Новое&nbsp;место"
            name="add"
            isOpen={props.isOpen}
            onCloseAll={props.onClose}
            children={
                <>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="popup__field popup__field_type_place"
                        placeholder="Название"
                        name="name"
                        id="place"
                        minLength="2"
                        maxLength="30"
                        required
                        value={inputName.name}
                    />
                    <span className="error" id="place-error"></span>
                    <input
                        type="url"
                        onChange={handleChange}
                        className="popup__field popup__field_type_link"
                        placeholder="Ссылка на картинку"
                        name="link"
                        id="link"
                        required
                        value={inputName.link}
                    />
                    <span className="error" id="link-error"></span>
                </>
            }
        />
    );
}

export default AddPlacePopup;
