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

    const handleChange = (event) => {
        setName({ ...inputName, [event.target.name]: event.target.value });
        console.log(inputName);
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
                    <span className="error" id="name-error"></span>
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
                    <span className="error" id="profession-error"></span>
                </>
            }
        />
    );
}

export default EditProfilePopup;
