import React from "react";
import PopupWithForm from "./PopupWithForm";
import {
    CurrentUserContext,
    currentUser,
} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [inputName, setName] = React.useState({ name: "", description: "" });

    React.useEffect(() => {
        setName({
            ...inputName,
            name: currentUser.name,
            description: currentUser.about,
        });
    }, [currentUser]);

    React.useEffect(() => {
        document.addEventListener("keydown", props.handleEsc);

        return () => {
            document.removeEventListener("keydown", props.handleEsc);
        };
    }, []);

    const handleChange = (event) => {
        setName({ ...inputName, [event.target.name]: event.target.value });
        props.handleValidity(event.target);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: inputName.name,
            about: inputName.description,
        });
        props.onClose();
    }

    return (
        <PopupWithForm
            validButton={props.validity.isValid}
            loader={props.loader}
            onSubmit={handleSubmit}
            title="Редактировать&nbsp;профиль"
            name="edit"
            isOpen={props.isOpen}
            onCloseAll={props.onClose}
            children={
                <>
                    <input
                        type="text"
                        value={inputName.name}
                        onChange={handleChange}
                        className="popup__field popup__field_type_name"
                        placeholder="Жак-Ив-Кусто"
                        name="name"
                        id="name"
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span className="error" id="name-error">
                        {props.validity.message.name}
                    </span>
                    <input
                        type="text"
                        value={inputName.description}
                        onChange={handleChange}
                        className="popup__field popup__field_type_job"
                        name="description"
                        placeholder="Исследователь океана"
                        id="profession"
                        required
                        minLength="2"
                        maxLength="200"
                    />
                    <span className="error" id="profession-error">
                        {props.validity.message.description}
                    </span>
                </>
            }
        />
    );
}

export default EditProfilePopup;
