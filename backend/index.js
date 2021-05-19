const express = require("express")
require("dotenv").config()
const ck = require("ckey")
const axios = require('axios')

const PORT = 8080
const SEARCH_URL =  "https://api.yelp.com/v3/businesses/search"
const BUSINESS_ID_URL = "https://api.yelp.com/v3/businesses/"
const API_KEY = ck.YELP_API_KEY


const app = express()
app.use(express.json());

app.post("/resulting-activities", (req, res) => {
  const body = req.body
  let open = false
  const userChosenLimit = parseInt(body.numberOfChoicesRequested)
  const expandedLimit = userChosenLimit * 5

  if (body.availability.length === 1) {
    open = body.availability[0]
  }

  const rawParams = {
    'longitude': parseFloat(body.longitude),
    'latitude': parseFloat(body.latitude),
    'radius': Math.max(...body.transportation),
    'categories': body.categories.toString(),
    'limit': expandedLimit,
    'price': body.prices.toString(),
    'open_now': open
  }
  var params = new URLSearchParams(rawParams)

  axios.get(SEARCH_URL + "?" + params, {
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    const listOfActivities = response.data.businesses

    if (userChosenLimit >= listOfActivities.length) {
      res.send(JSON.stringify(listOfActivities))
    }
    const newListOfActivities = (listOfActivities.sort(() => Math.random() - 0.5)).slice(0, userChosenLimit)
    res.send(JSON.stringify(newListOfActivities))
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