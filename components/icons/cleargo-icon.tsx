import type { ReactNode, SVGProps } from 'react'

/**
 * ClearGo Icon System
 *
 * Icônes dessinées depuis le monde du transport — pas des métaphores SaaS
 * génériques. Aucun émoji ne doit subsister dans l'interface : tout passe ici.
 *
 * Convention de couleur :
 *  - le trait structurel utilise `currentColor` (piloté par la prop `color`
 *    ou la couleur héritée du parent) ;
 *  - les accents sémantiques sont fixes : orange = attention / action,
 *    vert = validation, rouge = danger, violet = RSE.
 *
 * Sur fond clair, mettre color = navy (#0D2B5E).
 * Sur fond navy, mettre color = vert clair (#2ECC71).
 */

const GREEN = '#27AE60'
const ORANGE = '#F97316'
const RED = '#E74C3C'
const PURPLE = '#8E44AD'

type IconDef = { viewBox: string; body: ReactNode }

const ICONS = {
  // ── Univers produit ClearGo ────────────────────────────────────────────────

  'cleargo-score': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="2.5" opacity=".2" />
        <circle
          cx="22" cy="22" r="17"
          stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="64 43" strokeDashoffset="27"
        />
        <circle cx="22" cy="22" r="3" fill="currentColor" />
      </>
    ),
  },

  'plan-dactions': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="11" y="7" width="22" height="30" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="4" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M15 20 L17 22 L20 18" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="22.5" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
        <path d="M15 26 L17 28 L20 24" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="22.5" y1="26" x2="30" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
        <line x1="15" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".3" />
      </>
    ),
  },

  'score-partageable': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <path
          d="M22 3 L26 13 L37 13 L29 20 L32 30 L22 24 L12 30 L15 20 L7 13 L18 13 Z"
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"
        />
        <path d="M18 18 L21 21 L26 16" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },

  expiration: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="7" y="11" width="30" height="26" rx="2" stroke={ORANGE} strokeWidth="2" />
        <line x1="7" y1="19" x2="37" y2="19" stroke={ORANGE} strokeWidth="1.5" />
        <line x1="15" y1="7" x2="15" y2="15" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="29" y1="7" x2="29" y2="15" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="24" x2="22" y2="30" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="33.5" r="1.4" fill={ORANGE} />
      </>
    ),
  },

  'document-valide': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="9" y="6" width="26" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M14 22 L17 25 L22 19" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="30" r="7" fill="var(--white, #fff)" stroke={GREEN} strokeWidth="1.5" />
        <path d="M27 30 L29 32 L33 28" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },

  upload: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="9" y="14" width="26" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M22 6 L22 24" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
        <path d="M15 13 L22 6 L29 13" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="14" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
      </>
    ),
  },

  niveau: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="15" y="5" width="14" height="34" rx="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="14" r="3.5" fill={RED} />
        <circle cx="22" cy="22" r="3.5" fill="#E67E22" />
        <circle cx="22" cy="30" r="3.5" fill={GREEN} />
      </>
    ),
  },

  reglo: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <ellipse cx="22" cy="18" rx="10" ry="11" stroke={ORANGE} strokeWidth="2" />
        <circle cx="18" cy="16" r="4" stroke={ORANGE} strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="16" r="4" stroke={ORANGE} strokeWidth="1.2" fill="none" />
        <circle cx="18" cy="16" r="1.6" fill={GREEN} />
        <circle cx="26" cy="16" r="1.6" fill={GREEN} />
        <path d="M18 22 Q22 25 26 22" stroke={GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M12 29 Q14 24 22 26 Q30 24 32 29 L30 38 L14 38 Z" stroke={ORANGE} strokeWidth="2" fill="none" />
        <line x1="22" y1="26" x2="22" y2="38" stroke={GREEN} strokeWidth="1.5" />
      </>
    ),
  },

  // ── CORE Transport (socle réglementaire) ──────────────────────────────────

  'core-acces-profession': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="10" y="16" width="24" height="20" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M7 16 L22 7 L37 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <line x1="7" y1="36" x2="37" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="16" x2="16" y2="36" stroke="currentColor" strokeWidth="1.2" opacity=".35" />
        <line x1="22" y1="16" x2="22" y2="36" stroke="currentColor" strokeWidth="1.2" opacity=".35" />
        <line x1="28" y1="16" x2="28" y2="36" stroke="currentColor" strokeWidth="1.2" opacity=".35" />
      </>
    ),
  },

  'core-temps-conduite': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="20" r="13" stroke="currentColor" strokeWidth="2" />
        <line x1="22" y1="20" x2="22" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="20" x2="28" y2="24" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="20" r="2" fill={GREEN} />
        <rect x="8" y="35" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 35 Q15 31 22 35" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
  },

  'core-tachygraphe': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="2.5 2" opacity=".6" />
        <circle cx="22" cy="22" r="2.5" fill={GREEN} />
        <line x1="22" y1="19.5" x2="22" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="19.5" x2="27" y2="22" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },

  'core-flotte': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="4" y="18" width="26" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M30 23 L30 19 L35 19 L41 24 L41 31 L30 31 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <circle cx="11" cy="31" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="11" cy="31" r="1.5" fill="currentColor" />
        <circle cx="22" cy="31" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="22" cy="31" r="1.5" fill="currentColor" />
        <circle cx="36" cy="31" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="36" cy="31" r="1.5" fill="currentColor" />
      </>
    ),
  },

  'core-fco': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="7" y="9" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M22 14 L25 20 L32 20 L27 24 L29 30 L22 26 L15 30 L17 24 L12 20 L19 20 Z"
          stroke={ORANGE} strokeWidth="1.5" fill="none" strokeLinejoin="round"
        />
        <path d="M17 31 L17 38 L22 35 L27 38 L27 31" stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </>
    ),
  },

  'core-urssaf': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="11" y="17" width="22" height="19" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M8 17 L22 6 L36 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <line x1="8" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="17" x2="16" y2="36" stroke="currentColor" strokeWidth="1" opacity=".35" />
        <line x1="28" y1="17" x2="28" y2="36" stroke="currentColor" strokeWidth="1" opacity=".35" />
        <text x="22" y="31" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui">€</text>
      </>
    ),
  },

  'core-sous-traitance': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="9" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="35" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="13" x2="13" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity=".7" />
        <line x1="26" y1="13" x2="31" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity=".7" />
        <line x1="14" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity=".7" />
        <path d="M20 9 L21.5 10.5 L24 8" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },

  'core-co2': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="20" r="13" stroke="currentColor" strokeWidth="2" />
        <path d="M18 14 C16 17 15 22 18 26 C20 29 24 29 26 26 C29 22 27 15 22 14 Z" stroke={GREEN} strokeWidth="1.5" fill="none" />
        <line x1="22" y1="26" x2="22" y2="29" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <text x="22" y="39" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700" fontFamily="Inter, system-ui">CO₂</text>
      </>
    ),
  },

  // ── Référentiels ISO ───────────────────────────────────────────────────────

  'iso-9001': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="22" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="22" r="3" fill={GREEN} />
        <line x1="22" y1="7" x2="22" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="33" x2="22" y2="37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="7" y1="22" x2="11" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="22" x2="37" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="11.5" y1="11.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="29.5" y1="29.5" x2="32.5" y2="32.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },

  'iso-14001': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
        <path d="M15 28 C15 18 22 12 30 14 C28 24 22 30 15 28Z" stroke={GREEN} strokeWidth="2" fill="none" />
        <line x1="15" y1="28" x2="22" y2="22" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 25 Q8 18 15 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7" />
        <path d="M35 19 Q36 26 29 29" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7" />
      </>
    ),
  },

  'iso-45001': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
        <path d="M13 24 Q13 14 22 13 Q31 14 31 24 Z" stroke={ORANGE} strokeWidth="2" fill="none" />
        <line x1="10" y1="24" x2="34" y2="24" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="27" x2="22" y2="35" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="31" x2="26" y2="31" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },

  'iso-39001': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
        <path d="M22 9 L35 31 L9 31 Z" stroke={ORANGE} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <circle cx="22" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="24" r="1.5" fill={GREEN} />
        <line x1="22" y1="19" x2="22" y2="21" stroke="currentColor" strokeWidth="1.5" />
        <line x1="17" y1="24" x2="19" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="25" y1="24" x2="27" y2="24" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },

  'iso-27001': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="19" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M16 19 Q16 13 22 13 Q28 13 28 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="25" r="2.5" stroke={ORANGE} strokeWidth="1.5" fill="none" />
        <line x1="22" y1="27.5" x2="22" y2="30" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },

  // ── Référentiels sectoriels ───────────────────────────────────────────────

  adr: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <path d="M22 5 L39 33 L5 33 Z" stroke={RED} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <path
          d="M22 18 C20 15 18 17 19 20 C17 18 16 21 18 23 C19 25 21 25 22 26 C23 25 25 25 26 23 C28 21 27 18 25 20 C26 17 24 15 22 18Z"
          stroke={ORANGE} strokeWidth="1.5" fill="none"
        />
      </>
    ),
  },

  gdp: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <path d="M11 22 Q11 13 22 13 Q33 13 33 22" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M11 22 Q11 31 22 31 Q33 31 33 22" stroke={PURPLE} strokeWidth="2" fill="none" />
        <line x1="11" y1="22" x2="33" y2="22" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
        <path d="M22 15 L22 29 M17 18 L27 26 M27 18 L17 26" stroke={GREEN} strokeWidth="1" strokeLinecap="round" />
      </>
    ),
  },

  ifs: {
    viewBox: '0 0 44 44',
    body: (
      <>
        <path d="M22 10 C16 10 11 15 11 22 C11 29 16 34 22 34 C28 34 33 29 33 22 C33 15 28 10 22 10Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M22 10 Q24 6 27 8" stroke={GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M14 22 Q18 18 22 22 Q26 26 30 22" stroke={GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
  },

  'atp-frigo': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <rect x="4" y="18" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M30 24 L30 20 L36 20 L44 26 L44 34 L30 34 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <circle cx="17" cy="26" r="5" stroke={GREEN} strokeWidth="1.2" fill="none" />
        <path d="M17 22 L17 30 M13.5 24 L20.5 28 M13.5 28 L20.5 24" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="34" r="1.5" fill="currentColor" />
        <circle cx="38" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="38" cy="34" r="1.5" fill="currentColor" />
      </>
    ),
  },

  'oea-douane': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="11" y="14" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="9" y="10" width="26" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="9" y1="30" x2="35" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <text x="22" y="26" textAnchor="middle" fill={ORANGE} fontSize="9" fontWeight="800" fontFamily="Inter, system-ui">★★</text>
        <line x1="17" y1="34" x2="17" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="27" y1="34" x2="27" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },

  'transport-exceptionnel': {
    viewBox: '0 0 44 44',
    body: (
      <>
        <rect x="2" y="18" width="32" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M34 22 L34 19 L39 19 L43 24 L43 32 L34 32 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <circle cx="9" cy="32" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="9" cy="32" r="1.5" fill="currentColor" />
        <circle cx="22" cy="32" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="22" cy="32" r="1.5" fill="currentColor" />
        <circle cx="39" cy="32" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="39" cy="32" r="1.5" fill="currentColor" />
        <line x1="2" y1="12" x2="34" y2="12" stroke={ORANGE} strokeWidth="1.2" strokeDasharray="2 1.5" />
        <line x1="2" y1="10.5" x2="2" y2="13.5" stroke={ORANGE} strokeWidth="1.2" />
        <line x1="34" y1="10.5" x2="34" y2="13.5" stroke={ORANGE} strokeWidth="1.2" />
      </>
    ),
  },

  // ── Flotte & opérations ───────────────────────────────────────────────────

  'camion-pl': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <rect x="4" y="20" width="28" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M32 26 L32 22 L38 22 L44 28 L44 34 L32 34 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <path d="M33 22 L33 27 L40 27 L37 22 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity=".5" />
        <circle cx="12" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="34" r="1.5" fill="currentColor" />
        <circle cx="24" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="24" cy="34" r="1.5" fill="currentColor" />
        <circle cx="38" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="38" cy="34" r="1.5" fill="currentColor" />
      </>
    ),
  },

  'critair-zfe': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="24" cy="24" r="10" stroke={GREEN} strokeWidth="1.5" fill="none" />
        <path d="M24 18 C20 18 18 21 18 24 C18 28 21 30 24 30 C27 30 30 28 30 24 C30 21 28 18 24 18Z" stroke={GREEN} strokeWidth="1.5" fill="none" />
        <line x1="24" y1="18" x2="24" y2="30" stroke={GREEN} strokeWidth="1" opacity=".5" />
      </>
    ),
  },

  'licence-transport': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <rect x="10" y="8" width="28" height="34" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="15" y1="16" x2="33" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
        <line x1="15" y1="21" x2="33" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
        <line x1="15" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
        <circle cx="33" cy="33" r="7" fill="var(--white, #fff)" stroke={GREEN} strokeWidth="1.5" />
        <path d="M30 33 L32.5 35.5 L36.5 31" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },

  'controle-technique': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <circle cx="24" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" opacity=".35" />
        <circle cx="21" cy="19" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="27" y1="25" x2="34" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M17.5 19 L20 21.5 L24.5 16.5" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },

  'controleur-dreal': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <circle cx="24" cy="14" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M12 38 C12 28 36 28 36 38" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="20" y="26" width="8" height="6" rx="1" stroke={ORANGE} strokeWidth="1.5" fill="none" />
        <line x1="22" y1="28" x2="26" y2="28" stroke={ORANGE} strokeWidth="1" strokeLinecap="round" />
        <line x1="22" y1="30" x2="26" y2="30" stroke={ORANGE} strokeWidth="1" strokeLinecap="round" />
      </>
    ),
  },

  'donneur-ordres': {
    viewBox: '0 0 48 48',
    body: (
      <>
        <path d="M8 28 L16 22 L22 26 L26 26 L32 22 L40 28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8" y1="28" x2="8" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="28" x2="40" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 38 Q24 42 28 38" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </>
    ),
  },

  tournee: {
    viewBox: '0 0 48 48',
    body: (
      <>
        <path d="M8 40 Q16 20 24 20 Q32 20 40 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="8" cy="40" r="3" fill="currentColor" />
        <circle cx="40" cy="8" r="3" fill={GREEN} />
      </>
    ),
  },
} satisfies Record<string, IconDef>

export type ClearGoIconName = keyof typeof ICONS

export const CLEARGO_ICON_NAMES = Object.keys(ICONS) as ClearGoIconName[]

interface ClearGoIconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: ClearGoIconName
  /** Taille en pixels (carré). Défaut 24. */
  size?: number
  /** Libellé accessible. Sans lui, l'icône est décorative (aria-hidden). */
  title?: string
}

export function ClearGoIcon({ name, size = 24, title, ...props }: ClearGoIconProps) {
  const icon = ICONS[name]
  if (!icon) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {icon.body}
    </svg>
  )
}
