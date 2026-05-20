export const STORY_PROMPT = `
Crea un texto en japonés en formato JSON.

Configuración:

- Tamaño: historia media
- Categoría: Viajes
- Tipo de texto: story
- Nivel gramatical JLPT: N4

Reglas generales:

- El texto debe seguir estrictamente el nivel gramatical indicado.
- Puede usar vocabulario más avanzado si el contexto lo requiere.
- Debe priorizar vocabulario simple y natural cuando sea posible.
- Usa ortografía japonesa natural.
- Prefiere kanji cuando sea comúnmente utilizado.

La estructura JSON debe ser la siguiente:

{
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

Reglas de estructura:

- title.original debe contener el título en japonés.
- title.reading debe estar completamente en hiragana.
- title.translation debe contener la traducción al inglés.

- original debe contener la oración completa en japonés.
- translation debe contener la traducción al inglés.

- words debe contener TODOS los tokens de la oración en orden.
- Incluye partículas y auxiliares.
- No omitas ningún token de la oración.
- Al unir todos los surface en orden, debe reconstruirse correctamente la oración original.

Reglas de palabras:

- surface debe contener EXACTAMENTE la forma usada en la oración.
- reading debe estar únicamente en hiragana.
- rootWord debe contener la forma diccionario si la palabra está conjugada.
- Si la palabra NO está conjugada, rootWord debe ser un string vacío.

Reglas finales:

- Devuelve únicamente JSON válido.
- No incluyas explicaciones.
- No uses markdown.

`;