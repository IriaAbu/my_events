const express = require("express");
const app = express();
const http = require("http").createServer(app);

const ImportFacebook = (user, accessToken, cb) => {
  var options = {
    host: "graph.facebook.com",
    port: 443,
    path:
      "/v2.9/" +
      user.facebook.id +
      "/taggable_friends?access_token=" +
      accessToken, //apiPath example: '/me/friends'
    method: "GET",
  };

  var buffer = ""; //this buffer will be populated with the chunks of the data received from facebook
  var request = http.get(options, function (result) {
    result.setEncoding("utf8");
    result.on("data", function (chunk) {
      buffer += chunk;
    });

    result.on("end", function () {
      console.log(buffer);
      cb();
    });
  });

  request.on("error", function (e) {
    console.log("error from facebook.getFbData: " + e.message);
    cb();
  });

  request.end();
};

export default ImportFacebook;
