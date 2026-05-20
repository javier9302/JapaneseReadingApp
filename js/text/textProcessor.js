import {
  processTextWords
}
from "../words/wordProcessor.js";


export async function processText(
  textData
){

  await processTextWords(
    textData
  );

}