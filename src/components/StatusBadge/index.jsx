import { ESTADOS } from '../../constants/senha';
const styles = { EMITIDA: 'waiting', AGUARDANDO: 'waiting', CHAMADA: 'called', CHAMADA_NOVAMENTE: 'called', EM_ATENDIMENTO: 'progress', ATENDIDA: 'done', NAO_COMPARECEU: 'waiting' };
export default function StatusBadge({ value }) { return <span className={`badge status-${styles[value] || 'waiting'}`}><span className="status-dot" />{ESTADOS[value] || value}</span>; }
