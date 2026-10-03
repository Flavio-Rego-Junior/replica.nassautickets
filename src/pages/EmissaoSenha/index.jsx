import { useState } from 'react';

import { Ticket, Check, UserRound, RotateCcw } from 'lucide-react';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import PriorityBadge from '../../components/PriorityBadge';
import PatientQueue from '../../components/PatientQueue';

import { waitingPatients } from '../../data/mockData';

const emptyForm = {
  name: '',
  identification: '',
  type: '',
  priority: 'Normal'
};

export default function EmissaoSenha() {
  const [form, setForm] = useState(emptyForm);
  const [ticket, setTicket] = useState(null);
  const [errors, setErrors] = useState({});
  const [ticketNumber, setTicketNumber] = useState(1);
  const [patients, setPatients] = useState(waitingPatients);

  const formatCPF = value => {
    return value
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const field = key => ({
    value: form[key],

    onChange: e => {
      const value =
        key === 'identification'
          ? formatCPF(e.target.value)
          : key === 'name'
            ? e.target.value.replace(/[0-9]/g, '')
            : e.target.value;

      setForm({ ...form, [key]: value });
      setErrors({ ...errors, [key]: '' });
    },

    onBlur: () => {
      if (key === 'name' && !form.name.trim()) {
        setErrors({
          ...errors,
          name: 'Informe o nome do paciente.'
        });
      }

      if (key === 'identification' && !form.identification) {
        setErrors({
          ...errors,
          identification: 'Informe o CPF ou documento de identificação.'
        });
      }

      if (key === 'type' && !form.type) {
        setErrors({
          ...errors,
          type: 'Selecione o tipo de atendimento.'
        });
      }
    }
  });

  const emit = e => {
    e.preventDefault();

    const nextErrors = {
      name:
        !form.name.trim()
          ? 'Informe o nome do paciente.'
          : form.name.trim().split(/\s+/).length < 2
            ? 'Informe o nome e o sobrenome do paciente.'
            : '',

      identification:
        !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.identification)
          ? 'Informe um CPF válido no formato 000.000.000-00.'
          : '',

      type: !form.type
        ? 'Selecione o tipo de atendimento.'
        : ''
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const newTicket = `A${String(ticketNumber).padStart(3, '0')}`;

    const newPatient = {
      ...form,
      ticket: newTicket
    };

    setTicket(newPatient);

    setPatients([...patients, newPatient]);

    setTicketNumber(ticketNumber + 1);
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">RECEPÇÃO DO LABORATÓRIO</div>
          <h1>Emissão de senha</h1>
          <p>
            Preencha os dados do paciente para preparar uma senha de atendimento.
          </p>
        </div>
      </div>

      <div className="emission-grid">
        <section className="panel form-panel">
          <div className="section-heading">
            <div>
              <h2>
                <UserRound size={18} />
                Dados do paciente
              </h2>

              <p>
                Os campos com <span className="required">*</span> são obrigatórios.
              </p>
            </div>
          </div>

          <form onSubmit={emit} noValidate>
            <Input
              id="patient-name"
              label="Nome do paciente"
              placeholder="Digite o nome completo"
              autoComplete="off"
              required
              error={errors.name}
              {...field('name')}
            />

            <Input
              id="identification"
              label="CPF / Identificação"
              placeholder="Digite o CPF ou documento de identificação"
              required
              error={errors.identification}
              hint="Utilize apenas dados fictícios nesta demonstração."
              {...field('identification')}
            />

            <div className="form-row">
              <Select
                id="service-type"
                label="Tipo de atendimento"
                required
                error={errors.type}
                options={[
                  {
                    value: '',
                    label: 'Selecionar atendimento'
                  },
                  ...[
                    'Coleta de exames',
                    'Exame laboratorial',
                    'Retirada de resultados'
                  ].map(value => ({
                    value,
                    label: value
                  }))
                ]}
                {...field('type')}
              />

              <Select
                id="priority"
                label="Prioridade"
                required
                options={['Normal', 'Prioridade', 'Urgente'].map(value => ({
                  value,
                  label: value
                }))}
                {...field('priority')}
              />
            </div>

            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setForm(emptyForm);
                  setErrors({});
                  setTicket(null);
                }}
              >
                <RotateCcw size={15} />
                Limpar
              </Button>

              <Button type="submit">
                <Ticket size={17} />
                Emitir senha
              </Button>
            </div>
          </form>
        </section>

        <section
          className={`panel generated-panel ${ticket ? 'has-ticket' : ''}`}
          aria-live="polite"
        >
          <div className="section-heading">
            <div>
              <h2>
                <Ticket size={18} />
                Senha gerada
              </h2>

              <p>
                {ticket
                  ? 'Prévia da senha de atendimento.'
                  : 'A senha aparecerá aqui após a emissão.'}
              </p>
            </div>
          </div>

          {ticket ? (
            <div className="ticket-preview">
              <span className="ticket-label">SENHA DE ATENDIMENTO</span>

              <strong className="generated-number">
                {ticket.ticket}
              </strong>

              <span className="ticket-unit">
                Laboratório · Unidade Nassau
              </span>

              <dl>
                <div>
                  <dt>Paciente</dt>
                  <dd>{ticket.name}</dd>
                </div>

                <div>
                  <dt>Tipo de atendimento</dt>
                  <dd>{ticket.type}</dd>
                </div>

                <div>
                  <dt>Prioridade</dt>
                  <dd>
                    <PriorityBadge value={ticket.priority} />
                  </dd>
                </div>
              </dl>

              <div className="ticket-success">
                <Check size={16} />
                Senha de demonstração emitida
              </div>
            </div>
          ) : (
            <div className="ticket-placeholder">
              <span className="placeholder-icon">
                <Ticket size={30} />
              </span>

              <strong>Pronto para um novo atendimento</strong>

              <p>
                Preencha os dados ao lado.
                <br />
                A prévia da senha será exibida neste espaço.
              </p>
            </div>
          )}
        </section>
      </div>

      <PatientQueue patients={patients} />
    </>
  );
}