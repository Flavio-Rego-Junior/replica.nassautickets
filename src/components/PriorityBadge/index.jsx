import { TIPOS } from '../../constants/senha';
const styles = { SP: 'amber', SG: 'neutral', SE: 'neutral' };
export default function PriorityBadge({ value }) { return <span className={`badge priority-${styles[value] || 'neutral'}`}>{TIPOS[value] ? `${value} · ${TIPOS[value]}` : value}</span>; }
