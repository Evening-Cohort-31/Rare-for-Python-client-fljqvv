export const FormSelect = ({
  label,
  name,
  value,
  onChange,
  children,
  className = "is-fullwidth",
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="control">
        <div className={`select ${className}`.trim()}>
          <select id={name} name={name} value={value} onChange={onChange}>
            {children}
          </select>
        </div>
      </div>
    </div>
  )
}