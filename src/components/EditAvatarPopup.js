import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const inputData = React.useRef({});

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            avatar: inputData.current.value,
        });
        props.onClose();
        inputData.current.value = "";
    }

    return (
        <PopupWithForm
            loader={props.loader}
            onSubmit={handleSubmit}
            title="Обновить&nbsp;аватар"
            name="card-removal"
            isOpen={props.isOpen}
            onCloseAll={props.onClose}
            children={
                <>
                    <input
                        ref={inputData}
                        type="url"
                        className="popup__field popup__field_type_link"
                        placeholder="Ссылка на аватар"
                        name="link"
                        id="ava-link"
                        required
                    />
                    <span className="error" id="ava-link-error"></span>
                </>
            }
        />
    );
}

export default EditAvatarPopup;
