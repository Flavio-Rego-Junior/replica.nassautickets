const styles = { Normal: 'neutral', Prioridade: 'amber', Urgente: 'red' };
export default function PriorityBadge({ value }) { return <span className={`badge priority-${styles[value] || 'neutral'}`}>{value}</span>; }
