export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "mantra"; sa: string; ia: string; sense: string; count?: string }
  | { kind: "table"; caption: string; headers: string[]; rows: string[][] }
  | { kind: "note"; text: string };

export type Chapter = { id: string; kicker: string; title: string; lede: string; blocks: Block[] };

export const chapters: Chapter[] = [
  {
    id: "before",
    kicker: "The day before",
    title: "Fix the morning, then clear the house",
    lede: "The Dates page lists mornings still ahead for the city you choose. This chapter is what the household does once a morning is taken.",
    blocks: [
      {
        kind: "p",
        text: "The yajamana and his wife sit the rite. She sits on his right. One acharya conducts. A few brahmanas may come for the blessing. Children, the ill, and elders are not made to fast. The couple take no food until the final offering. Water is allowed.",
      },
      {
        kind: "list",
        items: [
          "Washed cotton or silk. Nothing black worn for the rite. No leather onto the mandala.",
          "Sweep every room that is in use, including the ones guests never see. The northeast stays open. Nothing rotting sits on the north.",
          "Fresh ghee, lamp oil, a pot of water, and a thick cloth or a small extinguisher within reach of the fire.",
          "The Dates desk avoids Amavasya, the empty tithis (4, 9, 14), a working hour inside Vishti, Tuesday for breaking earth, and an extra lunar month. Preferred stars are Rohini, Mrigashira, Pushya, the three Uttara, Hasta, Chitra, Swati, Anuradha, Shravana, Dhanishta and Revati.",
        ],
      },
      {
        kind: "note",
        text: "A birth-star check belongs to the family’s priest. Enter the stars on the Dates page if you want that filter, and still let him confirm it. This rite does not move a door, legalise a well under a kitchen, or make a cracked beam safe.",
      },
    ],
  },
  {
    id: "room",
    kicker: "The floor",
    title: "Where each object sits",
    lede: "Use the centre of the hall if it is empty. Otherwise use the northeast of the largest room. The yajamana faces east.",
    blocks: [
      {
        kind: "table",
        caption: "Seats, looking at the room",
        headers: ["Place", "What sits there"],
        rows: [
          ["Northeast of the cloth", "Ganapati and the main kalasha on a low plank"],
          ["In front of the couple", "The eighty-one squares, north edge of the cloth toward the north of the room"],
          ["Southeast of the cloth", "The fire pit, not under a curtain or a synthetic canopy"],
          ["Northeast of the pit", "Nine small heaps for the planets"],
          ["Beside Ganapati", "A second kalasha for the blessing water"],
        ],
      },
      {
        kind: "p",
        text: "Some paddhatis turn the cloth so east is at the top. Follow the priest who is sitting the fire. The wife’s hand rests on the husband’s right arm during the vow and during each offering.",
      },
      {
        kind: "note",
        text: "A closed bedroom in a high-rise is a poor fire pit. Use a metal or brick pit on a bed of sand. If a real fire is not lawful, stop at the kalasha, the mandala and the food offerings. Do not pretend with a candle on a plastic plate.",
      },
      {
        kind: "p",
        text: "For a house, the pit is a span to a cubit, square. Three lines are drawn in the sand east to west before the fire is set. The flame is taken from the ghee lamp that was lit at the beginning, with camphor, not a match waved over the wood.",
      },
    ],
  },
  {
    id: "vow",
    kicker: "First sitting",
    title: "Purity, breath, and the vow",
    lede: "The lamp is lit first and burns until the closing. The bell is touched with sandal and unbroken rice, then sounded once.",
    blocks: [
      {
        kind: "steps",
        items: [
          { title: "Sipping", text: "The first three names are sipped. The remaining names follow the family’s sutra, which is not the same in Apastamba and Baudhayana. The priest’s sutra wins." },
          { title: "Seat", text: "A pinch of rice goes over the left shoulder, quietly, so the seat is left to the rite. Sprinkle the seat, the hands, the vessels and the cloth." },
          { title: "Breath", text: "Three rounds of Gayatri. In by the left nostril, hold, out by the right. Touch the ears after. A house rite does not need a longer count." },
          { title: "Vow", text: "The right palm, or a copper spoon, holds water, rice, one flower and a coin. The wife’s hand is on his right arm. Say, in your own language, that you are asking the site to be a quiet place to live — not claiming a miracle. Pour the water into a plate. Sip again." },
        ],
      },
      {
        kind: "mantra",
        sa: "ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥",
        ia: "Om bhur bhuvah svah. Tat savitur varenyam bhargo devasya dhimahi. Dhiyo yo nah prachodayat.",
        sense: "We meditate on the light of the sun that is worthy of choice. May that light set our thought straight.",
        count: "Three rounds with the breath",
      },
      {
        kind: "table",
        caption: "The twenty-four names",
        headers: ["Names", "Hand"],
        rows: [
          ["Keśava, Nārāyaṇa, Mādhava", "Sip"],
          ["Govinda, Viṣṇu, Madhusūdana, Trivikrama, Vāmana, Śrīdhara, Hṛṣīkeśa, Padmanābha, Dāmodara", "As the sutra directs"],
          ["Saṅkarṣaṇa, Vāsudeva, Pradyumna, Aniruddha, Puruṣottama, Adhokṣaja, Narasiṃha, Acyuta, Janārdana, Upendra, Hari, Śrī Kṛṣṇa", "As the sutra directs"],
        ],
      },
      {
        kind: "h",
        text: "The sixteen, used again later",
      },
      {
        kind: "p",
        text: "Ganapati sits northeast: a turmeric mound or a betel nut on rice and a betel leaf. The sixteen offerings, once: meditation, invitation, a seat, water for the feet, water for the hands, a sip, a bath, cloth, a cotton thread as the sacred thread, sandal, rice and a flower, incense, a lamp, food (a banana or jaggery), betel, and a bow with a short walk around. Camphor is waved at the end. Later sections say “the sixteen” and mean this list, with the name changed.",
      },
      {
        kind: "mantra",
        sa: "ॐ गं गणपतये नमः",
        ia: "Om gam Ganapataye namah",
        sense: "Salutation to Ganapati.",
      },
      {
        kind: "note",
        text: "If you are alone with one priest, he gives the blessing himself. If others are present they answer “astu” three times. Sprinkle kalasha water with mango leaves, from the northeast, on the couple, the materials, and a quick round of the rooms in daily use. Do not soak the house.",
      },
    ],
  },
  {
    id: "land",
    kicker: "Second sitting",
    title: "The ground, the cow, and the guardians",
    lede: "A clean spot at the centre or the northeast takes a betel leaf, a nut, turmeric and kumkum.",
    blocks: [
      {
        kind: "mantra",
        sa: "ॐ पृथ्वीदेव्यै च विद्महे सहस्रमूर्त्यै च धीमहि । तन्नो भूमिः प्रचोदयात् ॥",
        ia: "Om prithvidevyai cha vidmahe sahasramurtyai cha dhimahi. Tanno bhumih prachodayat.",
        sense: "A house form of the earth’s Gayatri.",
        count: "Eleven times in a house. A priest may take one hundred and eight.",
      },
      {
        kind: "mantra",
        sa: "उत्तिष्ठ भूमिदेवि अस्मिन् गृहक्षेत्रे जाग्रता भव प्रसन्ना भव ।",
        ia: "Uttishtha bhumidevi asmin grihakshetre jagrita bhava prasanna bhava.",
        sense: "A householder’s request, not a Veda: earth, be awake and pleased in this site.",
      },
      {
        kind: "p",
        text: "If panchagavya can be had cleanly — minute amounts of cow dung, urine, milk, curd and ghee, mixed by the priest — a spoon is offered. If not, use clean water with a drop of milk and say what you substituted. Do not block the rite for want of it.",
      },
      {
        kind: "p",
        text: "A gentle cow, if one can be brought without crowding her: turmeric and kumkum on the forehead, a banana or grass, three rounds, and a walk through the main rooms only if she is calm. She leaves the way she came. Never strike her. If no cow can come, skip that honour.",
      },
      {
        kind: "mantra",
        sa: "नमो गोभ्यः श्रीमतीभ्यः सौरभेयीभ्य एव च ।",
        ia: "Namo gobhyah shrimatibhyah saurabheyibhya eva cha.",
        sense: "Salutation to the cows.",
      },
      {
        kind: "p",
        text: "A coconut on a rice svastika in the northeast, covered with a white cloth, can stay until the next morning as a witness that the guardians were asked. It is a witness, not the shanti. Families who do not do it skip it. Three times the priest asks, in words, whether the site accepts the household.",
      },
      {
        kind: "p",
        text: "A pinch of yellow mustard is tossed outward to the left, then a touch or a toss toward ten directions — east, southeast, south, southwest, west, northwest, north, northeast, up, and down — with “Om” and the guardian’s name and “namah”. Indra, Agni, Yama, Nirriti, Varuna, Vayu, Soma, Ishana cover the eight, and the up and down are named as the priest does. Leave a vent unless wind would blow the fire.",
      },
      {
        kind: "note",
        text: "Kshetrapala receives a little curd-rice, black sesame and urad just outside, usually at the southwest outer corner or beyond the threshold. The lamp for him stays outside, not in the bedding.",
      },
    ],
  },
  {
    id: "mandala",
    kicker: "Third sitting",
    title: "Eighty-one squares and the nine planets",
    lede: "Brahma holds the central nine. Aryaman east, Vivasvat south, Mitra west and Prithvidhara north hold six each. Eight corner lords hold two each. Thirty-two guardians hold the outer ring. The head lies northeast, the feet southwest.",
    blocks: [
      {
        kind: "p",
        text: "Worship the outer ring from Shikhi, clockwise, then the corner lords, then the four direction lords, then Brahma as one seat. At each square: one grain of unbroken rice and, if flowers are plenty, one petal. The formula is said once and the name changes. Do not recite eighty-one different texts. A betel nut, or a small silver or copper piece, lies on Brahma’s squares, head toward the northeast. The Mandala page of this desk is one classical allotment. Regional books shift a border square.",
      },
      {
        kind: "mantra",
        sa: "ॐ वास्तुपुरुषाय विद्महे भूमिपुत्राय धीमहि । तन्नो वास्तुः प्रचोदयात् ॥",
        ia: "Om vastupurushaya vidmahe bhumiputraya dhimahi. Tanno vastuh prachodayat.",
        sense: "Gayatri of the Vastu person.",
        count: "Eleven in the short house form. One hundred and eight if the priest keeps the long form.",
      },
      {
        kind: "p",
        text: "Five touches are enough in a house if the priest does not do the longer limb list: feet, knees, navel, heart, head. The sixteen are offered to the Vastu person as one seat, addressed together as the lords of the inner and outer mandala.",
      },
      {
        kind: "table",
        caption: "One common seating of the nine. It is not the only one.",
        headers: ["Planet", "Place", "Grain", "Wood, if you can get it"],
        rows: [
          ["Sun", "Centre", "Wheat", "Arka"],
          ["Moon", "Southeast", "Rice", "Palasha"],
          ["Mars", "South", "Red gram", "Khadira"],
          ["Mercury", "Northeast", "Mung", "Apamarga"],
          ["Jupiter", "North", "Chickpea", "Ashvattha"],
          ["Venus", "East", "Rice or barley", "Udumbara"],
          ["Saturn", "West", "Sesame", "Shami"],
          ["Rahu", "Southwest", "Urad", "Durva"],
          ["Ketu", "Northwest", "Horse-gram", "Kusha"],
        ],
      },
      {
        kind: "mantra",
        sa: "ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च । गुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु ॥",
        ia: "Brahma muraris tripurantakari bhanuh shashi bhumisuto budhash cha. Gurush cha shukrah shanirahu ketavah sarve grahah shantikara bhavantu.",
        sense: "May Brahma, Vishnu, Shiva and the nine planets be makers of peace.",
      },
      {
        kind: "note",
        text: "If the named wood cannot be had, ghee and sesame still carry the offering. The sixteen are done once for the group unless the priest separates the nine.",
      },
    ],
  },
  {
    id: "fire",
    kicker: "Fourth sitting",
    title: "The fire, in an order a house can finish",
    lede: "The yajamana offers with the thumb and the two fingers beside it. The wife touches the right arm. Every offering ends with svaha, and the quiet sense that this is not mine.",
    blocks: [
      {
        kind: "table",
        caption: "Counts. The longer number is the classical shanti. The shorter is a bridge when a household cannot sustain it, not a rival scripture.",
        headers: ["Offering", "House", "Full"],
        rows: [
          ["Agni seated, one stick of wood", "1", "1"],
          ["Ghee toward Prajapati, Indra, Agni, Soma", "1 each", "1 each"],
          ["Bhuh, bhuvah, svah, and the three together", "1 each", "1 each"],
          ["Ganapati — Om gam Ganapataye svaha", "21", "28"],
          ["Each of the nine, ghee and sesame if the wood is missing", "8", "28"],
          ["Vastoshpati, the principal, with the Rig verse and svaha", "28", "108"],
          ["Guardians, Om and the name and svaha", "Outer 32", "All 45"],
          ["Gayatri, ghee and sesame", "28", "108"],
          ["Mahamrityunjaya, ghee, sesame, durva", "28", "108"],
          ["What was dropped or mispronounced, bhuh bhuvah svah svaha", "3", "3"],
        ],
      },
      {
        kind: "mantra",
        sa: "ॐ वास्तोष्पते प्रतिजानीह्यस्मान्स्वावेशो अनमीवो भवा नः । यत् त्वेमहे प्रति तन्नो जुषस्व शं नो भव द्विपदे शं चतुष्पदे ॥",
        ia: "Om vastoshpate pratijanihy asman svavesho anamivo bhava nah. Yat tvemahe prati tan no jushasva sham no bhava dvipade sham chatushpade.",
        sense: "Lord of the dwelling, know us. Be a good entrance, without sickness. What we ask, accept. Be kind to our two-footed and four-footed.",
        count: "With svaha at each offering. 28 or 108.",
      },
      {
        kind: "mantra",
        sa: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
        ia: "Om tryambakam yajamahe sugandhim pushtivardhanam. Urvarukam iva bandhanan mrityor mukshiya ma amritat.",
        sense: "We worship the fragrant three-eyed one who increases nourishment. Like a cucumber from its stem, may I be released from death, not from the deathless.",
        count: "28 or 108, with ghee, sesame and durva.",
      },
      {
        kind: "note",
        text: "The priest uses the protective verse of his own shakha. Do not invent one. One offering goes to Agni who makes the offering right. The final pour is a dry coconut smeared and filled with ghee, or a full ladle if a coconut would overflow a small pit. Stand still until the flame settles. Then the couple may sip water.",
      },
    ],
  },
  {
    id: "seal",
    kicker: "Fifth sitting",
    title: "Food for the guardians, water for the rooms, a gourd on the door",
    lede: "Curd-rice with a little boiled urad and turmeric, in leaf cups or on spare betel leaves, follows the same order as the mandala.",
    blocks: [
      {
        kind: "mantra",
        sa: "ॐ [name] नमः । इमं बलिं समर्पयामि ।",
        ia: "Om [name] namah. Imam balim samarpayami.",
        sense: "The name changes. The formula does not. I offer this portion.",
      },
      {
        kind: "list",
        items: [
          "Eight direction guardians at the edge of the cloth. Kshetrapala outside.",
          "Do not leave food where a child or a dog will be blamed for eating it. The priest decides what is immersed and what birds may take, away from the walkway.",
          "Remaining kalasha water, with mango leaves and the peace verse, goes first to the couple, then to thresholds of rooms in daily use, clockwise from the northeast. A spoonful, not a bucket.",
          "A small durable plate may go on the northeast wall or the northeast of the puja shelf. Not on a bathroom floor. Not under a staircase. If you will not keep one, close without it.",
          "Camphor or a ghee lamp, three times clockwise. The couple see the flame. The Vastoshpati verse may be said again with flowers. Three rounds of the mandala, not of the whole building unless the priest leads it.",
        ],
      },
      {
        kind: "mantra",
        sa: "आवाहनं न जानामि न जानामि विसर्जनम् । पूजाञ्चैव न जानामि क्षमस्व परमेश्वर ॥",
        ia: "Avahanam na janami na janami visarjanam. Pujam chaiva na janami kshamasva parameshvara.",
        sense: "A traditional closing, not a claim of a particular Veda: I do not know the inviting or the sending away or the worship. Forgive.",
      },
      {
        kind: "mantra",
        sa: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
        ia: "Om purnam adah purnam idam purnat purnam udachyate. Purnasya purnam adaya purnam evavashishyate. Om shantih shantih shantih.",
        sense: "That is full, this is full. From the full, the full is taken. The full remains. Peace, peace, peace.",
      },
      {
        kind: "p",
        text: "An ash gourd with its stalk, washed, three lines of turmeric, a kumkum dot and a flower, may be tied in a net above the main door so it cannot fall on a head. It stays a few days, then is immersed or buried at a tree. It is a seal, not the shanti. Families who will not hang a gourd close without it.",
      },
      {
        kind: "p",
        text: "Cash and a cloth go to the acharya with both hands, with a coconut and betel, and whatever grain was vowed. Do not bargain at the fire. A cow, if it was vowed and cannot be given, is given as its price. Ganapati and the nine are asked to leave. The Vastu person is asked to remain, pleased. The ember dies in the pit. It is not dumped, glowing, into a plastic bin. Water that remains waters a plant or finishes the sprinkling.",
      },
    ],
  },
  {
    id: "after",
    kicker: "The next morning",
    title: "What is lifted, what is kept, what is never claimed",
    lede: "The northeast coconut is lifted the next morning and immersed, or kept, as the priest says.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ash: a pinch on the forehead if the priest offers it. The rest under a tree or in moving water. Never into the kitchen sink while hot.",
          "Leaf cups and flowers the same day. They do not rot on the mandala.",
          "A ghee lamp in the northeast at dusk for eleven evenings is a family practice, not a second sacrifice.",
          "The couple eat the offered food first, then a simple meal.",
        ],
      },
      {
        kind: "note",
        text: "A completed shanti is not a certificate that a loan will clear, that an illness will pass, or that a wall is structurally sound. For those, call the people whose work that is. The rite’s claim is narrower: the household has asked the site, in a traditional order, to be a quiet place to live.",
      },
    ],
  },
];
