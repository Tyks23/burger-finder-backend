const express = require("express");
const cors = require("cors");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World454: ");
});

const burgerRoutes = require("./routes/burger");
app.use("/api/burger", burgerRoutes);

app.listen(process.env.PORT || 8080, function () {
  console.log("Server started on port 8080");
});
