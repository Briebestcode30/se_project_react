import { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="modal__input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="url"
        name="avatar"
        className="modal__input"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />

      <input
        type="email"
        name="email"
        className="modal__input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        name="password"
        className="modal__input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

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
