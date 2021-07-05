const express = require("express")
require("dotenv").config()
const ck = require("ckey")
const axios = require("axios")
const activityDao = require("./activityDao")
const imageDao = require("./imageDao")

const PORT = process.env.PORT || 8080;
const SEARCH_URL =  "https://api.yelp.com/v3/businesses/search"
const BUSINESS_ID_URL = "https://api.yelp.com/v3/businesses/"
const API_KEY = ck.YELP_API_KEY


const app = express()
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

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
      res.status(200).json(
        listOfActivities
      )
    }
    const newListOfActivities = (listOfActivities.sort(() => Math.random() - 0.5)).slice(0, userChosenLimit)
    res.status(200).json(
      newListOfActivities
    )
})
  .catch((err) => {
    console.error(err.response)
  })
});

app.post("/swipe-activities", (req, res) => {
  const body = req.body
  
  const OPEN = false
  const RADIUS = 5000
  const LIMIT = 30
  const PRICE = "1, 2, 3, 4"
  const CATEGORIES = "nightlife, restaurants, food"

  // some values are currently hardcoded but might be user filters later on
  const rawParams = {
    'longitude': parseFloat(body.longitude),
    'latitude': parseFloat(body.latitude),
    'radius': RADIUS,
    'categories': CATEGORIES,
    'limit': LIMIT,
    'price': PRICE,
    'open_now': OPEN
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
    const newListOfActivities = (listOfActivities.sort(() => Math.random() - 0.5))
    res.status(200).json(
      newListOfActivities
    )
  })
  .catch((err) => {
    console.error(err.response)
  })
});

app.get("/business-id-lookup/:id", (req, res) => {
  const id = req.params.id

  axios.get(BUSINESS_ID_URL + id, {
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    res.status(200).json(
      response.data
    )
  })
  .catch((err) => {
    console.error(err.response)
  })
});

app.post("/put-activity", async (req, res) => {
  console.log("Entered /put-activity API endpoint...")
  const body = req.body
  if (body && body.username && body.activityId) {
    await activityDao.putActivity(body.username, body.activityId)
    res.status(200).json({
      success: "The activity was stored"
    });
  } else {
    return res.status(400).json({
      error: "The activity failed to store"
    })
  }
});

app.get("/get-activities/:username", async (req, res) => {
  console.log("Entered /get-activities API endpoint...")
  const username = req.params.username
  if (username) {
    const response = await activityDao.getActivities(username)
    res.status(200).json({
      response: response
    })
  } else {
    res.status(400).json({
      error: "The activities failed to retrieve"
    })
  }
})

app.delete("/delete-activity", async (req, res) => {
  console.log("Entered /delete-activity API endpoint...")
  const body = req.body
  if (body && body.username && body.activityId) {
    await activityDao.deleteActivity(body.username, body.activityId)
    res.status(200).json({
      success: "The activity was deleted"
    })
  } else {
    return res.status(400).json({
      error: "The activity failed to delete"
    })
  }
})

app.post("/upload-profile-picture", async (req, res) => {
  console.log("Entered /upload-profile-picture API endpoint...")
  const body = req.body
  if (body && body.username && body.imageData) {
    await imageDao.storeProfilePicture(body.username, body.imageData)
    res.status(200).json({
      success: "The profile picture was uploaded"
    })
  } else {
    return res.status(400).json({
      error: "The profile picture failed to upload"
    })
  }
})

app.get("/get-profile-picture/:username", async (req, res) => {
  console.log("Entered /get-profile-picture API endpoint...")
  const username = req.params.username
  if (username) {
    const response = await imageDao.getProfilePicture(username)
    res.status(200).json({
      data: response
    })
  } else {
    return res.status(400).json({
      error: "The profile picture failed to retrieve"
    })
  }
})


app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT)
});