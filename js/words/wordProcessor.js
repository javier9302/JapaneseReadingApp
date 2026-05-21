import {
  loadUserData,
  saveWord
} from "../storage/localStorage.js";

import {
  fetchWordFromJisho
} from "./jisho.js";

import {
  WORD_OCCURRENCE
} from "../models/WORDS.js";

import { delay } from "../utils/helpers.js";



export async function processTextWords(textData,userData){
  
  const id=textData.id
  const exists=userData.texts.some(
    text=> text.id === textData.id
  );
  console.log(textData.id)
  console.log(userData.texts)
  console.log(exists)
  if(exists){
    console.log("Story already exists. Skipping.");
    return;
  }
  
  const processed = new Set();
  
  for(const sentence of textData.content){

    for(const word of sentence.words){

      await processWord(word, processed);

    }

  }

}


async function processWord(word, processed){
  const dictionaryForm =
    word.rootWord || word.surface;

  let key;
    if (word.rootWord ){
    key = `${dictionaryForm}`;
    
  }
    else{
      key= `${dictionaryForm}-${word.reading}` ;
    } 
    
  console.log(processed)
  if(processed.has(key)) return;

  processed.add(key);

  const userData = loadUserData();

  const exists = userData.words.find(
    w =>
      w.dictionaryForm === dictionaryForm &&
      w.reading === word.reading
  );

  if(exists) return;

  const jishoData =
    await fetchWordFromJisho(dictionaryForm);
  
  if(!jishoData) return;

  const newWord = createWord(jishoData);

  saveWord(newWord);

  await delay(1000);
}


function createWord(jishoData){

  const j = jishoData.japanese[0];
  const s = jishoData.senses[0];
  const word = j.word || null;
  const reading = j.reading || "";

  const isParticle = !word; // important rule

  return {
    id: isParticle
      ? `particle_${reading}`
      : `${word}_${reading}`,

    dictionaryForm: j.word || j.reading || "",

    reading: j.reading || "",

    meaning: s.english_definitions?.join(", ") || "",

    jlpt: jishoData.jlpt?.[0] || "",

    tags: jishoData.tags || [],

    partOfSpeech: s.parts_of_speech || []
  };

}