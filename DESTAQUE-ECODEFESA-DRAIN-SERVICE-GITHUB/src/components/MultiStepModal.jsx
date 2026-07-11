import React, { useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight, Send, Check } from "lucide-react";

const WA_NUMBER = "5511983057536";

const STEPS = [
  {
    key: "tipo",
    title: "Qual é o tipo do seu imóvel?",
    multi: false,
    options: [
      "Residência",
      "Empresa",
      "Condomínio",
      "Outro",
    ],
  },
  {
    key: "problema",
    title: "Qual problema você está enfrentando ou qual serviço deseja?",
    subtitle: "Você pode escolher mais de uma opção.",
    multi: true,
    options: [
      "Formigas",
      "Baratas",
      "Ratos / Roedores",
      "Cupins",
      "Aranhas/Escorpiões",
      "Percevejo",
      "Limpeza de Caixa d'Água",
      "Desentupimento",
      "Outro / Ainda não sei",
    ],
  },
  {
    key: "tamanho",
    title: "Qual é o tamanho aproximado do imóvel?",
    multi: false,
    options: [
      "Pequeno",
      "Médio",
      "Grande",
      "Não sei informar",
    ],
  },
  {
    key: "regiao",
    title: "Em qual local ou região será feito o serviço?",
    subtitle: "Bairro, cidade ou referência.",
    multi: false,
    input: true,
    placeholder: "Ex.: Penha de França, Tatuapé, Centro de SP...",
  },
  {
    key: "urgencia",
    title: "Qual a urgência do atendimento?",
    multi: false,
    options: [
      "Tenho urgência, preciso resolver o quanto antes",
      "Quero agendar uma avaliação nos próximos dias",
      "Estou apenas buscando informações ou orçamento",
    ],
  },
  {
    key: "nome",
    title: "Para finalizar, qual o seu nome?",
    multi: false,
    input: true,
    placeholder: "Digite seu nome",
    final: true,
  },
];

export default function MultiStepModal({ open, onClose, presetService }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => (presetService ? { problema: [presetService] } : {}));
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset text input when changing steps
  useEffect(() => {
    if (!open) return;
    const current = STEPS[step];
    if (current.input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTextInput(answers[current.key] || "");
    }
  }, [step, open]); // eslint-disable-line

  if (!open) return null;

  const current = STEPS[step];

  // Single choice
  const handleOption = (val) => {
    const next = { ...answers, [current.key]: val };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 150);
    }
  };

  // Multi choice — toggle
  const handleMultiToggle = (val) => {
    const currentList = Array.isArray(answers[current.key]) ? answers[current.key] : [];
    const exists = currentList.includes(val);
    const updated = exists ? currentList.filter((v) => v !== val) : [...currentList, val];
    setAnswers({ ...answers, [current.key]: updated });
  };

  const isMultiSelected = (val) => {
    const list = answers[current.key];
    return Array.isArray(list) && list.includes(val);
  };

  const handleAdvance = () => {
    if (current.multi) {
      const list = answers[current.key];
      if (!Array.isArray(list) || list.length === 0) return;
    }
    if (current.input && !current.final) {
      const val = textInput.trim();
      if (!val) return;
      setAnswers({ ...answers, [current.key]: val });
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      // persist text input if any
      if (current.input && !current.final) {
        setAnswers({ ...answers, [current.key]: textInput.trim() });
      }
      setStep(step - 1);
    }
  };

  const formatValue = (v) => {
    if (Array.isArray(v)) return v.join(", ");
    return v || "-";
  };

  const handleSubmit = () => {
    const trimmed = textInput.trim();
    if (!trimmed) return;
    const final = { ...answers, nome: trimmed };

    const problema = formatValue(final.problema);
    const tipo = formatValue(final.tipo);
    const tamanho = formatValue(final.tamanho);
    const regiao = formatValue(final.regiao);
    const urgencia = formatValue(final.urgencia);

    // WhatsApp markdown: *bold* + blank lines between fields for readability
    const message =
      `Olá! Vim pelo site e gostaria de solicitar um orçamento.\n\n` +
      `*Nome:* ${final.nome}\n\n` +
      `*Tipo de imóvel:* ${tipo}\n\n` +
      `*Problema/Serviço:* ${problema}\n\n` +
      `*Tamanho do imóvel:* ${tamanho}\n\n` +
      `*Local/Região:* ${regiao}\n\n` +
      `*Urgência:* ${urgencia}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  const multiSelectedCount = current.multi && Array.isArray(answers[current.key])
    ? answers[current.key].length
    : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overlay-in"
      style={{ background: "rgba(20,20,20,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div
        className="modal-light relative w-full max-w-xl rounded-3xl shadow-[0_30px_80px_-20px_rgba(115,2,12,0.35)] modal-in"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-container"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition"
          data-testid="modal-close"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="px-8 pt-8 pb-4">
          <div className="text-[10px] tracking-[0.28em] uppercase text-zinc-500 mb-3">
            Etapa {step + 1} de {STEPS.length}
          </div>
          <div className="flex items-center gap-2 mb-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`prog-dot-light ${i === step ? "active" : i < step ? "done" : ""}`}
                data-testid={`progress-dot-${i}`}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pb-2">
          <h3 className="font-display text-2xl md:text-3xl text-zinc-900 leading-snug" data-testid="modal-question">
            {current.title}
          </h3>
          {current.subtitle && (
            <p className="text-zinc-500 text-sm mt-2">{current.subtitle}</p>
          )}
        </div>

        <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
          {current.input ? (
            <div className="space-y-4">
              <input
                autoFocus
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (current.final) handleSubmit();
                    else handleAdvance();
                  }
                }}
                placeholder={current.placeholder || "Digite aqui"}
                className="w-full px-5 py-4 rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-[#73020C] focus:ring-2 focus:ring-[#73020C]/15 transition"
                data-testid={current.final ? "modal-name-input" : `modal-text-input-${current.key}`}
              />
              {current.final ? (
                <button
                  onClick={handleSubmit}
                  disabled={!textInput.trim()}
                  className="btn-pill btn-accent w-full disabled:opacity-40 disabled:cursor-not-allowed"
                  data-testid="modal-submit"
                >
                  <Send size={16} /> Enviar para WhatsApp
                </button>
              ) : (
                <button
                  onClick={handleAdvance}
                  disabled={!textInput.trim()}
                  className="btn-pill btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
                  data-testid={`modal-advance-${current.key}`}
                >
                  Continuar <ArrowRight size={16} />
                </button>
              )}
            </div>
          ) : current.multi ? (
            <div className="space-y-3">
              {current.options.map((opt) => {
                const selected = isMultiSelected(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => handleMultiToggle(opt)}
                    className={`opt-btn-light ${selected ? "opt-btn-light-active" : ""}`}
                    data-testid={`modal-option-${current.key}-${opt.slice(0, 20).replace(/\s+/g, "-")}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`checkbox-pill ${selected ? "checked" : ""}`}>
                        {selected && <Check size={14} strokeWidth={3} />}
                      </span>
                      {opt}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={handleAdvance}
                disabled={multiSelectedCount === 0}
                className="btn-pill btn-primary w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid={`modal-advance-${current.key}`}
              >
                {multiSelectedCount > 0
                  ? `Continuar (${multiSelectedCount} selecionado${multiSelectedCount > 1 ? "s" : ""})`
                  : "Selecione ao menos uma opção"} <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOption(opt)}
                  className={`opt-btn-light ${answers[current.key] === opt ? "opt-btn-light-active" : ""}`}
                  data-testid={`modal-option-${current.key}-${opt.slice(0, 20).replace(/\s+/g, "-")}`}
                >
                  <span>{opt}</span>
                  <ArrowRight size={16} className="arrow" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-8 pb-8 pt-2 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="btn-pill btn-ghost-light disabled:opacity-30 disabled:cursor-not-allowed"
            data-testid="modal-back"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <div className="text-xs text-zinc-400">
            {step > 0 && <span>Respostas salvas</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
