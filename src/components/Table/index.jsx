import EmptyState from '../EmptyState';
import PriorityBadge from '../PriorityBadge';
import StatusBadge from '../StatusBadge';
export default function Table({ rows, label, actions, history = false }) {
  if (!rows.length) return <EmptyState />;
  return <div className="table-scroll" tabIndex={0} role="region" aria-label={label}><table><caption className="sr-only">{label}</caption><thead><tr><th>Senha</th><th>Paciente</th><th>Tipo de atendimento</th><th>Prioridade</th><th>{history ? 'Horário' : 'Entrada'}</th><th>Status</th>{actions && <th className="action-heading">Ações</th>}</tr></thead>
    <tbody>{rows.map(row => <tr key={row.ticket}><td className="ticket-cell">{row.ticket}</td><td className="patient-cell">{row.name}</td><td>{row.type}</td><td><PriorityBadge value={row.priority} /></td><td className="time-cell">{row.time}</td><td><StatusBadge value={row.status} /></td>{actions && <td>{actions(row)}</td>}</tr>)}</tbody></table></div>;
}
