/**
 * Liens externes de la landing.
 * Chaque valeur nulle désactive proprement le bouton correspondant plutôt
 * que de renvoyer vers une page morte.
 */

// TODO: créer le lien Calendly de prise de rendez-vous (30 min).
export const CALENDLY_URL: string | null = null

// TODO: définir la date et le lien d'inscription du prochain webinaire.
export const WEBINAIRE_URL: string | null = null
export const WEBINAIRE_DATE: string | null = null

// TODO: brancher la création de compte sur l'espace ClearGo.
export const ESPACE_CLEARGO_URL: string | null = null

/**
 * Racine de l'espace client (ex. https://app.cleargo.fr).
 *
 * La Bergerie renvoie un `redirect_url` relatif — c'est volontaire, le proxy
 * refuse toute URL absolue pour empêcher une redirection ouverte depuis
 * cleargo.fr. Mais l'onboarding ne vit pas sur la landing : sans cette base,
 * « /onboarding/populations » tomberait sur la page 404 du site vitrine.
 *
 * Non renseignée, le parcours propose l'envoi du lien par email plutôt qu'un
 * bouton qui ne mène nulle part.
 */
export const APP_BASE_URL: string | null =
  process.env.NEXT_PUBLIC_APP_BASE_URL?.replace(/\/$/, '') || null

// TODO: héberger le guide conformité et renseigner son lien de téléchargement.
export const GUIDE_CONFORMITE_URL: string | null = null

export const CONTACT_EMAIL = 'contact@cleargo.fr'
