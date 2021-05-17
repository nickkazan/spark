const express = require("express")
require("dotenv").config()
const ck = require("ckey")
const axios = require('axios')
// const tools = require("./utility.js")
// const categories = require('./categories.json')

const PORT = 8080
const SEARCH_URL =  "https://api.yelp.com/v3/businesses/search"
const BUSINESS_ID_URL = "https://api.yelp.com/v3/businesses/"
const API_KEY = ck.YELP_API_KEY


const app = express()
app.use(express.json());

app.post("/resulting-activities", (req, res) => {
  const body = req.body
  let open = false
  console.log("BODY BEFORE API: ", body)
  if (body.availability.length === 1) {
    open = body.availability[0]
  }

  const rawParams = {
    'longitude': parseFloat(body.longitude),
    'latitude': parseFloat(body.latitude),
    'radius': Math.max(...body.transportation),
    'categories': body.categories.toString(),
    'limit': parseInt(body.numberOfChoicesRequested),
    'price': body.prices.toString(),
    'open_now': open
  }
  console.log(rawParams.open_now)

  var params = new URLSearchParams(rawParams)

  axios.get(SEARCH_URL + "?" + params, {
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

app.get("/business-id-lookup/:id", (req, res) => {
  const id = req.params.id
  console.log(id)

  axios.get(BUSINESS_ID_URL + id, {
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    console.log("Business Data: ", response.data)
    res.send(JSON.stringify(response.data))
  })
  .catch((err) => {
    console.error(err.response)
  })

});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT)
});