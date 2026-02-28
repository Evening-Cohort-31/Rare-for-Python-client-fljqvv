// Typography.js

// Title component
export const Title = ({ children, size = 1, className = "" }) => {
    return (
        <h1 className={`title is-${size} ${className}`.trim()}>
            {children}
        </h1>
    )
}


// Subtitle component
export const Subtitle = ({ children, size = 4, className = "" }) => {
    return (
        <h2 className={`subtitle is-${size} ${className}`.trim()}>
            {children}
        </h2>
    )
}


// Paragraph component
export const Text = ({ children, className = "" }) => {
    return (
        <p className={className}>
            {children}
        </p>
    )
}


// Muted / gray text (for dates, metadata, etc.)
export const MutedText = ({ children, className = "" }) => {
    return (
        <p className={`has-text-grey ${className}`.trim()}>
            {children}
        </p>
    )
}


// Small text
export const SmallText = ({ children, className = "" }) => {
    return (
        <small className={className}>
            {children}
        </small>
    )
}


// Content wrapper (Bulma content styling)
export const Content = ({ children, className = "" }) => {
    return (
        <div className={`content ${className}`.trim()}>
            {children}
        </div>
    )
}


// Label text (useful outside of FormField)
export const Label = ({ children, className = "" }) => {
    return (
        <label className={`label ${className}`.trim()}>
            {children}
        </label>
    )
}


// Inline span text (useful for badges, inline metadata)
export const Span = ({ children, className = "" }) => {
    return (
        <span className={className}>
            {children}
        </span>
    )
}