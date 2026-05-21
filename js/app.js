import {
  buildText
}
from "./text/textBuilder.js";

import {
  saveTextData
}
from "./storage/localStorage.js";

import {
  processTextWords
}
from "./words/wordProcessor.js";

import { 
  loadUserData 
} 
from "./storage/localStorage.js";


const userData = loadUserData();

const promptInput =
  document.getElementById(
    "promptInput"
  );

const submitButton =
  document.getElementById(
    "submitButton"
  );

const textContainer =
  document.getElementById(
    "textContainer"
  );


submitButton.addEventListener(
  "click",
  handleSubmit
);


async function handleSubmit() {

  try {

    const textData = JSON.parse(promptInput.value);

    const fullText = buildText(textData);

    textContainer.textContent = fullText;

    saveTextData(textData);
    console.log("TextData:")
    console.log(textData)
    console.log("UserData:")
    console.log(userData)
    // 1. process words (updates localStorage.words indirectly)
    await processTextWords(textData, userData);
    

  }

  catch (error) {   
    textContainer.textContent = "Invalid JSON.";
  }
}

async function syncWordsToServer() {

  const raw = localStorage.getItem("USER_DATA");

  if (!raw) return;

  const userData = JSON.parse(raw);

  if (!userData.words || userData.words.length === 0) {
    console.log("No words to sync");
    return;
  }

  const res = await fetch("http://localhost:3000/sync-words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      words: userData.words
    })
  });

  const data = await res.json();
  console.log("Sync result:", data);
}

