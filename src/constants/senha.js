// Tipos de senha (PP no formato YYMMDD-PPSQ) e estados da máquina de estados do PDF.
export const TIPOS = {
  SP: 'Prioritária',
  SG: 'Geral',
  SE: 'Retirada de exames',
};

export const ESTADOS = {
  EMITIDA: 'Emitida',
  AGUARDANDO: 'Aguardando',
  CHAMADA: 'Chamada',
  CHAMADA_NOVAMENTE: 'Chamada novamente',
  EM_ATENDIMENTO: 'Em atendimento',
  ATENDIDA: 'Atendida',
  NAO_COMPARECEU: 'Não compareceu',
};
