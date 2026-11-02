export const RITE_IDS = [
  "vastu-shanti",
  "bhumi-puja",
  "shilanyas",
  "griha-pravesh",
  "renovation",
  "well",
  "shop",
] as const;

export type RiteId = (typeof RITE_IDS)[number];

export const RITES: { id: RiteId; label: string; hint: string; sa: string }[] = [
  { id: "vastu-shanti", label: "Vastu Shanti", hint: "Fire and mandala for a house already standing.", sa: "वास्तुशान्तिं" },
  { id: "bhumi-puja", label: "Bhumi puja", hint: "Asking the ground before any digging.", sa: "भूमिपूजां" },
  { id: "shilanyas", label: "Shilanyas", hint: "Setting the first stone.", sa: "शिलान्यासं" },
  { id: "griha-pravesh", label: "Griha pravesh", hint: "First entry into a house ready to live in.", sa: "गृहप्रवेशं" },
  { id: "renovation", label: "Renovation", hint: "Opening a wall, floor, or a new room.", sa: "गृहजीर्णोद्धारं" },
  { id: "well", label: "Well or bore", hint: "Breaking ground for water.", sa: "कूपखननं" },
  { id: "shop", label: "Shop opening", hint: "First lamp in a shop or office.", sa: "आपणारम्भं" },
];

export function isRite(value: unknown): value is RiteId {
  return typeof value === "string" && (RITE_IDS as readonly string[]).includes(value);
}

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
  "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
  "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati",
] as const;

export const NAKSHATRA_SA = [
  "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु",
  "पुष्य", "आश्लेषा", "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी", "हस्त",
  "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढा",
  "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वाभाद्रपदा",
  "उत्तराभाद्रपदा", "रेवती",
];

export const TITHI_NAMES = [
  "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami",
  "Ashtami", "Navami", "Dashami", "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi",
];

export const TITHI_SA = [
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी",
  "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी",
];

export function tithiName(index: number): string {
  if (index === 14) return "Purnima";
  if (index === 29) return "Amavasya";
  const paksha = index < 15 ? "Shukla" : "Krishna";
  return `${paksha} ${TITHI_NAMES[index % 15]}`;
}

export function tithiSa(index: number): string {
  if (index === 14) return "पूर्णिमा";
  if (index === 29) return "अमावास्या";
  return TITHI_SA[index % 15];
}

export const YOGAS = [
  "Vishkumbha", "Preeti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma",
  "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha",
  "Shukla", "Brahma", "Indra", "Vaidhriti",
];

export const RASIS = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena",
];

export const MASAS = [
  "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
  "Ashvina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
];

export const MASA_SA = [
  "चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद",
  "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन",
];

export const RITUS = ["Vasanta", "Grishma", "Varsha", "Sharad", "Hemanta", "Shishira"];
export const RITU_SA: Record<string, string> = {
  Vasanta: "वसन्त",
  Grishma: "ग्रीष्म",
  Varsha: "वर्ष",
  Sharad: "शरद्",
  Hemanta: "हेमन्त",
  Shishira: "शिशिर",
};

export const VARAS = ["Ravivara", "Somavara", "Mangalavara", "Budhavara", "Guruvara", "Shukravara", "Shanivara"];
export const VARA_SA = ["रवि", "सोम", "मङ्गल", "बुध", "गुरु", "शुक्र", "शनि"];
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const SAMVATSARA = [
  "Prabhava", "Vibhava", "Shukla", "Pramoda", "Prajapati", "Angirasa", "Shrimukha",
  "Bhava", "Yuva", "Dhata", "Ishvara", "Bahudhanya", "Pramathi", "Vikrama", "Vrisha",
  "Chitrabhanu", "Subhanu", "Tarana", "Parthiva", "Vyaya", "Sarvajit", "Sarvadhari",
  "Virodhi", "Vikrita", "Khara", "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukha",
  "Hevilambi", "Vilambi", "Vikari", "Sharvari", "Plava", "Shubhakrit", "Shobhakrit",
  "Krodhi", "Vishvavasu", "Parabhava", "Plavanga", "Kilaka", "Saumya", "Sadharana",
  "Virodhikrit", "Paridhavi", "Pramadicha", "Ananda", "Rakshasa", "Nala", "Pingala",
  "Kalayukti", "Siddharthi", "Raudra", "Durmati", "Dundubhi", "Rudhirodgari", "Raktakshi",
  "Krodhana", "Akshaya",
];

export const PREFERRED_NAK = new Set([0, 3, 4, 6, 7, 11, 12, 13, 14, 16, 20, 21, 22, 25, 26]);
export const AVOID_NAK = new Set([1, 2, 5, 8, 9, 17, 18]);
export const SOFT_NAK = new Set([10, 15, 19, 23, 24]);
export const BAD_YOGA = new Set([0, 5, 8, 9, 12, 14, 16, 18, 26]);
export const GOOD_YOGA = new Set([1, 2, 3, 4, 6, 7, 10, 11, 13, 15, 17, 19, 20, 21, 22, 23, 24, 25]);
