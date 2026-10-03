import { Inbox } from 'lucide-react';
export default function EmptyState({ title = 'Nenhum paciente encontrado', description = 'Tente outro nome ou ajuste os filtros.' }) {
  return <div className="empty-state"><Inbox size={24} /><strong>{title}</strong><p>{description}</p></div>;
}
