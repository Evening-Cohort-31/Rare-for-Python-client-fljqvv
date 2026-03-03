// Tag.js
//
// A reusable Bulma tag component.
//
// Props:
// - children: (ReactNode) Required. The tag content.
// - color: (string) Optional Bulma color: "primary", "info", etc.
// - light: (boolean) Optional. Applies lighter color style.
// - rounded: (boolean) Optional. Applies rounded styling.
// - className: (string) Optional additional classes.
// - onClick: (function) Optional. Makes tag interactive.
// - disabled: (boolean) Optional. Disables interaction.

export const Tag = ({
    children,
    color,
    light = false,
    rounded = false,
    className = "",
    onClick,
    disabled = false,
    ...rest
}) => {
    const isInteractive = typeof onClick === "function"

    const classes = [
        "tag",
        color ? `is-${color}` : "",
        light ? "is-light" : "",
        rounded ? "is-rounded" : "",
        isInteractive ? "is-clickable" : "",
        disabled ? "is-static" : "",
        className,
    ]
        .join(" ")
        .trim()

    // If interactive → render button for accessibility
    if (isInteractive) {
        return (
            <button
                type="button"
                className={classes}
                onClick={disabled ? undefined : onClick}
                disabled={disabled}
                style={{ border: "none" }}
                {...rest}
            >
                {children}
            </button>
        )
    }

    // Otherwise render normal tag
    return (
        <span className={classes} {...rest}>
            {children}
        </span>
    )
}