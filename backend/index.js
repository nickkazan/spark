const express = require("express")
require("dotenv").config()
const ck = require("ckey");
const axios = require('axios');

const PORT = 8080
const URL =  "https://api.yelp.com/v3/businesses/search"
const API_KEY = ck.YELP_API_KEY

const app = express()
app.use(express.json());

app.post("/resulting-activities", (req, res) => {
  const body = req.body
  console.log(body)
  const rawParams = {
    'location': '219 Clarence Street, Ottawa, ON K1N 5R2', // MUST BE USER DETERMINED
    'radius': Math.max(...body.transportation),
    'categories': body.categories.toString(),
    'limit': 5,
    'price': body.prices.toString(),
    'open_now': true // MUST BE USER DETERMINED
  }

  var params = new URLSearchParams(rawParams)
  console.log(params)

  axios.get(URL + "?" + params, {
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    console.log(response.data)
    res.send(JSON.stringify(response.data))
  })
  .catch((err) => {
    console.error(err.response)
  })
});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT)
});