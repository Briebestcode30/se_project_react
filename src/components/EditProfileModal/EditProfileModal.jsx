import { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        />

        <h2 className="modal__title">Edit Profile</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal__input"
              required
            />
          </label>

          <label className="modal__label">
            Avatar URL
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="modal__input"
              required
            />
          </label>

          <button type="submit" className="modal__submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
