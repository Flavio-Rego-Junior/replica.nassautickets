import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
export default function MainLayout({ page, children }) {
  const [open, setOpen] = useState(false);
  return <div className="app-layout"><a className="skip-link" href="#main-content">Pular para o conteúdo</a><Sidebar page={page} open={open} onClose={() => setOpen(false)} /><div className="main-shell"><Header page={page} onMenu={() => setOpen(true)} /><main id="main-content">{children}</main><footer><span>nassauTickets · Laboratório de análises clínicas</span><span>Ambiente de demonstração · Dados fictícios</span></footer></div></div>;
}
