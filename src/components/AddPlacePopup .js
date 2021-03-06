import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [inputName, setName] = React.useState({ addName: "", addLink: "" });

    function handleChange(e) {
        setName({ ...inputName, [e.target.name]: e.target.value });
        console.log(inputName);
        props.handleValidity(e.target);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        props.onAddCard(inputName);
        setName({ addName: "", addLink: "" });
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
                        name="addName"
                        id="place"
                        minLength="2"
                        maxLength="30"
                        required
                        value={inputName.addName}
                    />
                    <span className="error" id="place-error">
                        {props.validity.message.addName}
                    </span>
                    <input
                        type="url"
                        onChange={handleChange}
                        className="popup__field popup__field_type_link"
                        placeholder="Ссылка на картинку"
                        name="addLink"
                        id="link"
                        required
                        value={inputName.addLink}
                    />
                    <span className="error" id="link-error">
                        {props.validity.message.addLink}
                    </span>
                </>
            }
        />
    );
}

export default AddPlacePopup;
