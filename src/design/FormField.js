export const FormField = ({ label, type = "text", placeholder = "", inputRef, children }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {children || (
          <input
            className="input"
            type={type}
            placeholder={placeholder}
            ref={inputRef}
          />
        )}
      </div>
    </div>
  )
}
