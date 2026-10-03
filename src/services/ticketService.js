import { currentPatient, waitingPatients, historyPatients } from '../data/mockData';

const esperar = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// ---- Formato da senha: YYMMDD-PPSQ (ex: 261003-SP001) ----
const pad = n => String(n).padStart(2, '0');
const prefixoData = () => {
  const d = new Date();
  return `${pad(d.getFullYear() % 100)}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
};
const gerarNumero = (tipo, seq) => `${prefixoData()}-${tipo}${String(seq).padStart(3, '0')}`;
const agora = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

// ---- "Banco" em memória, alimentado pelo mockData e convertido para o formato novo ----
// Quando o back existir, tudo daqui até o fim da seção some e cada função vira um fetch.
const tipoDe = p => (p.type === 'Retirada de resultados' ? 'SE' : p.priority === 'Normal' ? 'SG' : 'SP');
const ESTADO_ANTIGO = { Aguardando: 'AGUARDANDO', Chamado: 'CHAMADA', 'Em atendimento': 'EM_ATENDIMENTO', Finalizado: 'ATENDIDA' };

const contadores = { SP: 0, SG: 0, SE: 0 };
const semente = [...[...historyPatients].reverse(), currentPatient, ...waitingPatients].map(p => {
  const tipo = tipoDe(p);
  contadores[tipo] += 1;
  return { ...p, priority: tipo, status: ESTADO_ANTIGO[p.status], ticket: gerarNumero(tipo, contadores[tipo]) };
});

const banco = {
  current: semente[historyPatients.length],
  fila: semente.slice(historyPatients.length + 1),
  historico: semente.slice(0, historyPatients.length).reverse(),
};

// ---- Funções usadas pelas telas ----
export async function buscarAtendimento() {
  await esperar();
  return structuredClone(banco);
}

export async function emitirSenha({ name, type, priority }) {
  await esperar();
  contadores[priority] += 1;
  const senha = {
    ticket: gerarNumero(priority, contadores[priority]),
    name, // o CPF digitado não é guardado (LGPD)
    type,
    priority,
    time: agora(),
    status: 'AGUARDANDO',
  };
  banco.fila.push(senha);
  return structuredClone(senha);
}

export async function chamarSenha(ticket) {
  await esperar();
  const i = banco.fila.findIndex(p => p.ticket === ticket);
  if (i === -1) throw new Error('Essa senha não está mais na fila.');
  const [senha] = banco.fila.splice(i, 1);
  banco.current = { ...senha, status: 'CHAMADA' };
  return structuredClone(banco.current);
}

export async function iniciarAtendimento() {
  await esperar();
  if (!['CHAMADA', 'CHAMADA_NOVAMENTE'].includes(banco.current.status)) throw new Error('A senha atual não está chamada.');
  banco.current = { ...banco.current, status: 'EM_ATENDIMENTO' };
  return structuredClone(banco.current);
}

export async function finalizarAtendimento() {
  await esperar();
  if (banco.current.status !== 'EM_ATENDIMENTO') throw new Error('A senha atual não está em atendimento.');
  banco.current = { ...banco.current, status: 'ATENDIDA' };
  banco.historico.unshift(banco.current);
  return structuredClone(banco.current);
}
