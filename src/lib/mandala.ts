export type Zone = "outer" | "inner" | "brahma";

export type Pada = {
  row: number;
  col: number;
  name: string;
  sa: string;
  zone: Zone;
  direction: string;
  limb: string | null;
  seats: number;
  note: string;
};

type DeitySeed = {
  sa: string;
  zone: Zone;
  seats: number;
  direction: string;
  limb: string | null;
  note: string;
};

const GRID = [
  ["Roga", "Naga", "Mukhya", "Bhallata", "Soma", "Bhujaga", "Aditi", "Diti", "Shikhi"],
  [
    "Papayakshma",
    "Rudra",
    "Rudra",
    "Prithvidhara",
    "Prithvidhara",
    "Prithvidhara",
    "Apah",
    "Apah",
    "Parjanya",
  ],
  [
    "Shosha",
    "Rudrajaya",
    "Rudrajaya",
    "Prithvidhara",
    "Prithvidhara",
    "Prithvidhara",
    "Apavatsa",
    "Apavatsa",
    "Jayanta",
  ],
  ["Asura", "Mitra", "Mitra", "Brahma", "Brahma", "Brahma", "Aryaman", "Aryaman", "Mahendra"],
  ["Varuna", "Mitra", "Mitra", "Brahma", "Brahma", "Brahma", "Aryaman", "Aryaman", "Surya"],
  ["Pushpadanta", "Mitra", "Mitra", "Brahma", "Brahma", "Brahma", "Aryaman", "Aryaman", "Satya"],
  ["Sugriva", "Indra", "Indra", "Vivasvat", "Vivasvat", "Vivasvat", "Savita", "Savita", "Bhrisha"],
  [
    "Dauvarika",
    "Indrajaya",
    "Indrajaya",
    "Vivasvat",
    "Vivasvat",
    "Vivasvat",
    "Savitra",
    "Savitra",
    "Antariksha",
  ],
  [
    "Pitru",
    "Mriga",
    "Bhringaraja",
    "Gandharva",
    "Yama",
    "Grihakshata",
    "Vitatha",
    "Pushan",
    "Agni",
  ],
] as const;

const catalog: Record<(typeof GRID)[number][number], DeitySeed> = {
  Roga: {
    sa: "रोग",
    zone: "outer",
    seats: 1,
    direction: "Northwest",
    limb: "Forearm",
    note: "Keep the northwest corner dry and swept; a damp bin on Roga is treated as the square that lets illness linger.",
  },
  Naga: {
    sa: "नाग",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Elbow",
    note: "Do not sink a pit or a sump under Naga; the floor stays whole and the offering sits on it.",
  },
  Mukhya: {
    sa: "मुख्य",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Palm",
    note: "If the north wall has one clear opening, let it fall near Mukhya rather than behind a tall cupboard.",
  },
  Bhallata: {
    sa: "भल्लाट",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Arm",
    note: "A quiet shelf of grain belongs on Bhallata; a grinder that shakes the wall does not.",
  },
  Soma: {
    sa: "सोम",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Shoulder",
    note: "Soma takes cool, pale things such as milk vessels, medicines, and white cloth, and not the stove.",
  },
  Bhujaga: {
    sa: "भुजग",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Neck",
    note: "Leave a walking strip along Bhujaga so the north offering is not laid on a coil of cable.",
  },
  Aditi: {
    sa: "अदिति",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Ear",
    note: "Set a water pot and a clean cloth on Aditi, and take broken vessels off that square before the rite.",
  },
  Diti: {
    sa: "दिति",
    zone: "outer",
    seats: 1,
    direction: "North",
    limb: "Eye",
    note: "Mark Diti, give it akshata, and do not turn it into a cupboard for things the household quarrels over.",
  },
  Shikhi: {
    sa: "शिखी",
    zone: "outer",
    seats: 1,
    direction: "Northeast",
    limb: "Head",
    note: "The head of the purusha is northeast, on Shikhi: leave that corner open to morning light, with no toilet and no heavy beam, and begin the outer offerings there.",
  },
  Papayakshma: {
    sa: "पापयक्ष्मा",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Wrist",
    note: "Wash Papayakshma before bali and do not stand a refuse bin on this west square.",
  },
  Parjanya: {
    sa: "पर्जन्य",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Eye",
    note: "Slope the east sill at Parjanya so rain leaves the house, and do not seal the square shut.",
  },
  Shosha: {
    sa: "शोष",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Flank",
    note: "Shosha dries what sits on it; keep fresh greens and a wet mop off this west square.",
  },
  Jayanta: {
    sa: "जयन्त",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Ear",
    note: "Jayanta will take a modest east niche for a lamp, not an alcove packed with boxes.",
  },
  Asura: {
    sa: "असुर",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Flank",
    note: "Honour Asura on the west and then leave the square plain; do not build the household shrine into it.",
  },
  Mahendra: {
    sa: "महेन्द्र",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Neck",
    note: "If the main door falls near Mahendra, keep the threshold clear and the bolt working.",
  },
  Varuna: {
    sa: "वरुण",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Thigh",
    note: "Water may pass near Varuna, but a leaking tap should not sit on the square itself.",
  },
  Surya: {
    sa: "सूर्य",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Shoulder",
    note: "Open the east shutter at Surya for the rite, and do not hang a dark curtain across the square.",
  },
  Pushpadanta: {
    sa: "पुष्पदन्त",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Knee",
    note: "Lay the flowers for bali on Pushpadanta, not under a shoe rack.",
  },
  Satya: {
    sa: "सत्य",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Arm",
    note: "Satya can hold a study seat or a quiet lamp; turn a television off before the homa if it faces this square.",
  },
  Sugriva: {
    sa: "सुग्रीव",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Shank",
    note: "Ease a slamming west door at Sugriva before the fire, then make the offering on a steady floor.",
  },
  Bhrisha: {
    sa: "भृश",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Palm",
    note: "Leave Bhrisha touchable; do not stack the day's fuel against this east square.",
  },
  Dauvarika: {
    sa: "दौवारिक",
    zone: "outer",
    seats: 1,
    direction: "West",
    limb: "Hip",
    note: "If a side door occupies Dauvarika, oil the bolt and clear the swing before bali.",
  },
  Antariksha: {
    sa: "अन्तरिक्ष",
    zone: "outer",
    seats: 1,
    direction: "East",
    limb: "Elbow",
    note: "Antariksha is the open east; avoid a false panel that seals the square if the wall can stay plain.",
  },
  Pitru: {
    sa: "पितृ",
    zone: "outer",
    seats: 1,
    direction: "Southwest",
    limb: "Foot",
    note: "The feet of the purusha are southwest, on Pitru: keep the corner heavy and quiet, with no well and no septic mouth.",
  },
  Mriga: {
    sa: "मृग",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Hip",
    note: "Do not make Mriga a passage people cross all afternoon; set the offering and leave the square still.",
  },
  Bhringaraja: {
    sa: "भृङ्गराज",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Thigh",
    note: "Give Bhringaraja its south mark and do not lean rusting iron on that stretch of wall.",
  },
  Gandharva: {
    sa: "गन्धर्व",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Knee",
    note: "A closed instrument may rest at Gandharva; a speaker left playing through the rite should not.",
  },
  Yama: {
    sa: "यम",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Thigh",
    note: "Keep Yama austere: a clean south wall, the bali placed and not eaten on the square.",
  },
  Grihakshata: {
    sa: "गृहक्षत",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Flank",
    note: "Fill cracks at Grihakshata before the fire, and do not hang a new load from a weak hook there.",
  },
  Vitatha: {
    sa: "वितथ",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Flank",
    note: "Do not leave the strongbox or the account book on Vitatha; mark the square and move valuables aside.",
  },
  Pushan: {
    sa: "पूषन्",
    zone: "outer",
    seats: 1,
    direction: "South",
    limb: "Wrist",
    note: "Set a vessel of grain on Pushan for the road, then offer it rather than leave it to sour.",
  },
  Agni: {
    sa: "अग्नि",
    zone: "outer",
    seats: 1,
    direction: "Southeast",
    limb: "Forearm",
    note: "The kitchen may neighbour Agni in the southeast, but the homa sits where the priest places the kunda, on a floor wiped of grease.",
  },
  Rudra: {
    sa: "रुद्र",
    zone: "inner",
    seats: 2,
    direction: "Northwest",
    limb: null,
    note: "Rudra's two northwest squares take a small offering; do not cut a new doorway through them on the day of the fire.",
  },
  Rudrajaya: {
    sa: "रुद्रजय",
    zone: "inner",
    seats: 2,
    direction: "Northwest",
    limb: null,
    note: "Mark Rudrajaya with Rudra and offer once for the pair; do not drive a nail through their joint that morning.",
  },
  Prithvidhara: {
    sa: "पृथ्वीधर",
    zone: "inner",
    seats: 6,
    direction: "North",
    limb: null,
    note: "Prithvidhara's six northern squares want a level floor; a sunken pit there works against the earth-bearer.",
  },
  Apah: {
    sa: "आप",
    zone: "inner",
    seats: 2,
    direction: "Northeast",
    limb: null,
    note: "A small clean pot may stand on Apah, never a drain that leaves the northeast square wet overnight.",
  },
  Apavatsa: {
    sa: "अपवत्स",
    zone: "inner",
    seats: 2,
    direction: "Northeast",
    limb: null,
    note: "Keep Apavatsa with Apah, both free of soap scum and of the washing pile.",
  },
  Mitra: {
    sa: "मित्र",
    zone: "inner",
    seats: 6,
    direction: "West",
    limb: null,
    note: "Mitra's six western squares suit a place to sit with others, not a locked room no one enters.",
  },
  Brahma: {
    sa: "ब्रह्म",
    zone: "brahma",
    seats: 9,
    direction: "Centre",
    limb: null,
    note: "Treat Brahma's nine squares as a single open seat in the plan: no pillar in the middle, no toilet, and no cupboard loaded against them.",
  },
  Aryaman: {
    sa: "अर्यमन्",
    zone: "inner",
    seats: 6,
    direction: "East",
    limb: null,
    note: "Aryaman's six eastern squares want a clear passage for a guest, not a wall that cuts the morning light.",
  },
  Indra: {
    sa: "इन्द्र",
    zone: "inner",
    seats: 2,
    direction: "Southwest",
    limb: null,
    note: "Keep Indra's two southwest squares firm underfoot, and do not excavate them for a soak pit.",
  },
  Indrajaya: {
    sa: "इन्द्रजय",
    zone: "inner",
    seats: 2,
    direction: "Southwest",
    limb: null,
    note: "Offer Indrajaya with Indra as one lordship, and do not split the pair with a new partition.",
  },
  Vivasvat: {
    sa: "विवस्वत्",
    zone: "inner",
    seats: 6,
    direction: "South",
    limb: null,
    note: "Vivasvat's six southern squares can take a solid floor; shift a high sleeping platform off that line if it blocks the rite.",
  },
  Savita: {
    sa: "सविता",
    zone: "inner",
    seats: 2,
    direction: "Southeast",
    limb: null,
    note: "During the homa, keep the kitchen flame from scorching Savita's southeast squares.",
  },
  Savitra: {
    sa: "सवितृ",
    zone: "inner",
    seats: 2,
    direction: "Southeast",
    limb: null,
    note: "Savitra stays with Savita, both clear of the ash bin until the final offering is finished.",
  },
};

export const padas: Pada[] = GRID.flatMap((names, row) =>
  names.map((name, col) => {
    const seed = catalog[name];
    return {
      row,
      col,
      name,
      sa: seed.sa,
      zone: seed.zone,
      direction: seed.direction,
      limb: seed.limb,
      seats: seed.seats,
      note: seed.note,
    };
  }),
);

export const outerClockwise: string[] = [
  "Shikhi",
  "Parjanya",
  "Jayanta",
  "Mahendra",
  "Surya",
  "Satya",
  "Bhrisha",
  "Antariksha",
  "Agni",
  "Pushan",
  "Vitatha",
  "Grihakshata",
  "Yama",
  "Gandharva",
  "Bhringaraja",
  "Mriga",
  "Pitru",
  "Dauvarika",
  "Sugriva",
  "Pushpadanta",
  "Varuna",
  "Asura",
  "Shosha",
  "Papayakshma",
  "Roga",
  "Naga",
  "Mukhya",
  "Bhallata",
  "Soma",
  "Bhujaga",
  "Aditi",
  "Diti",
];

const deityOrder = [
  ...outerClockwise,
  "Apah",
  "Apavatsa",
  "Savita",
  "Savitra",
  "Indra",
  "Indrajaya",
  "Rudra",
  "Rudrajaya",
  "Prithvidhara",
  "Aryaman",
  "Vivasvat",
  "Mitra",
  "Brahma",
];

const firstPada = new Map<string, Pada>();
for (const pada of padas) {
  if (!firstPada.has(pada.name)) firstPada.set(pada.name, pada);
}

export const deities: {
  name: string;
  sa: string;
  zone: Zone;
  seats: number;
  direction: string;
  note: string;
}[] = deityOrder.map((name) => {
  const pada = firstPada.get(name);
  if (!pada) throw new Error(`missing deity ${name}`);
  return {
    name: pada.name,
    sa: pada.sa,
    zone: pada.zone,
    seats: pada.seats,
    direction: pada.direction,
    note: pada.note,
  };
});
