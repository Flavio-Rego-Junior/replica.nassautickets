export default function Button({ children, variant = 'primary', loading = false, className = '', ...props }) {
  return <button {...props} disabled={props.disabled || loading} aria-busy={loading} className={`button button-${variant} ${className}`}>
    {loading && <span className="spinner" aria-hidden="true" />}{children}
  </button>;
}
