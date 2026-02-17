import "../css/ErrorModal.css";

const ErrorModal = ({ message, onClose }) => {

    if (!message) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalBox" onClick={(e) => e.stopPropagation()}>

                <h3 className="modalTitle">Error !!</h3>

                <p className="modalMessage">{message}</p>

                <button className="modalButton" onClick={onClose}>
                    Exit
                </button>

            </div>
        </div>
    );
};

export default ErrorModal;
