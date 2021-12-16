const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/api"));

app.listen(5000, () => {
  console.log("listening on port 5000");
});
