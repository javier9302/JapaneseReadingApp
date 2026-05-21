export const STORY_PROMPT = `
Create a Japanese text in JSON format.

Configuration:

- Length: medium story
- Category: Travel
- Text type: story
- JLPT grammar level: N4

General rules:

- The ID must be random using UUID v4 format.
- The text must strictly follow the specified grammar level.
- More advanced vocabulary may be used if the context requires it.
- Prioritize simple and natural vocabulary whenever possible.
- Use natural Japanese spelling.
- Prefer kanji when they are commonly used.

The JSON structure must be the following:

{
  "id":"",
  "title": {
    "original": "",
    "reading": "",
    "translation": ""
  },

  "grammarLevel": "",

  "category": "",

  "theme": "",

  "type": "",

  "tags": [],

  "content": [

    {
      "original": "",

      "translation": "",

      "words": [

        {
          "surface": "",

          "reading": "",

          "rootWord": ""
        }

      ]
    }

  ]
}

Structure rules:

- title.original must contain the title in Japanese.
- title.reading must be completely written in hiragana.
- title.translation must contain the English translation.

- original must contain the complete sentence in Japanese.
- translation must contain the English translation.

- words must contain ALL sentence tokens in order.
- Include particles and auxiliary words.
- Do not omit any sentence token.
- Joining all surface values in order must correctly reconstruct the original sentence.

Word rules:

- surface must contain EXACTLY the form used in the sentence.
- reading must be written only in hiragana.
- rootWord must contain the dictionary form if the word is conjugated.
- If the word is NOT conjugated, rootWord must be an empty string.

Final rules:

- Return valid JSON only.
- Do not include explanations.
- Do not use markdown.

`;