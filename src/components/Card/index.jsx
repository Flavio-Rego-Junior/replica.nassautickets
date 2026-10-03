export default function Card({ title, value, detail, icon: Icon, children, className = '' }) {
  return <section className={`card ${className}`}><div className="card-label">{title}{Icon && <Icon size={18} aria-hidden="true" />}</div>
    {value && <div className="card-value">{value}</div>}{detail && <div className="card-detail">{detail}</div>}{children}</section>;
}
