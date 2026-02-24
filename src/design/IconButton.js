// IconButton.js
// Small Bulma-style icon-only button, used for compact actions (edit/delete/etc).
//
// Props:
// - icon: (string) Font Awesome icon name without the `fa-` prefix. Example: "gear", "trash".
// - title: (string) Tooltip text (also helpful for accessibility).
// - onClick: (function) Click handler (can be empty for "dead" buttons).
// - color: (string) Optional Bulma color class: "info", "danger", etc.
// - className: (string) Optional additional classes.

export const IconButton = ({
    icon,
    title = "",
    onClick = () => { },
    color,
    className = "",
    ...rest
}) => {
    const colorClass = color ? `is-${color}` : ""

    return (
        <button
            type="button"
            className={`button is-small ${colorClass} ${className}`.trim()}
            title={title}
            aria-label={title}
            onClick={onClick}
            {...rest}
        >
            <span className="icon is-small">
                <i className={`fas fa-${icon}`} aria-hidden="true"></i>
            </span>
        </button>
    )
}