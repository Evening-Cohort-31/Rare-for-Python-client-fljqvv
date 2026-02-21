export const Card = ({ title, children, footer }) => {
  return (
    <div className="card">
      {title && (
        <header className="card-header">
          <p className="card-header-title">{title}</p>
        </header>
      )}
      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>
      {footer && (
        <footer className="card-footer">
          {footer}
        </footer>
      )}
    </div>
  )
}
