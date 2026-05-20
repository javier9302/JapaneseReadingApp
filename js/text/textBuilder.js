export function buildText(textData){

  return textData.content
    .map(

      sentence =>

        sentence.original

    )
    .join("");

}