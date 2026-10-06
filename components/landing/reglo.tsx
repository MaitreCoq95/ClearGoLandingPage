/**
 * Réglo, la mascotte ClearGo : le hérisson à casquette et gilet orange.
 *
 * Les poses viennent du dépôt SaaS (`cleargo_frontend/public/reglo/`), source
 * de vérité de la mascotte. Ne jamais le remplacer par un pictogramme : un
 * dessin au trait nommé « reglo » a circulé ici du 03/09 au 06/10 sans être
 * Réglo.
 */

export type RegloPose =
  | 'bouclier'
  | 'bras-croises'
  | 'gilet-pointe'
  | 'loupe'
  | 'pause'
  | 'pointe'
  | 'pouce'
  | 'presse-papiers'
  | 'souci'
  | 'tablette'
  | 'telephone'

interface RegloProps {
  pose: RegloPose
  /** Hauteur en pixels ; la largeur suit les proportions de la pose. */
  height: number
  className?: string
}

export function Reglo({ pose, height, className }: RegloProps) {
  return (
    <img
      src={`/images/reglo/reglo-${pose}.webp`}
      alt=""
      aria-hidden="true"
      style={{ height, width: 'auto' }}
      className={className}
      loading="lazy"
    />
  )
}
