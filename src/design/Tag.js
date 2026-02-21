// Tag.js
//
// A reusable Bulma tag component.
//
// Props:
// - children: (ReactNode) Required. The tag content.
// - color: (string) Optional Bulma color: "primary", "info", "success", etc.
// - light: (boolean) Optional. Applies lighter color style.
// - rounded: (boolean) Optional. Applies rounded styling.
// - className: (string) Optional additional classes.

export const Tag = ({
    children,
    color,
    light = false,
    rounded = false,
    className = "",
    ...rest
}) => {
    const classes = [
        "tag",
        color ? `is-${color}` : "",
        light ? "is-light" : "",
        rounded ? "is-rounded" : "",
        className,
    ]
        .join(" ")
        .trim()

    return (
        <span className={classes} {...rest}>
            {children}
        </span>
    )
}