export const FormTextarea = ({ label, placeholder = "", inputRef, children }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {children || (
          <textarea
            className="textarea"
            placeholder={placeholder}
            ref={inputRef}
          />
        )}
      </div>
    </div>
  )
}
