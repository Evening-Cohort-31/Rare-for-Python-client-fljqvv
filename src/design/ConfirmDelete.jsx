export const ConfirmDelete = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onCancel} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={onCancel} />
                </header>
                <section className="modal-card-body">
                    <p>{message}</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={onConfirm}>Yes, Delete</button>
                    <button className="button" onClick={onCancel}>Cancel</button>
                </footer>
            </div>
        </div>
    );  
}