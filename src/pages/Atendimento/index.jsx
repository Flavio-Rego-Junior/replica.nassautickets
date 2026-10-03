import { useState, useEffect } from 'react';
import { Ticket, Users, UserRound, ArrowRight, Volume2, Play, Check, Clock3 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import PriorityBadge from '../../components/PriorityBadge';
import StatusBadge from '../../components/StatusBadge';
import Table from '../../components/Table';
import PatientQueue from '../../components/PatientQueue';
import { buscarAtendimento, chamarSenha, iniciarAtendimento, finalizarAtendimento } from '../../services/ticketService';
import EmptyState from '../../components/EmptyState';
export default function Atendimento() {
  const [current, setCurrent] = useState(null);
  const [fila, setFila] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const atualizar = async () => {
    const dados = await buscarAtendimento();
    setCurrent(dados.current);
    setFila(dados.fila);
    setHistorico(dados.historico);
  };

  const carregar = async () => {
    setLoading(true);
    setError('');
    try {
      await atualizar();
    } catch {
      setError('Verifique a conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregar(); }, []);
  const [notice, setNotice] = useState('');
  const agir = async (acao, mensagem) => { try { await acao(); await atualizar(); setNotice(mensagem); } catch (e) { setNotice(`Erro: ${e.message || 'não foi possível concluir a ação.'}`); } };
  const call = patient => patient && agir(() => chamarSenha(patient.ticket), `Demonstração: senha ${patient.ticket} chamada.`);
  if (loading) return <EmptyState title="Carregando atendimento…" description="Aguarde um instante." />;
  if (error) return <><EmptyState title="Não foi possível carregar" description={error} /><Button onClick={carregar}>Tentar novamente</Button></>;
  return <><div className="page-heading"><div><div className="eyebrow">RECEPÇÃO DO LABORATÓRIO</div><h1>Atendimento</h1><p>Acompanhe a fila e organize o atendimento dos pacientes.</p></div><a className="button button-primary" href="#emissao"><Ticket size={17} />Emitir nova senha</a></div><div className="summary-grid"><Card title="Senha atual" value={current.ticket} icon={Ticket} detail={<PriorityBadge value={current.priority} />} /><Card title="Próxima senha" value={fila[0]?.ticket ?? '—'} icon={ArrowRight} detail={fila[0] ? `${fila[0].name} · ${fila[0].type}` : 'Fila vazia'} /><Card title="Paciente em atendimento" value={current.name} icon={UserRound} detail={current.type} className="patient-summary" /><Card title="Pacientes aguardando" value={fila.length} icon={Users} detail="Na fila de atendimento" /></div><section className="current-panel"><div className="current-info"><div className="current-icon"><Volume2 size={21} /></div><div><div className="current-title">Atendimento atual <StatusBadge value={current.status} /></div><p><strong>{current.ticket}</strong><span className="separator">/</span>{current.name}<span className="current-type"> · {current.type}</span></p></div></div><div className="current-actions"><Button variant="secondary" onClick={() => call(fila[0])}><Volume2 size={16} />Chamar próxima</Button><Button disabled={!['CHAMADA', 'CHAMADA_NOVAMENTE'].includes(current.status)} onClick={() => agir(iniciarAtendimento, 'Demonstração: atendimento iniciado.')}><Play size={15} />Iniciar atendimento</Button><Button variant="secondary" disabled={current.status !== 'EM_ATENDIMENTO'} onClick={() => agir(finalizarAtendimento, 'Demonstração: atendimento finalizado.')}><Check size={17} />Finalizar atendimento</Button></div></section>{notice && <div className="notice" role="status"><Check size={16} />{notice}</div>}<PatientQueue patients={fila} onCall={call} /><section className="panel history-panel"><div className="section-heading"><div><h2><Clock3 size={18} />Histórico de atendimentos</h2><p>Últimos atendimentos finalizados nesta unidade.</p></div><span className="subtle-label">Hoje</span></div><Table rows={historico} label="Histórico de atendimentos" history /></section></>;
}
