import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// =========================
// 1. JISHO PROXY (you already had this)
// =========================
app.get("/search-word", async (req, res) => {

  const keyword = req.query.keyword;

  try {

    const response = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch word"
    });

  }
});


// =========================
// 2. SYNC WORDS TO JSON DB
// =========================
app.post("/sync-words", (req, res) => {

  try {

    const incomingWords = req.body.words || [];

    const filePath = "./words-db.json";

    const db = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    );

    if (!db.words) db.words = [];

    let added = 0;

    for (const word of incomingWords) {

      const exists = db.words.some(w =>
        w.dictionaryForm === word.dictionaryForm &&
        w.reading === word.reading
      );

      if (!exists) {
        db.words.push(word);
        added++;
      }
    }

    fs.writeFileSync(
      filePath,
      JSON.stringify(db, null, 2)
    );

    res.json({
      success: true,
      added
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to sync words"
    });

  }
});


// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});