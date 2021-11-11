import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [inputName, setName] = React.useState({ name: "", link: "" });

    function handleChange(e) {
        setName({ ...inputName, [e.target.name]: e.target.value });
        console.log(inputName);
        props.handleValidity(e.target);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        props.onAddCard(inputName);
        setName({ name: "", link: "" });
    }

    React.useEffect(() => {
        document.addEventListener("keydown", props.handleEsc);

        return () => {
            document.removeEventListener("keydown", props.handleEsc);
        };
    }, []);

    return (
        <PopupWithForm
            validButton={props.validity.isValid}
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
                    <span className="error" id="place-error">
                        {props.validity.message.name}
                    </span>
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
                    <span className="error" id="link-error">
                        {props.validity.message.link}
                    </span>
                </>
            }
        />
    );
}

export default AddPlacePopup;
