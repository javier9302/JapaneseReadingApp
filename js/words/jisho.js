export async function fetchWordFromJisho(word){

  try{

    const response =
      await fetch(
        `http://localhost:3000/search-word?keyword=${encodeURIComponent(word)}`
      );

    const data =
      await response.json();

    if(!data.data || !data.data.length){

      return null;

    }

    return data.data[0];

  }

  catch(error){

    console.error(error);

    return null;

  }

}