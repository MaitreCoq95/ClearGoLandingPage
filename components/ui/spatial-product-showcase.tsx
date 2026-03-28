'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Award,
  Truck,
  Clock,
  Target,
  Star,
  LucideIcon,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type SideId = 'clear' | 'go';

export interface FeatureMetric {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface SideData {
  id: SideId;
  label: string;
  word: string;
  title: string;
  description: string;
  colors: {
    gradient: string;
    glowRgb: string;
    accent: string;
    ring: string;
    bar: string;
  };
  features: FeatureMetric[];
  tagline: string;
}

const SIDE_DATA: Record<SideId, SideData> = {
  clear: {
    id: 'clear',
    label: 'CLEAR',
    word: 'CLEAR',
    title: 'On gère tout pour vous.',
    description:
      "Conformité, réglementation, mise aux normes, ISO ready, appels d'offres ready. Chaque obligation devient un atout documenté — sans que vous y pensiez.",
    colors: {
      gradient: 'from-[#0D2B4E] to-[#081B32]',
      glowRgb: '13,43,78',
      accent: '#1A4A7A',
      ring: 'border-[#1A4A7A]/40',
      bar: 'bg-[#1A4A7A]',
    },
    features: [
      { label: 'Conformité réglementaire', value: 97, icon: ShieldCheck },
      { label: 'Documents à jour', value: 94, icon: FileCheck },
      { label: 'ISO & certifications', value: 88, icon: Award },
      { label: 'Appels d\'offres ready', value: 92, icon: TrendingUp },
    ],
    tagline: 'Obligations traitées',
  },
  go: {
    id: 'go',
    label: 'GO',
    word: 'GO',
    title: 'Vous, sur la route.',
    description:
      'Vous partez rouler. ClearGo surveille, alerte, met à jour. Votre score de conformité tourne en fond — vous, vous gérez votre business.',
    colors: {
      gradient: 'from-[#00A896] to-[#006B5E]',
      glowRgb: '0,168,150',
      accent: '#00A896',
      ring: 'border-[#00A896]/40',
      bar: 'bg-[#00A896]',
    },
    features: [
      { label: 'Sérénité opérationnelle', value: 100, icon: Star },
      { label: 'Focus sur votre métier', value: 100, icon: Truck },
      { label: 'Score partageable', value: 99, icon: Target },
      { label: 'Disponibilité route', value: 98, icon: Clock },
    ],
    tagline: 'Vous partez rouler',
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 110, damping: 22 },
    },
    exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
  },
  word: (isClear: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.4,
      filter: 'blur(20px)',
      x: isClear ? -60 : 60,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      x: 0,
      transition: { type: 'spring' as const, stiffness: 240, damping: 22 },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      filter: 'blur(20px)',
      transition: { duration: 0.22 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGlow = ({ isClear }: { isClear: boolean }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      animate={{
        background: isClear
          ? 'radial-gradient(ellipse 60% 70% at 20% 50%, rgba(13,43,78,0.35), transparent 65%)'
          : 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(0,168,150,0.25), transparent 65%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const WordVisual = ({ data, isClear }: { data: SideData; isClear: boolean }) => (
  <motion.div layout="position" className="relative flex shrink-0 items-center justify-center">
    {/* Spinning ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-12%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    {/* Pulse glow */}
    <motion.div
      animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-0 rounded-full blur-3xl"
      style={{ background: `rgba(${data.colors.glowRgb},0.4)` }}
    />

    {/* Circle */}
    <div
      className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/8 shadow-2xl backdrop-blur-sm md:h-[400px] md:w-[400px]"
      style={{ background: 'rgba(0,0,0,0.25)' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          variants={ANIMATIONS.word(isClear)}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-center gap-2 select-none"
        >
          <span
            className="font-black leading-none tracking-tighter text-white"
            style={{
              fontSize: 'clamp(72px, 12vw, 130px)',
              letterSpacing: '-6px',
              textShadow: `0 0 60px rgba(${data.colors.glowRgb},0.6)`,
            }}
          >
            {data.word}
          </span>
          <div
            className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white"
            style={{ background: `rgba(${data.colors.glowRgb},0.4)` }}
          >
            {data.tagline}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.div>
);

const SideDetails = ({ data, isClear }: { data: SideData; isClear: boolean }) => {
  const alignClass = isClear ? 'items-start text-left' : 'items-end text-right';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex w-full max-w-md flex-col ${alignClass}`}
    >
      {/* Word label */}
      <motion.div variants={ANIMATIONS.item} className="mb-3">
        <span
          className="rounded-full px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em]"
          style={{
            background: `rgba(${data.colors.glowRgb},0.15)`,
            color: isClear ? '#7EB5E0' : '#00A896',
            border: `1px solid rgba(${data.colors.glowRgb},0.3)`,
          }}
        >
          {data.label}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={ANIMATIONS.item}
        className="mb-3 font-black leading-tight tracking-tight text-white"
        style={{ fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '-2px' }}
      >
        {data.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={ANIMATIONS.item}
        className="mb-8 max-w-sm text-[15px] leading-relaxed text-zinc-400"
      >
        {data.description}
      </motion.p>

      {/* Feature bars */}
      <motion.div
        variants={ANIMATIONS.item}
        className="w-full space-y-5 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        {data.features.map((feature, idx) => (
          <div key={feature.label}>
            <div className={`mb-2 flex items-center justify-between text-[13px] ${isClear ? '' : 'flex-row-reverse'}`}>
              <div className="flex items-center gap-2 text-zinc-300">
                <feature.icon size={14} strokeWidth={2.5} />
                <span className="font-semibold">{feature.label}</span>
              </div>
              <span className="font-mono text-[12px] text-zinc-500">{feature.value}%</span>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1.1, delay: 0.3 + idx * 0.12, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute top-0 bottom-0 ${data.colors.bar} opacity-80`}
                style={isClear ? { left: 0 } : { right: 0 }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({
  activeId,
  onToggle,
}: {
  activeId: SideId;
  onToggle: (id: SideId) => void;
}) => {
  const options: { id: SideId; label: string }[] = [
    { id: 'clear', label: 'CLEAR' },
    { id: 'go', label: 'GO' },
  ];

  return (
    <div className="flex justify-center pt-8">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1.5 shadow-xl backdrop-blur-2xl">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative h-11 w-28 rounded-full text-[14px] font-black uppercase tracking-widest focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="cleargo-switcher"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    opt.id === 'clear'
                      ? 'linear-gradient(135deg, #0D2B4E, #1A4A7A)'
                      : 'linear-gradient(135deg, #00A896, #006B5E)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                activeId === opt.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// =========================================
// 4. MAIN EXPORT
// =========================================

export default function ClearGoSemantics() {
  const [active, setActive] = useState<SideId>('clear');
  const isClear = active === 'clear';
  const data = SIDE_DATA[active];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#04111F] py-16 px-6 lg:px-12">
      <BackgroundGlow isClear={isClear} />

      {/* Header */}
      <div className="relative z-10 mb-12 text-center">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
          La sémantique du nom
        </p>
        <h2
          className="font-black text-white"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-2px' }}
        >
          Pourquoi <span className="text-[#1A4A7A]">CLEAR</span>
          <span className="text-white/30">·</span>
          <span className="text-[#00A896]">GO</span> ?
        </h2>
        <p className="mt-2 text-[15px] text-zinc-500">
          Deux mots. Une promesse complète.
        </p>
      </div>

      {/* Main layout */}
      <div className="relative z-10">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.85 }}
          className={`flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16 lg:gap-28 ${
            isClear ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <WordVisual data={data} isClear={isClear} />

          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <SideDetails key={active} data={data} isClear={isClear} />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <Switcher activeId={active} onToggle={setActive} />
      </div>
    </div>
  );
}
