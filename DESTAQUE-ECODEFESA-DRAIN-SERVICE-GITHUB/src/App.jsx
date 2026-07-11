import React, { useState, useEffect } from "react";
import "@/App.css";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Leaf,
  Award,
  Clock,
  Sparkles,
  Bug,
  Rat,
  Droplets,
  Hammer,
  Wrench,
  Building2,
  Briefcase,
  Home as HomeIcon,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  MapPin,
  Mail,
} from "lucide-react";
import MultiStepModal from "@/components/MultiStepModal";

const WA_NUMBER = "5511983057536";
const WA_LINK = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || "Olá! Gostaria de solicitar um orçamento de dedetização com a Eco Defesa Dedetizadora.")}`;

// Brand logos
const LOGO_URL =
  "/assets/asset-dc96260678.png";
const LOGO_FOOTER_URL =
  "/assets/asset-e340c3646a.png";

// Imagery
const IMG = {
  hero: "/assets/asset-918bd11125.jpg",
  dedetizacao:
    "/assets/asset-e49bd1616f.jpg",
  formigas:
    "/assets/asset-f4e3023f58.png",
  baratas:
    "/assets/asset-5730059fff.png",
  ratos:
    "/assets/asset-8a62169193.png",
  cupins:
    "/assets/asset-cfd813a5b3.png",
  caixaDagua:
    "/assets/asset-367823ba09.png",
  desentupimento:
    "/assets/desentupimento.png",
  condominios:
    "/assets/asset-7ffcec9d20.jpg",
  empresarial:
    "/assets/asset-63e73457f9.jpg",
  residencial:
    "/assets/asset-7166d2fe0d.jpg",
};

const SERVICES = [
  {
    key: "formigas",
    title: "Controle de Formigas",
    subtitle: "Eliminação na origem da colônia, com segurança",
    description:
      "Dedetização de formigas com tratamento direcionado à colônia. Usamos produtos registrados pela ANVISA, seguros para crianças e pets, e protocolo de bloqueio para evitar o retorno.",
    image: IMG.formigas,
    icon: Bug,
    tags: ["Colônia", "Pet-friendly"],
    iconStyle: true,
  },
  {
    key: "baratas",
    title: "Dedetização de Baratas",
    subtitle: "Aplicação técnica em pontos críticos",
    description:
      "Tratamento com gel, pó, pulverização em pontos críticos. Aplicação profissional em frestas, ralos, áreas de fluxo e cozinhas industriais, com garantia técnica.",
    image: IMG.baratas,
    icon: Bug,
    tags: ["Gel", "Pontos críticos"],
    iconStyle: true,
  },
  {
    key: "ratos",
    title: "Desratização",
    subtitle: "Iscas seguras e estações de monitoramento",
    description:
      "Desratização profissional com estações lacradas, iscas registradas, mapeamento de rotas e bloqueio de pontos de entrada. Ideal para residências, comércios, restaurantes e condomínios.",
    image: IMG.ratos,
    icon: Rat,
    tags: ["Estações lacradas", "Monitoramento"],
    iconStyle: true,
  },
  {
    key: "cupins",
    title: "Descupinização",
    subtitle: "Inspeção, tratamento e proteção da madeira",
    description:
      "Cupins de solo e de madeira seca, com inspeção estrutural completa, tratamento curativo e preventivo, e laudo técnico para imóveis residenciais e comerciais.",
    image: IMG.cupins,
    icon: Hammer,
    tags: ["Solo & madeira seca", "Preventivo"],
    iconStyle: true,
  },
  {
    key: "caixadagua",
    title: "Limpeza de Caixa d'Água",
    subtitle: "Higienização com certificado de potabilidade",
    description:
      "Conforme normas da Vigilância Sanitária: limpeza completa, desinfecção, sanitização e emissão de certificado de higienização obrigatório para condomínios e empresas.",
    image: IMG.caixaDagua,
    icon: Droplets,
    tags: ["Certificado", "ANVISA"],
  },
  {
    key: "desentupimento",
    title: "Desentupimento",
    subtitle: "Desobstrução rápida de pias, ralos e esgotos",
    description:
      "Serviço técnico de desentupimento de pias, vasos sanitários, ralos, colunas e redes de esgoto. Utilizamos máquinas de alta pressão e equipamentos especializados, com atendimento de urgência e sem quebra-quebra.",
    image: IMG.desentupimento,
    icon: Wrench,
    tags: ["Alta pressão", "Emergência 24h"],
    containImage: true,
  },
];

const ENVIRONMENTS = [
  {
    key: "condominios",
    title: "Dedetização para Condomínios",
    description:
      "Planos de manutenção preventiva, MIP e laudos técnicos para síndicos e administradoras. Atendemos condomínios verticais, horizontais e mistos.",
    label: "Conformidade e produtividade",
    image: IMG.condominios,
    icon: Building2,
  },
  {
    key: "empresarial",
    title: "Dedetização Empresarial",
    description:
      "Controle de pragas para escritórios, restaurantes, indústrias, food service e comércios. Atendimento técnico discreto, sem interromper sua operação.",
    label: "Operação sem interrupção",
    image: IMG.empresarial,
    icon: Briefcase,
  },
  {
    key: "residencial",
    title: "Dedetização Residencial",
    description:
      "Atendimento personalizado em casas, apartamentos e sobrados, com produtos registrados pela ANVISA, seguros para pets e crianças.",
    label: "Segurança para sua família",
    image: IMG.residencial,
    icon: HomeIcon,
  },
];

const DIFFERENTIALS = [
  { icon: Award, title: "Certificações", text: "Dedetizadora licenciada pela Vigilância Sanitária e CETESB." },
  { icon: Leaf, title: "Produtos seguros", text: "Linha registrada na ANVISA, segura para crianças e pets." },
  { icon: Clock, title: "Atendimento ágil", text: "Resposta em até 30 minutos e visita técnica agendada em até 24h." },
  { icon: Sparkles, title: "Garantia técnica", text: "Garantia de até 12 meses com retorno gratuito se necessário." },
];

const TESTIMONIALS = [
  {
    name: "Carolina M.",
    role: "Síndica · Cond. Vila dos Pinheiros",
    quote:
      "Profissionalismo absoluto. Atenderam um prédio de 9 andares na Zona Leste sem interromper a rotina dos moradores e o relatório técnico foi impecável.",
  },
  {
    name: "Rodrigo S.",
    role: "Gerente · Restaurante Aurora",
    quote:
      "Resolveram um problema de baratas em pontos críticos da cozinha em uma única visita. Equipe discreta e produto sem cheiro. Recomendo demais.",
  },
  {
    name: "Júlia A.",
    role: "Moradora · Jardim Paulista",
    quote:
      "Atendimento humano, sem aquela coisa de empresa grande. Cuidaram do meu apartamento como se fosse o deles. Recomendo.",
  },
];

const MAP_QUERY = "R. Comendador Cantinho, 351, Penha de França, São Paulo - SP";
const MAP_EMBED = `https://maps.google.com/maps?width=100%25&height=600&hl=pt-BR&q=${encodeURIComponent(MAP_QUERY)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

// ===== Components =====
const NavLink = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm text-zinc-700 hover:text-[#73020C] transition-colors duration-200 font-medium"
    data-testid={`nav-${href.replace("#", "")}`}
  >
    {children}
  </a>
);

const Header = ({ onOpen }) => {
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMobile(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="px-4 md:px-8">
        <div className="vidro-light max-w-7xl mx-auto rounded-3xl px-5 md:px-7 py-3 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3" data-testid="brand-logo">
            <img
              src={LOGO_URL}
              alt="Eco Defesa Dedetizadora"
              className={`transition-all duration-300 ${scrolled ? "h-16 md:h-20" : "h-20 md:h-24"} w-auto object-contain logo-frame`}
              data-testid="brand-logo-img"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#servicos" onClick={handleNavClick}>Serviços</NavLink>
            <NavLink href="#atendimento" onClick={handleNavClick}>Atendimento</NavLink>
            <NavLink href="#diferenciais" onClick={handleNavClick}>Diferenciais</NavLink>
            <NavLink href="#contato" onClick={handleNavClick}>Contato</NavLink>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={WA_LINK()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-ghost-wa"
              data-testid="header-whatsapp"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <button onClick={onOpen} className="btn-pill btn-primary" data-testid="header-cta">
              Solicitar orçamento
            </button>
          </div>
          <button
            onClick={() => setMobile((s) => !s)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-zinc-900 hover:bg-zinc-100"
            data-testid="mobile-menu-toggle"
            aria-label="Abrir menu"
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobile && (
          <div className="md:hidden mt-2 vidro-light-strong max-w-7xl mx-auto rounded-3xl p-6 space-y-4">
            <div className="flex flex-col gap-4">
              <NavLink href="#servicos" onClick={handleNavClick}>Serviços</NavLink>
              <NavLink href="#atendimento" onClick={handleNavClick}>Atendimento</NavLink>
              <NavLink href="#diferenciais" onClick={handleNavClick}>Diferenciais</NavLink>
              <NavLink href="#contato" onClick={handleNavClick}>Contato</NavLink>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <a href={WA_LINK()} target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost-light">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <button onClick={() => { onOpen(); setMobile(false); }} className="btn-pill btn-primary">
                Solicitar orçamento
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = ({ onOpen }) => (
  <section id="hero" className="relative hero-radial-light pt-40 md:pt-52 pb-24 md:pb-32 overflow-hidden">
    <div className="grain-light absolute inset-0" />
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-7 fade-up">
        <div className="badge-light mb-6" data-testid="hero-badge">
          <span className="dot" /> Dedetizadora em São Paulo · ANVISA · CETESB
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-zinc-900 leading-[1.02] tracking-tight">
          Dedetizadora em São Paulo —
          <br />
          <span style={{ color: "#73020C" }}>Controle de Pragas Urbanas</span>
        </h1>
        <p className="text-zinc-700 mt-7 text-lg md:text-xl max-w-xl font-light leading-relaxed">
          Especialistas em dedetização, desratização, descupinização e limpeza de caixas
          d&apos;água para residências, empresas e condomínios. Trabalhamos com produtos
          regulamentados, equipe capacitada e emissão de laudo técnico e certificado em
          todos os serviços.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-9">
          <button onClick={onOpen} className="btn-pill btn-primary" data-testid="hero-cta-primary">
            Solicitar orçamento <ChevronRight size={16} />
          </button>
          <a
            href={WA_LINK()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-ghost-light"
            data-testid="hero-cta-whatsapp"
          >
            <MessageCircle size={16} /> Falar no WhatsApp
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-10 text-sm text-zinc-600">
          <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "#34593D" }} /> Atendimento em até 24h</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "#34593D" }} /> Garantia de até 12 meses</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: "#34593D" }} /> Sem cheiro · Pet-friendly</span>
        </div>
      </div>

      <div className="md:col-span-5 relative fade-up hidden md:block" style={{ animationDelay: "0.15s" }}>
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-[0_40px_80px_-30px_rgba(115,2,12,0.35)]">
          <img
            src={IMG.hero}
            alt="Dedetizadora Eco Defesa - técnico em atendimento"
            className="w-full h-[520px] object-cover"
            data-testid="hero-image"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.0) 40%, rgba(13,13,13,0.78) 100%)" }} />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="vidro-light rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(52, 89, 61, 0.15)", border: "1px solid rgba(52, 89, 61, 0.35)" }}>
                <ShieldCheck size={18} style={{ color: "#34593D" }} />
              </div>
              <div>
                <div className="text-zinc-900 text-sm font-medium">Equipe técnica certificada</div>
                <div className="text-zinc-600 text-xs">Biólogos e técnicos com registro CRBio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SectionHeader = ({ eyebrow, title, subtitle, testid }) => (
  <div className="max-w-3xl" data-testid={testid}>
    {eyebrow && (
      <div className="text-[10px] tracking-[0.32em] uppercase text-zinc-500 mb-4">
        {eyebrow}
      </div>
    )}
    <h2 className="font-display text-4xl md:text-5xl text-zinc-900 leading-[1.05] tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-zinc-700 mt-5 text-lg leading-relaxed font-light">{subtitle}</p>
    )}
  </div>
);

const Services = ({ onOpenService }) => (
  <section id="servicos" className="relative py-24 md:py-32 bg-[#FAFAF6]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <SectionHeader
        eyebrow="Serviços de dedetização"
        title="Controle técnico para as principais pragas urbanas"
        subtitle="Escolha a praga ou serviço desejado. Nossa equipe avalia o ambiente, aplica o método adequado e emite laudo técnico e certificado quando necessário."
        testid="services-header"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 mt-14">
        {SERVICES.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.key}
              className={`svc-card-light ${svc.span ? "lg:col-span-2" : ""}`}
              data-testid={`service-card-${svc.key}`}
            >
              <div
                className={`img-wrap ${svc.iconStyle ? "img-wrap-icon-light" : ""} ${svc.pestImage ? "pest-image-wrap" : ""} ${svc.containImage ? "img-wrap-contain" : ""}`}
                style={svc.span ? { height: 300 } : undefined}
              >
                <img src={svc.image} alt={`${svc.title} - serviço Eco Defesa`} loading="lazy" />
                {svc.pestImage && <span className="pest-prohibited-mark" aria-hidden="true" />}
                <div className="absolute top-4 left-4 vidro-light rounded-full px-3 py-1.5 flex items-center gap-2 z-10">
                  <Icon size={14} style={{ color: "#73020C" }} />
                  <span className="text-[10px] tracking-[0.22em] uppercase text-zinc-800">{svc.tags?.[0] || "Premium"}</span>
                </div>
              </div>
              <div className="p-6 md:p-7 relative z-10">
                <h3 className="font-display text-2xl md:text-3xl text-zinc-900">{svc.title}</h3>
                <p className="text-zinc-500 text-sm mt-1.5">{svc.subtitle}</p>
                <p className="text-zinc-700 mt-4 leading-relaxed">{svc.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {svc.tags?.map((t) => (
                    <span key={t} className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 border border-zinc-300 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onOpenService(svc)}
                  className="btn-pill btn-primary mt-6"
                  data-testid={`service-cta-${svc.key}`}
                >
                  Solicitar <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Environments = ({ onOpenEnv }) => (
  <section id="atendimento" className="relative py-24 md:py-32">
    <div className="etched-light mb-24" />
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <SectionHeader
        eyebrow="Tipos de atendimento"
        title="Dedetização sob medida para cada tipo de ambiente"
        subtitle="Adaptamos protocolo, horário e equipamentos ao seu tipo de imóvel. Operamos com discrição em todas as etapas, do diagnóstico ao laudo final."
        testid="env-header"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 mt-14">
        {ENVIRONMENTS.map((env) => {
          const Icon = env.icon;
          return (
            <div key={env.key} className="env-card group" data-testid={`env-card-${env.key}`}>
              <img src={env.image} alt={`${env.title} - atendimento Eco Defesa`} loading="lazy" />
              <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full vidro-fume flex items-center justify-center">
                    <Icon size={18} style={{ color: "#F20505" }} />
                  </div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-white/85">
                    {env.label}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-white leading-tight">
                    {env.title}
                  </h3>
                  <p className="text-white/85 mt-3 leading-relaxed">{env.description}</p>
                  <button
                    onClick={() => onOpenEnv(env)}
                    className="btn-pill btn-accent mt-6"
                    data-testid={`env-cta-${env.key}`}
                  >
                    Solicitar <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Differentials = () => (
  <section id="diferenciais" className="relative py-24 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-5">
        <SectionHeader
          eyebrow="Por que escolher a Eco Defesa"
          title="A dedetizadora que trata seu imóvel como o nosso."
          subtitle="Não vendemos visita. Construímos um programa de proteção contínua, com diagnóstico, laudo e acompanhamento técnico."
        />
      </div>
      <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
        {DIFFERENTIALS.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.title}
              className="card-light rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1"
              data-testid={`differential-${d.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(52, 89, 61, 0.12)", border: "1px solid rgba(52, 89, 61, 0.30)" }}>
                <Icon size={18} style={{ color: "#34593D" }} />
              </div>
              <h4 className="font-display text-xl text-zinc-900">{d.title}</h4>
              <p className="text-zinc-700 text-sm mt-1.5 leading-relaxed">{d.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="depoimentos" className="relative py-24 md:py-32 bg-[#FAFAF6]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <SectionHeader
        eyebrow="Quem confia na Eco Defesa"
        title="Síndicos, gestores e famílias que dormem mais tranquilos."
        testid="testimonials-header"
      />
      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="card-light rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1" data-testid={`testimonial-${t.name.split(" ")[0].toLowerCase()}`}>
            <div className="font-display text-4xl leading-none" style={{ color: "#73020C" }}>&ldquo;</div>
            <p className="text-zinc-800 leading-relaxed mt-2 font-light">{t.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg text-white" style={{ background: "linear-gradient(135deg, #73020C, #a30311)" }}>
                {t.name[0]}
              </div>
              <div>
                <div className="text-zinc-900 text-sm font-medium">{t.name}</div>
                <div className="text-zinc-500 text-xs">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = ({ onOpen }) => (
  <section id="contato" className="relative py-24 md:py-32 bg-white">
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-16" style={{ background: "linear-gradient(135deg, #34593D 0%, #0D0D0D 55%, #73020C 130%)" }}>
        <div className="grain absolute inset-0" />
        <div className="relative grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-[0.32em] uppercase text-white/70 mb-4">Pronto para começar?</div>
            <h3 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Fale com a Eco Defesa e tenha um diagnóstico em até 24h.
            </h3>
            <p className="text-white/85 mt-5 leading-relaxed text-lg max-w-xl">
              Respondemos em até 30 minutos. Atendimento presencial em toda a capital
              paulista e Grande SP.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <button onClick={onOpen} className="btn-pill btn-urgent justify-center w-full text-base" data-testid="cta-form">
              Solicitar orçamento <ChevronRight size={16} />
            </button>
            <a href={WA_LINK()} target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost justify-center w-full text-base" data-testid="cta-whatsapp">
              <MessageCircle size={16} /> Chamar no WhatsApp
            </a>
            <a href={`tel:+${WA_NUMBER}`} className="btn-pill btn-ghost justify-center w-full text-base" data-testid="cta-phone">
              <Phone size={16} /> (11) 98305-7536
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LocationSection = ({ onOpen }) => (
  <section id="onde-estamos" className="relative py-24 md:py-32 overflow-hidden section-soft">
    <div className="absolute inset-0 grain-light opacity-25 pointer-events-none" />
    <div className="absolute -top-40 right-0 w-[620px] h-[620px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(52, 89, 61, 0.10)" }} />
    <div className="absolute -bottom-40 left-0 w-[620px] h-[620px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(115, 2, 12, 0.12)" }} />

    <div className="relative max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* LEFT — Info card */}
        <div className="loc-info-card flex flex-col" data-testid="location-info-card">
          <div className="text-[10px] tracking-[0.32em] uppercase text-zinc-500 mb-6">Onde estamos</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 leading-[1.05] tracking-tight">
            Dedetizadora em <span style={{ color: "#73020C" }}>São Paulo</span> e região, com agilidade.
          </h2>
          <p className="text-zinc-700 mt-6 text-lg leading-relaxed font-light max-w-xl">
            Base operacional na Penha de França para atendimento técnico em residências, comércios, empresas e condomínios em toda a capital.
          </p>

          <div className="loc-address-card mt-10" data-testid="location-address">
            <div className="loc-icon-circle"><MapPin size={20} /></div>
            <div className="flex-1">
              <div className="text-zinc-900 font-medium text-lg">R. Comendador Cantinho, 351</div>
              <div className="text-zinc-500 text-sm mt-1 tracking-wide">Penha de França · São Paulo · SP</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <a href={`tel:+${WA_NUMBER}`} className="loc-mini-card" data-testid="location-phone">
              <div className="loc-icon-circle small"><Phone size={18} /></div>
              <div>
                <div className="text-zinc-900 font-medium">(11) 98305-7536</div>
                <div className="text-zinc-500 text-xs mt-1 tracking-wide uppercase">Telefone</div>
              </div>
            </a>
            <a href="mailto:ecodefesadedetizadora@gmail.com" className="loc-mini-card" data-testid="location-email">
              <div className="loc-icon-circle small"><Mail size={18} /></div>
              <div className="min-w-0">
                <div className="text-zinc-900 font-medium text-sm break-all">ecodefesadedetizadora@gmail.com</div>
                <div className="text-zinc-500 text-xs mt-1 tracking-wide uppercase">E-mail</div>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button onClick={onOpen} className="btn-pill btn-primary" data-testid="location-cta-quote">
              Solicitar orçamento <ChevronRight size={16} />
            </button>
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost-light" data-testid="location-map-link">
              Abrir no Maps <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* RIGHT — Map */}
        <div className="loc-map-wrap" data-testid="location-map-wrap">
          <iframe
            title="Eco Defesa Dedetizadora no Google Maps"
            src={MAP_EMBED}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-testid="location-google-map"
          />
          <div className="loc-map-floating" data-testid="location-map-floating">
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.28em] uppercase text-zinc-500">Base operacional</p>
              <p className="font-display text-2xl text-zinc-900 mt-1">Penha de França · SP</p>
              <p className="text-zinc-600 text-sm mt-1">Cobertura técnica em toda a capital e Grande SP.</p>
            </div>
            <a
              href={WA_LINK()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-wa"
              data-testid="location-whatsapp"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative footer-elegant pt-20 pb-10 overflow-hidden">
    <div className="footer-grain absolute inset-0 pointer-events-none" />
    <div className="footer-glow-1 pointer-events-none" />
    <div className="footer-glow-2 pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <img
            src={LOGO_FOOTER_URL}
            alt="Eco Defesa Dedetizadora"
            className="h-28 w-auto object-contain footer-logo-frame"
            data-testid="footer-logo"
          />
          <p className="text-zinc-300 mt-6 max-w-md leading-relaxed text-sm">
            Dedetizadora especializada em controle integrado de pragas urbanas, desratização,
            descupinização e limpeza de caixa d&apos;água. Atendimento técnico premium em toda a
            capital paulista.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {["ANVISA", "CETESB", "CRBio", "Vig. Sanitária SP"].map((s) => (
              <span key={s} className="footer-chip" data-testid={`footer-seal-${s.toLowerCase().replace(/\s|\./g, "")}`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="footer-eyebrow">Serviços</div>
          <ul className="space-y-3 text-sm">
            {[
              ["Controle de Formigas", "#servicos"],
              ["Dedetização de Baratas", "#servicos"],
              ["Desratização", "#servicos"],
              ["Descupinização", "#servicos"],
              ["Limpeza de Caixa d'Água", "#servicos"],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="footer-link" data-testid={`footer-link-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                  <ChevronRight size={12} className="footer-link-arrow" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="footer-eyebrow">Contato</div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="footer-icon"><Phone size={14} /></span>
              <a href={`tel:+${WA_NUMBER}`} className="footer-link" data-testid="footer-phone">(11) 98305-7536</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="footer-icon"><Mail size={14} /></span>
              <a href="mailto:ecodefesadedetizadora@gmail.com" className="footer-link break-all" data-testid="footer-email">ecodefesadedetizadora@gmail.com</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="footer-icon"><MapPin size={14} /></span>
              <span className="text-zinc-300">R. Comendador Cantinho, 351 · Penha de França · São Paulo · SP</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="footer-icon"><Clock size={14} /></span>
              <span className="text-zinc-300">Seg. a Sex. · 08h às 18h<br /><span className="text-zinc-500">Atendimento de urgência em até 24h</span></span>
            </li>
          </ul>

          <a
            href={WA_LINK()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-wa-cta mt-7"
            data-testid="footer-whatsapp-cta"
          >
            <MessageCircle size={18} /> Fale no WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-etched mt-16" />

      <div className="pt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-zinc-500">
        <div>© {new Date().getFullYear()} Eco Defesa Dedetizadora · Todos os direitos reservados.</div>
        <div className="flex items-center gap-3 tracking-wide">
          <span>Dedetizadora em SP</span>
          <span className="opacity-30">·</span>
          <span>CNPJ sob consulta</span>
        </div>
      </div>
    </div>
  </footer>
);

const FloatingWA = () => (
  <a
    href={WA_LINK()}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.55)] transition-transform hover:scale-110"
    style={{ background: "linear-gradient(135deg, #128C7E, #25D366)" }}
    data-testid="floating-whatsapp"
    aria-label="Fale com a Eco Defesa no WhatsApp"
  >
    <MessageCircle size={22} />
  </a>
);

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetService, setPresetService] = useState(null);
  const [openCount, setOpenCount] = useState(0);

  const open = (preset = null) => {
    setPresetService(preset);
    setOpenCount((c) => c + 1);
    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  const openService = (svc) => {
    const map = {
      formigas: "Formigas",
      baratas: "Baratas",
      ratos: "Ratos / Roedores",
      cupins: "Cupins",
      caixadagua: "Limpeza de Caixa d'Água",
      desentupimento: "Desentupimento",
    };
    open(map[svc.key] || null);
  };

  return (
    <div className="App relative" data-testid="app-root">
      <Header onOpen={() => open(null)} />
      <Hero onOpen={() => open(null)} />
      <Services onOpenService={openService} />
      <Environments onOpenEnv={() => open(null)} />
      <Differentials />
      <Testimonials />
      <CTA onOpen={() => open(null)} />
      <LocationSection onOpen={() => open(null)} />
      <Footer />
      <FloatingWA />
      <MultiStepModal key={openCount} open={modalOpen} onClose={close} presetService={presetService} />
    </div>
  );
}

export default App;
