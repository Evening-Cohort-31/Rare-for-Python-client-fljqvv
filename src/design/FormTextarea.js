// FormTextarea.js
// Bulma textarea wrapper that forwards value/onChange/etc.

export const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 4,
  className = "",
  ...rest
}) => {
  return (
    <div className="field">
      {label && <label className="label" htmlFor={name}>{label}</label>}

      <div className="control">
        <textarea
          id={name}
          name={name}
          className={`textarea ${className}`.trim()}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          {...rest}
        />
      </div>
    </div>
  )
}