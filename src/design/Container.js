export const Container = ({ children, size }) => {
  const sizeClass = size ? `is-${size}` : ""

  return (
    <div className={`container ${sizeClass}`.trim()}>
      {children}
    </div>
  )
}
