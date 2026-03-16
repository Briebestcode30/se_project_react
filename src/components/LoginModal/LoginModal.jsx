import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  setActiveModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleSwitchToRegister = () => {
    if (setActiveModal) {
      setActiveModal("register");
    } else {
      console.error("setActiveModal function not provided");
    }
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Login"
    >
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
        onClick={handleSwitchToRegister}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}
