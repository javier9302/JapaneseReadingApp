export const STORAGE_KEY = "USER_DATA";

export function saveUserData(userData){

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(userData)
  );

}


export function loadUserData(){

  const savedData =
    localStorage.getItem(STORAGE_KEY);

  if(savedData){

    return JSON.parse(savedData);

  }

  return {

    user: {
      name: "",
      createdAt: null
    },

    texts: [],

    words: [],

    wordMasteries: []

  };

}


export function saveTextData(textData){

  const userData =
    loadUserData();

  userData.texts.push(textData);

  saveUserData(userData);

}


export function saveWord(newWord){

  const userData =
    loadUserData();

  userData.words.push(newWord);

  saveUserData(userData);

}