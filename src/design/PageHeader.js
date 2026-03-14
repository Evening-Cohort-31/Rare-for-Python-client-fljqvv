export const PageHeader = ({ title, subtitle, centered }) => {
  return (
    <section className="hero is-small is-link mb-5">
      <div className={`hero-body${centered ? " has-text-centered" : ""}`}>
        <p className="title">{title}</p>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
