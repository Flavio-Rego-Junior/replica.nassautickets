const styles = { Aguardando: 'waiting', Chamado: 'called', 'Em atendimento': 'progress', Finalizado: 'done' };
export default function StatusBadge({ value }) { return <span className={`badge status-${styles[value] || 'waiting'}`}><span className="status-dot" />{value}</span>; }
