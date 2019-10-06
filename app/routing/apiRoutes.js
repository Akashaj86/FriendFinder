// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
//var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  //app.get("/api/waitlist", function(req, res) {
  //res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------

  app.post("/api/foobar", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    var totalDifference = 0;
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };
    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function (item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    console.log("Name: " + userName);
    console.log("User score " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);
    console.log("Sum of users score" + sum);
    console.log("Best match friend diff" + bestMatch.friendDifference);
    console.log("++++++++========");

    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;
      console.log("Total Diff " + totalDifference);
      console.log("Best match of friend diff" + bestMatch.friendDifference);

      var bfriendScore = friends[i].scoresreduce((a, b) => a + b, 0);
      console.log("Total friend score " + bfriendScore);
      console.log("-----------------> " + totalDifference);

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      };
      console.log(totalDifference + "Total Difference");
    };
    console.log(bestMatch);
    friends.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(bestMatch);
  });


};
