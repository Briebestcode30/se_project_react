import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "Save",
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  // Don't render the modal if it's not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        {/* Close button with CSS background icon */}
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />

        <form onSubmit={onSubmit} className="modal__form">
          {children}

          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
