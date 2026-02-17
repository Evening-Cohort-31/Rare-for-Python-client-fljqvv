export const FormSelect = ({ label, selectRef, children }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select ref={selectRef}>
            {children}
          </select>
        </div>
      </div>
    </div>
  )
}
