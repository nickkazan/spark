var AWS = require("aws-sdk");

AWS.config.update({
  endpoint: "https://dynamodb.us-east-2.amazonaws.com",
  region: "us-east-2",
});

const TABLE = "activities";

AWS.config.getCredentials(function (err) {
    if (err) console.log(err);
      // credentials not loaded
});

async function putActivity(username, activityId) {
  var client = new AWS.DynamoDB.DocumentClient();
  
  // Generate timestamp
  const timestamp = Math.floor(Date.now() / 1000)
  console.log(username)
  console.log(activityId)

  var params = {
      TableName: TABLE,
      Item: {
          "username": username,
          "activity_id": activityId,
          "timestamp": timestamp
      }
  };
  client.put(params, function(err, data) {
      if (err) {
          console.error("Unable to save activity for the following reason: ", JSON.stringify(err));
      } else {
          console.log("Added activity.");
      }
  });
}

// async function getActivities(receiverId) {
//     var client = new AWS.DynamoDB.DocumentClient();
//     var params = {
//         TableName : TABLE,
//         KeyConditionExpression: "#receiver = :value",
//         ExpressionAttributeNames:{
//             "#receiver": "receiver_id"
//         },
//         ExpressionAttributeValues: {
//             ":value": receiverId
//         }
//     };
    
//     var data = await client.query(params).promise()
//     return data.Items
// }

// async function deleteActivity(activity_id) {
//     var client = new AWS.DynamoDB.DocumentClient();

//     messages.forEach(message => {
//         var params = {
//             TableName: TABLE,
//             Key:{
//                 "receiver_id": message.receiver_id,
//                 "timestamp": message.timestamp
//             },
//         };
    
//         client.delete(params, function(err, data) {
//             if (err) {
//                 console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
//             } else {
//                 console.log("Item deleted:", JSON.stringify(data, null, 2));
//             }
//         });    
//     })
// }


// async function deleteActivities(messages) {
//     var client = new AWS.DynamoDB.DocumentClient();

//     messages.forEach(message => {
//         var params = {
//             TableName: TABLE,
//             Key:{
//                 "receiver_id": message.receiver_id,
//                 "timestamp": message.timestamp
//             },
//         };
    
//         client.delete(params, function(err, data) {
//             if (err) {
//                 console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
//             } else {
//                 console.log("Item deleted:", JSON.stringify(data, null, 2));
//             }
//         });    
//     })
// }

module.exports = {
    putActivity,
    // getActivities,
    // deleteActivity,
    // deleteActivities
};
