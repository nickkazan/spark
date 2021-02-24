const express = require("express")

const PORT = 8080
const app = express()
app.use(express.json());

app.post("/resulting-activities", (req, res) => {
  const body = req.body
  console.log(body)
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT)
});