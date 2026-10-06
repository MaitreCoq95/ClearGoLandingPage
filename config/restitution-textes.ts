/**
 * Textes de la restitution en trois blocs (décision B5) — COPIE GÉNÉRÉE.
 *
 * Source de vérité : dépôt Yo-TR/ClearGo,
 *   cleargo_frontend/src/constants/landing/restitution.js
 * elle-même issue du Cerveau ClearGo :
 *   50-espaces/vivien/2026-09-25 Textes de restitution V0.md
 * 18 textes validés par Vivien le 25/09/2026, sourcés (sources non affichées,
 * conservées dans le Cerveau).
 *
 * NE PAS MODIFIER À LA MAIN. Ce fichier est généré par import du module du
 * SaaS : aucune phrase n’a été ressaisie. Une correction se fait d’abord dans
 * le SaaS, avec nouvelle validation de Vivien, puis se recopie ici.
 *
 * Titres des blocs : version validée de main (25/09). Les titres revus après
 * le test du 27/09 sont encore « à valider par Vivien » dans la PR #25 du SaaS.
 */

export const TITRES_BLOCS = {
  compris: 'Ce que nous avons compris',
  revelation: 'Le point que vous ne saviez peut-être pas',
  aVerifier: 'Ce qu’il reste à vérifier',
} as const

export const OUVERTURES: Record<string, string> = {
  "donneur_ordre": "Votre client vous demande un dossier : voici un point qu’il regardera.",
  "appels_offres": "Dans un appel d’offres, voici un point que l’acheteur vérifiera.",
  "controle": "Lors d’un contrôle, voici un point sur lequel on vous interrogera.",
  "savoir_ou_jen_suis": "Voici un point qui s’applique à votre activité, et qu’on ne vous a peut-être jamais expliqué.",
  "prouver_qualite": "Pour décrocher un client qui exige des preuves, voici un point sur lequel il vous jugera."
}

export const BRIQUES: Record<string, string[]> = {
  "R1": [
    "Votre conformité vit à trois rythmes qui ne se croisent jamais : celui de l’entreprise, celui de vos véhicules, celui de vos conducteurs. Le contrôle technique d’un poids lourd revient tous les ans. La formation continue d’un conducteur, tous les cinq ans. Sa carte conducteur doit être déchargée au plus tous les vingt-huit jours. Et l’attestation de vigilance d’un sous-traitant se redemande tous les six mois.",
    "C’est pour cela qu’un dossier complet le lundi peut ne plus l’être le vendredi. Personne n’a rien oublié : une échéance est simplement tombée entre-temps. Un dossier de conformité n’est pas un classeur qu’on remplit une fois, c’est un calendrier qui tourne.",
    "Quand un client vous demande votre dossier, il ne veut pas un état des lieux de l’année : il veut votre situation à la date où il pose la question. C’est un autre exercice, et c’est celui qui fait gagner ou perdre des affaires."
  ],
  "R2": [
    "Transporter de la nourriture fait de vous un exploitant du secteur alimentaire, au même titre que le fabricant. Le transport est une étape de la chaîne, avec ses propres règles d’hygiène et une maîtrise des risques fondée sur l’HACCP — même si vous ne touchez jamais au produit. Si vous transportez des denrées d’origine animale, votre activité se déclare en plus auprès de la DDPP de votre département. Et pour les denrées périssables sous température, vos engins doivent être conformes à l’accord ATP, y compris pour un transport en France : l’attestation est l’une des premières pièces qu’un client vous réclamera.",
    "Beaucoup de transporteurs pensent que l’hygiène alimentaire est l’affaire de l’industriel ou du grossiste. C’est l’inverse : votre client doit pouvoir démontrer que chaque maillon de sa chaîne est maîtrisé, et vous en êtes un. Ses auditeurs regardent votre plan de nettoyage, vos relevés de température et vos procédures.",
    "Ce qu’on vous réclame n’est donc pas un caprice de client : c’est la retombée de sa propre obligation sur vous. Et à prix égal, le transporteur qui sait présenter ces éléments passe devant celui qui ne les a pas."
  ],
  "R3": [
    "Quand vous transportez des médicaments pour un distributeur ou un laboratoire, vous n’avez ni agrément ni autorisation pharmaceutique à obtenir : les bonnes pratiques de distribution s’adressent à votre client, pas à vous. Mais elles lui imposent de vous évaluer avant de vous confier ses produits, de signer avec vous un contrat écrit qui reprend toutes ses exigences de transport, et de pouvoir vous auditer à tout moment.",
    "Le renversement est là : ce qui n’est pas une obligation légale pour vous devient une obligation contractuelle. Et c’est à vous d’en apporter les preuves, parce que votre client est inspecté sur la manière dont vous travaillez.",
    "Concrètement, on vous demandera des véhicules adaptés et, pour les produits sous température dirigée, un équipement qualifié avec une cartographie des températures qui tient compte des saisons ; des enregistreurs de température étalonnés au moins une fois par an ; une procédure écrite quand la température sort de sa plage, avec un signalement à votre client ; une analyse des risques de vos itinéraires. Rien de tout cela n’est dans le code des transports. Tout cela est dans votre contrat."
  ],
  "R4": [
    "L’ADR ne concerne pas seulement les citernes et les colis étiquetés « danger » bien en vue. Des aérosols ou des produits d’entretien expédiés en quantités limitées, des batteries au lithium, de la neige carbonique qui garde un chargement au froid : tout cela en relève, avec des règles allégées mais réelles — et souvent sans que personne ne vous prévienne.",
    "Vous ne décidez pas de faire de l’ADR : c’est la marchandise qu’on vous confie qui décide. Et l’allègement ne se calcule pas colis par colis, mais sur l’ensemble de votre véhicule. Quand le total des marchandises dangereuses à bord dépasse le seuil, l’exemption tombe pour tout le chargement — et certaines matières la font tomber dès le premier colis.",
    "Dans ces régimes allégés, pas de certificat ADR pour le conducteur ni de conseiller à la sécurité à désigner. Mais il reste des obligations à votre charge : une formation adaptée de votre personnel ; un document de transport et un extincteur supplémentaire quand vous bénéficiez de l’exemption par quantités ; un marquage du véhicule au-delà de 8 tonnes de colis en quantités limitées sur un véhicule de plus de 12 tonnes ; et pour la neige carbonique, un véhicule ventilé ou, à défaut, une marque d’avertissement à chaque accès. Ce n’est pas le régime complet. Ce n’est pas rien non plus."
  ],
  "R5": [
    "Celui qui vous confie ses déchets ne s’en libère pas en les chargeant dans votre camion : la loi le rend responsable jusqu’à leur élimination ou leur valorisation finale, même une fois confiés à un tiers. Et elle l’oblige à vérifier que celui à qui il les remet est en règle.",
    "C’est ce qui explique que vos clients déchets soient plus exigeants que les autres, et qu’ils vous demandent des justificatifs que personne d’autre ne réclame. Ils ne se méfient pas de vous : ils constituent leur propre preuve, et vous en faites partie.",
    "De votre côté, trois obligations vous appartiennent en propre. Au-delà de 100 kg de déchets dangereux ou de 500 kg de déchets non dangereux par chargement, votre activité se déclare en préfecture, la déclaration se renouvelle tous les cinq ans, et une copie du récépissé doit être à bord de chaque véhicule. Vous tenez un registre chronologique de ce que vous transportez, dangereux ou non. Et pour les déchets dangereux, vous complétez le bordereau électronique dans Trackdéchets à chaque enlèvement — c’est la première chose que votre client vérifiera."
  ],
  "R6": [
    "En France, si rien d’autre n’a été convenu par écrit, votre responsabilité en cas de perte ou d’avarie est plafonnée par un contrat type : pour un envoi de moins de trois tonnes, 33 euros par kilo et 1 000 euros par colis au maximum ; sous température dirigée, 23 euros par kilo et 750 euros par colis. Sur une marchandise de valeur, ce plafond n’a aucun rapport avec ce que vous transportez.",
    "Beaucoup de transporteurs pensent que leur assurance couvre le chargement. Elle couvre leur responsabilité — donc dans la limite de ce plafond, pas de la valeur réelle. L’écart n’apparaît qu’au moment du sinistre.",
    "Trois choses ne se confondent pas : votre responsabilité, plafonnée sauf faute inexcusable ; la déclaration de valeur, qui remplace le plafond par le montant déclaré, à condition d’être faite par écrit au plus tard à la conclusion du contrat, contre un prix convenu ; et l’assurance de la marchandise elle-même, dite ad valorem, souscrite pour le compte de votre client. Le client averti vous demandera l’une ou l’autre. Celui qui ne demande rien se croit souvent couvert — et le jour du sinistre, c’est vers vous qu’il se tournera."
  ],
  "R7": [
    "En vrac, le risque que vos clients regardent en premier n’est pas la perte du chargement : c’est ce que votre citerne ou votre benne contenait avant. Pour les denrées alimentaires, la loi exige un contenant réservé aux denrées et marqué comme tel, et un nettoyage efficace dès que le chargement précédent était différent. Pour les aliments pour animaux, votre activité de transport s’enregistre en plus auprès de la DDPP.",
    "Mais ce que vos clients exigent va plus loin que la loi. Dans l’alimentation animale, leurs référentiels — GMP+, Qualimat — s’appuient sur une base commune qui classe chaque produit : certains sont interdits comme chargement précédent, les autres imposent un niveau de nettoyage minimal, du simple balayage à la désinfection.",
    "Ce qu’on vous demandera de prouver, ce n’est donc pas que vous lavez, c’est que vous tracez : le dernier chargement et le nettoyage effectué, et même les trois derniers pour un client certifié GMP+. Votre carnet de nettoyage devient une preuve commerciale autant qu’une preuve sanitaire."
  ],
  "R8": [
    "En confiant un transport à un partenaire, vous ne vous en déchargez pas. Si vous l’organisez en tant que commissionnaire, vous restez garant devant votre client des pertes et des avaries, sauf clause contraire ou force majeure.",
    "Et vous portez une obligation qui surprend beaucoup d’organisateurs : vérifier votre sous-traitant n’est pas une formalité d’entrée en relation. Dès 5 000 euros hors taxes, cela se fait à la signature, puis tous les six mois jusqu’à la fin du contrat : une attestation de vigilance de l’URSSAF de moins de six mois, dont vous vérifiez l’authenticité, et une preuve d’immatriculation. Un dossier constitué une fois au démarrage ne suffit pas.",
    "L’enjeu n’est pas administratif. Si votre sous-traitant est verbalisé pour travail dissimulé et que vous n’avez pas fait ces vérifications, vous pouvez être tenu solidairement de ses cotisations, de ses impôts et des salaires dus, à proportion de la prestation. C’est l’un des rares domaines où une attestation manquante vous coûte directement de l’argent."
  ],
  "R9": [
    "Transport bilatéral, cabotage et détachement sont trois régimes distincts, que beaucoup confondent — y compris certains donneurs d’ordre.",
    "Deux tournées qui se ressemblent peuvent relever de règles opposées. Aller livrer à l’étranger et revenir, c’est du transport bilatéral : vos conducteurs ne sont pas détachés. Réaliser une livraison intérieure dans un autre pays, c’est du cabotage — trois opérations au plus dans les sept jours qui suivent une livraison internationale, puis quatre jours sans cabotage dans ce pays — et là, vos conducteurs sont détachés : déclaration en ligne avant le départ, documents à bord, et les éléments de rémunération obligatoires du pays d’accueil.",
    "Le contrôle a lieu à l’étranger, par une autorité qui n’appliquera pas votre lecture des textes. Deux points que beaucoup ignorent : depuis le 1er juillet 2026, les utilitaires de plus de 2,5 tonnes qui font de l’international pour le compte d’autrui relèvent des temps de conduite et du tachygraphe ; et votre responsabilité en cas de perte est plafonnée par la convention CMR à environ dix euros par kilo."
  ],
  "VEHICULES": [
    "Pour le transport de véhicules sur porte-voitures, un contrat type spécifique s’applique si rien d’autre n’a été convenu par écrit. Il repose sur un point que beaucoup traitent à la légère : le constat contradictoire de l’état apparent du véhicule, par écrit, à l’enlèvement et à la fin du déchargement.",
    "Tout se joue là : c’est ce constat qui dira si une rayure existait déjà ou si elle est apparue pendant le transport. À la livraison, les réserves doivent être précises et motivées. Sans elles, le destinataire peut encore agir dans les trois jours par lettre recommandée, mais c’est à lui de prouver le dommage.",
    "Votre responsabilité est plafonnée : à la valeur de remplacement hors taxes au tarif constructeur pour un véhicule neuf, à sa dernière cote L’Argus pour un véhicule d’occasion, à 1 000 euros pour un véhicule sans cote et pour les autres dommages — sauf déclaration de valeur. Un constat bâclé ne se rattrape pas après coup : c’est la pièce que votre client et son assureur regarderont en premier."
  ],
  "C2": [
    "Vos deux sujets se cumulent d’une façon qui passe souvent inaperçue : votre obligation de vigilance ne s’arrête pas à la frontière. Un partenaire établi à l’étranger se vérifie lui aussi tous les six mois, avec des pièces équivalentes : son numéro de TVA intracommunautaire, la preuve de sa situation sociale dans son pays — par exemple le formulaire A1 —, et la preuve de son immatriculation, en français ou traduites.",
    "S’y ajoute le détachement. Quand un transporteur étranger fait du cabotage en France, c’est à lui de déclarer ses conducteurs. Mais la loi assimile le destinataire de la marchandise au donneur d’ordre pour le paiement des salaires et l’hébergement des conducteurs : selon votre place dans la chaîne, cela peut être vous.",
    "C’est le cumul qui crée le risque, pas chacun des deux sujets pris séparément."
  ],
  "C3": [
    "Vous cumulez plusieurs périmètres sensibles, et c’est ce cumul qui demande de l’organisation, plus que chacun d’eux pris à part.",
    "Chaque périmètre apporte ses propres échéances, ses propres preuves et ses propres interlocuteurs. Pris un par un, aucun n’est ingérable. Ensemble, ils forment un calendrier que personne ne tient de tête.",
    "Dans votre situation, le risque n’est pas l’obligation que vous ignorez : c’est l’échéance que vous connaissiez et que vous n’avez pas vue passer."
  ]
}

export const BLOC1_MARCHANDISES: Record<string, string> = {
  "generales": "des marchandises générales",
  "alimentaire": "des denrées alimentaires",
  "pharma": "des produits pharmaceutiques et de santé",
  "adr": "des matières dangereuses",
  "dechets": "des déchets",
  "vehicules": "des véhicules",
  "valeur": "des marchandises de valeur",
  "vrac": "des produits en vrac",
  "autre": "des marchandises"
}

export const BLOC1_ZONES: Record<string, string> = {
  "local": "en local",
  "regional": "en régional",
  "national": "à l’échelle nationale",
  "frontalier": "en frontalier",
  "europe": "en Europe",
  "hors_europe": "hors d’Europe",
  "international": "à l’international"
}

export const BLOC1_MODES: Record<string, string> = {
  "execute": "avec vos propres véhicules",
  "mixte": "avec vos véhicules et en sous-traitant une partie de vos transports",
  "soustraite_partie": "avec vos véhicules et en sous-traitant une partie de vos transports",
  "commissionnaire": "en organisant des transports que vous confiez à des partenaires",
  "organisateur": "en organisant des transports que vous confiez à des partenaires"
}

export const BLOC1_TRANCHES: Record<string, string> = {
  "1-5": "de 1 à 5",
  "6-20": "de 6 à 20",
  "21-50": "de 21 à 50",
  "51-200": "de 51 à 200",
  "plus200": "plus de 200",
  "plus50": "plus de 50"
}

export const BLOC1_GABARIT = {
  "debutActivite": "Vous transportez",
  "debutFlotte": "Votre flotte compte",
  "vehicules": "véhicules",
  "surtout": "surtout",
  "et": "et",
  "sansFlotte": "Vous n’avez aucun véhicule en propre."
} as const

export const BLOC3 = {
  singulier: "1 périmètre réglementaire s’applique à votre activité.",
  sansNombre: "Plusieurs périmètres réglementaires s’appliquent à votre activité.",
  pluriel: (n: number) => `${n} périmètres réglementaires s’appliquent à votre activité.`,
  suite: "Pour chacun, ClearGo vous indique les preuves attendues et suit leurs échéances. Vous les retrouverez dans votre compte gratuit.",
} as const
