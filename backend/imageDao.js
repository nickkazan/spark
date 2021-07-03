var AWS = require("aws-sdk");

const PROFILE_BUCKET = "spark-user-profile-images";

AWS.config.update({
  region: "us-east-2"
});

AWS.config.getCredentials(function (err) {
  if (err) console.log(err);
  // credentials not loaded
});

async function storeProfilePicture(username, imageData) {
  var s3 = new AWS.S3({endpoint: "https://s3.us-east-2.amazonaws.com"});
  var uploadParams = {Bucket: PROFILE_BUCKET, Key: username, Body: imageData};

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.error(
        "Unable to upload new profile picture. Error JSON: ",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Profile picture uploaded. Data: ",
        JSON.stringify(data, null, 2))
    }
  })
}

async function getProfilePicture(username) {
  var s3 = new AWS.S3({endpoint: "https://s3.us-east-2.amazonaws.com"});
  var params = {Bucket: PROFILE_BUCKET, Key: username};

  const data = await s3.getObject(params).promise()
  
  if (data) {
    console.log(`Found the following data for ${username}`)
    console.log(data.Body.toString('base64'))
    return data.Body.toString('base64')
  } else {
    console.error("Unable to upload new profile picture.")
  }
}

module.exports = {
  storeProfilePicture,
  getProfilePicture
};
