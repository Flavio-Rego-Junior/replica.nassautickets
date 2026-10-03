import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import Table from './Table';
import Button from './Button';
export default function PatientQueue({ patients, onCall }) {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('Todas');
  const [page, setPage] = useState(0);
  const filtered = patients.filter(p => `${p.name} ${p.ticket}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')) && (priority === 'Todas' || p.priority === priority));
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const activePage = Math.min(page, pages - 1);
  return <section className="panel"><div className="section-heading"><div><h2>Fila de atendimento <span className="count">{patients.length}</span></h2><p>Pacientes aguardando para serem chamados.</p></div></div><div className="table-toolbar"><div className="search-field"><Search size={17} /><input aria-label="Buscar paciente ou senha" placeholder="Buscar paciente ou senha" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} /></div><select aria-label="Filtrar por prioridade" value={priority} onChange={e => { setPriority(e.target.value); setPage(0); }}><option value="Todas">Todas as prioridades</option><option>Normal</option><option>Prioridade</option><option>Urgente</option></select></div><Table rows={filtered.slice(activePage * 6, activePage * 6 + 6)} label="Pacientes na fila de atendimento" actions={onCall ? row => <button className="table-action" aria-label={`Chamar ${row.name}, senha ${row.ticket}`} onClick={() => onCall(row)}><Volume2 size={15} /><span>Chamar</span></button> : undefined} /><div className="table-footer"><span>{filtered.length ? `${activePage * 6 + 1}–${Math.min(activePage * 6 + 6, filtered.length)} de ${filtered.length} pacientes` : '0 pacientes'}</span><div className="pagination"><Button variant="secondary" disabled={activePage === 0} onClick={() => setPage(activePage - 1)} aria-label="Página anterior"><ChevronLeft size={15} /></Button><span>{activePage + 1} / {pages}</span><Button variant="secondary" disabled={activePage + 1 >= pages} onClick={() => setPage(activePage + 1)} aria-label="Próxima página"><ChevronRight size={15} /></Button></div></div></section>;
}
