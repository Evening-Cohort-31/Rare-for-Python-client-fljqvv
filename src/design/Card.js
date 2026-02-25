// Card.js
// A reusable Bulma Card wrapper.
//
// Props:
// - title: (string | ReactNode) Optional. If provided, renders the Bulma card header title.
// - headerRight: (ReactNode) Optional. Renders right-aligned header content (icons/buttons).
// - children: (ReactNode) Required. Main body content of the card.
// - footer: (ReactNode) Optional. Renders Bulma card-footer content (usually links/buttons).

export const Card = ({ title, headerRight, children, footer }) => {
  return (
    <div className="card">
      {/* Header is shown if we have either a title or right-side header content */}
      {(title || headerRight) && (
        <header className="card-header">
          {/* Title appears on the left */}
          {title && (
            <p className="card-header-title">
              {title}
            </p>
          )}

          {/* headerRight appears on the far right (icons, action buttons, etc.) */}
          {headerRight && (
            <div className="card-header-icon">
              {headerRight}
            </div>
          )}
        </header>
      )}

      {/* Main card content */}
      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>

      {/* Optional footer area (commonly used for actions) */}
      {footer && (
        <footer className="card-footer">
          {footer}
        </footer>
      )}
    </div>
  )
}