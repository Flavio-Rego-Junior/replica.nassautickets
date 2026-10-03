import { useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Atendimento from './pages/Atendimento';
import EmissaoSenha from './pages/EmissaoSenha';
const getPage = () => window.location.hash === '#emissao' ? 'emissao' : 'atendimento';
export default function App() {
  const [page, setPage] = useState(getPage);
  useEffect(() => { const navigate = () => { setPage(getPage()); window.scrollTo(0, 0); }; window.addEventListener('hashchange', navigate); return () => window.removeEventListener('hashchange', navigate); }, []);
  useEffect(() => { document.title = `nassauTickets | ${page === 'atendimento' ? 'Atendimento' : 'Emissão de senha'}`; }, [page]);
  return <MainLayout page={page}>{page === 'atendimento' ? <Atendimento /> : <EmissaoSenha />}</MainLayout>;
}
