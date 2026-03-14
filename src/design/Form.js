// Form.js
//
// A reusable form wrapper that standardizes spacing and layout.
//
// Props:
// - children: (ReactNode) Required. The form contents (FormField, FormTextarea, Button, etc.)
// - onSubmit: (function) Optional. Handler for form submission.
// - className: (string) Optional. Additional CSS classes.
// - boxed: (boolean) Optional. If true, wraps the form in a Bulma "box".
// - centered: (boolean) Optional. Centers the form horizontally.
// - style: (object) Optional. Inline styles.
//
// Notes:
// - This component wraps a native <form> element.
// - It does NOT use react-router-dom's Form intentionally.
// - It supports all standard form props via ...rest.

export const Form = ({
    children,
    onSubmit,
    className = "",
    boxed = false,
    centered = false,
    style,
    ...rest
}) => {

    // Optional wrapper classes
    const wrapperClasses = [
        boxed ? "box" : "",
        centered ? "is-flex is-justify-content-center" : "",
    ].join(" ").trim()

    // The actual form element
    const formElement = (
        <form
            onSubmit={onSubmit}
            className={className}
            style={style}
            {...rest}
        >
            {children}
        </form>
    )

    // Wrap in box if requested
    if (boxed || centered) {
        return (
            <div className={wrapperClasses}>
                {formElement}
            </div>
        )
    }

    return formElement
}

export const FormActions = ({ children, centered = false }) => (
    <div className={`buttons ${centered ? "is-centered" : ""}`}>
        {children}
    </div>
)