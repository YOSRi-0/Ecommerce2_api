const express = require("express");
const app = express();
const { db } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/api"));

db.sync()
  .then(() => {
    app.listen(5500, () => {
      console.log("listening on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
