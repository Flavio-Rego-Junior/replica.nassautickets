export default function Select({ label, id, options, required, error, ...props }) {
  return <div className="field"><label htmlFor={id}>{label}{required && <span className="required"> *</span>}</label><select id={id} required={required} aria-invalid={!!error} aria-describedby={error ? `${id}-help` : undefined} {...props}>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error && <span id={`${id}-help`} className="field-error">{error}</span>}</div>;
}
