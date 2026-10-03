export default function Input({ label, id, error, hint, required, ...props }) {
  return <div className="field"><label htmlFor={id}>{label}{required && <span className="required"> *</span>}</label>
    <input id={id} required={required} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-help` : undefined} {...props} />
    {(error || hint) && <span id={`${id}-help`} className={error ? 'field-error' : 'field-hint'}>{error || hint}</span>}</div>;
}
