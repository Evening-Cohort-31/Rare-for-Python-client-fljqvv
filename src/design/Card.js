// Card.js
// A reusable Bulma Card wrapper.
//
// Props:
// - title: (string | ReactNode) Optional. If provided, renders the Bulma card header title.
// - headerRight: (ReactNode) Optional. Renders right-aligned header content (icons/buttons).
// - children: (ReactNode) Required. Main body content of the card.
// - footer: (ReactNode) Optional. Renders Bulma card-footer content (usually links/buttons).

export const Card = ({
  title,
  headerRight,
  children,
  footer,
  className = "",
  ...props
}) => {
  return (
    <div className={`card rare-card ${className}`} {...props}>
      {(title || headerRight) && (
        <header className="card-header">
          {title && (
            <p className="card-header-title">
              {title}
            </p>
          )}

          {headerRight && (
            <div className="card-header-icon">
              {headerRight}
            </div>
          )}
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