import "../css/ErrorModal.css"; // Reutiliza los estilos del modalError

const SuccessModal = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalBox" onClick={(e) => e.stopPropagation()}>
                
                <h3 className="modalTitle" style={{ color: "green" }}>¡Éxito!</h3>
                
                <p className="modalMessage">{message}</p>
                
                <button className="modalButton" onClick={onClose}>
                    Cerrar
                </button>

            </div>
        </div>
    );
};

export default SuccessModal;
