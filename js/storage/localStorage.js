// =========================
// Sync user data route
// =========================

app.post(
  "/sync-user-data",
  (req, res) => {

    try{

      // Data received from frontend
      const incomingData =
        req.body;

      // JSON file path
      const filePath =
        path.resolve(
          "js/data/user-data.json"
        );

      let db;

      // Try reading existing JSON file
      try{

        db = JSON.parse(
          fs.readFileSync(
            filePath,
            "utf-8"
          )
        );

      }

      // If file does not exist
      // create default structure
      catch{

        db = {

          user: {
            name: "",
            createdAt: null
          },

          texts: [],

          words: [],

          wordMasteries: []

        };

      }

      // =========================
      // Sync TEXTS
      // =========================

      for(
        const incomingText
        of incomingData.texts
      ){

        // Check if story already exists
        const exists =
          db.texts.some(
            text =>
              text.id === incomingText.id
          );

        // If not found, add it
        if(!exists){

          db.texts.push(
            incomingText
          );

        }

      }


      // =========================
      // Sync WORDS
      // =========================

      for(
        const incomingWord
        of incomingData.words
      ){

        // Check duplicate word
        const exists =
          db.words.some(
            word =>

              word.dictionaryForm ===
              incomingWord.dictionaryForm

              &&

              word.reading ===
              incomingWord.reading
          );

        // Add only if missing
        if(!exists){

          db.words.push(
            incomingWord
          );

        }

      }


      // =========================
      // Save updated JSON file
      // =========================

      fs.writeFileSync(

        filePath,

        JSON.stringify(
          db,
          null,
          2
        )

      );


      // Success response
      res.json({

        success: true,

        message:
          "User data synced successfully"

      });

    }

    catch(error){

      console.error(error);

      res.status(500).json({

        error:
          "Failed to sync user data"

      });

    }

  }
);