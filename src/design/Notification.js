export const Notification = ({ type = "info", message, onClose }) => {
  return (
    <div className={`notification is-${type}`}>
      {onClose && <button className="delete" onClick={onClose}></button>}
      {message}
    </div>
  )
}
