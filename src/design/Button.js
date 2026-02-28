const buildButtonClassName = ({
    color,
    variant,
    size,
    fullwidth,
    rounded,
    loading,
    disabled,
    className,
}) => {
    const classes = ["button"]

    // Bulma colors: primary, link, info, success, warning, danger, light, dark, black, white, etc.
    if (color) classes.push(`is-${color}`)

    // Variants: outlined, light, inverted
    if (variant === "outlined") classes.push("is-outlined")
    if (variant === "light") classes.push("is-light")
    if (variant === "inverted") classes.push("is-inverted")

    // Sizes: small, normal (default), medium, large
    if (size && size !== "normal") classes.push(`is-${size}`)

    if (fullwidth) classes.push("is-fullwidth")
    if (rounded) classes.push("is-rounded")
    if (loading) classes.push("is-loading")

    // Bulma handles disabled styling via the disabled attribute, but adding class is fine too
    if (disabled) classes.push("is-static")

    if (className) classes.push(className)

    return classes.join(" ").trim()
}


/**
 * Button
 *
 * Props
 * - color: "primary" | "link" | "info" | "success" | "warning" | "danger" | etc.
 * - variant: "outlined" | "light" | "inverted" | undefined
 * - size: "small" | "normal" | "medium" | "large"
 * - fullwidth: boolean
 * - rounded: boolean
 * - loading: boolean
 * - disabled: boolean
 * - as: "button" | "a" | "span" (or any element)
 * - className: string
 */
export const Button = ({
    children,
    color,
    variant,
    size = "normal",
    fullwidth = false,
    rounded = false,
    loading = false,
    disabled = false,
    as: Component = "button",
    className = "",
    type = "button",
    ...rest
}) => {
    const computedClassName = buildButtonClassName({
        color,
        variant,
        size,
        fullwidth,
        rounded,
        loading,
        disabled,
        className,
    })

    // If rendering <button>, apply type/disabled
    if (Component === "button") {
        return (
            <button
                type={type}
                className={computedClassName}
                disabled={disabled || loading}
                {...rest}
            >
                {children}
            </button>
        )
    }

    // For links/other elements, avoid passing invalid props
    return (
        <Component className={computedClassName} {...rest}>
            {children}
        </Component>
    )
}