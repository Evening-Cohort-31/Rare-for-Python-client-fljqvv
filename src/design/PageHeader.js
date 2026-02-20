export const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="hero is-small is-link mb-5">
      <div className="hero-body">
        <p className="title">{title}</p>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
