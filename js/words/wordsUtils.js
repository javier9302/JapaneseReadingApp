export function isParticle(word){

  return word.partOfSpeech?.includes("particle");

}


export function normalizeWord(word){

  return (word || "").trim().toLowerCase();

}


export function getDictionaryForm(word){

  return word.rootWord || word.surface;
}


export function isSameWord(a, b){

  return (
    a.reading === b.reading &&
    getDictionaryForm(a) === getDictionaryForm(b)
  );

}