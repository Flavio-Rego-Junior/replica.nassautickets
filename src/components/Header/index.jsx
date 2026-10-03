import { Menu, ChevronRight } from 'lucide-react';
export default function Header({ page, onMenu }) {
  return <header className="header"><div className="breadcrumb"><button className="menu-toggle icon-button" onClick={onMenu} aria-label="Abrir menu"><Menu size={21} /></button><span>Recepção</span><ChevronRight size={14} /><strong>{page === 'atendimento' ? 'Atendimento' : 'Emissão de senha'}</strong></div><div className="header-user"><span className="avatar">RC</span><div><strong>Recepção</strong><span>Unidade Nassau</span></div></div></header>;
}
