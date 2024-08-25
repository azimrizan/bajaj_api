const express = require('express');
const app = express();

app.use(express.json());

app
  .route('/bfhl')
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    try {
      const data = req.body.data || [];
      const numbers = [];
      const alphabets = new Set(); 
      let highest_lowercase_alphabet = "";

      for (const item of data) {
        if (!isNaN(item)) {
          numbers.push(item);
        } else if (item.length === 1 && isNaN(item) && item === item.toLowerCase()) {
          alphabets.add(item); // Add to Set to ensure uniqueness
          if (
            !highest_lowercase_alphabet ||
            item > highest_lowercase_alphabet
          ) {
            highest_lowercase_alphabet = item;
          }
        }
      }

      res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: Array.from(alphabets).sort(), 
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
