export const FormTextarea = ({ label, placeholder = "", inputRef }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          className="textarea"
          placeholder={placeholder}
          ref={inputRef}
        />
      </div>
    </div>
  )
}
