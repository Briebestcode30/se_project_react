import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  setActiveModal,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>

      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
          required
        />
      </label>

      <button
        type="button"
        className="modal__switch-btn"
        onClick={handleSwitchToLogin}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}
