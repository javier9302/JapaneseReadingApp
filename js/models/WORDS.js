// =========================
// WORD STATUS
// =========================

export const WORD_STATUS = {

  NEW: "new",

  SEEN: "seen",

  LEARNING: "learning",

  FAMILIAR: "familiar",

  STABLE: "stable",

  MASTERED: "mastered"

};


// =========================
// PARTS OF SPEECH
// =========================

export const PARTS_OF_SPEECH = {

  NOUN: "noun",

  ICHIDAN_VERB: "ichidan_verb",

  GODAN_VERB: "godan_verb",

  IRREGULAR_VERB: "irregular_verb",

  I_ADJECTIVE: "i_adjective",

  NA_ADJECTIVE: "na_adjective",

  ADVERB: "adverb",

  PARTICLE: "particle",

  EXPRESSION: "expression"

};


// =========================
// WORD OBJECT
// Dictionary entry
// =========================

export const WORD = {

  id: "",

  dictionaryForm: "",

  reading: "",

  meaning: "",

  jlpt: "",

  tags: [],

  partOfSpeech: []

};


// =========================
// WORD OCCURRENCE OBJECT
// Word as used in text
// =========================

export const WORD_OCCURRENCE = {
  
  surface: "",

  reading: "",

  rootWord: "",

};


