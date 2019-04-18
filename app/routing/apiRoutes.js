//API Routes

const friendsData = require("../data/friends");


module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
      let yourMatch = {
        name: "",
        photo: "",
        difference: 1000
      };

      console.log(req.body);

      let userData = req.body;
      let userScore = userData.scores;
      let theDifference = 0;

      for (i = 0; i < friendsData.length; i++) {
        console.log(friendsData[i]);
        theDifference = 0;

        for (j = 0; j < userScore.length; j++) {
          theDifference += Math.abs(userScore[j] - friendsData[i].scores[j]);

          if (theDifference <= yourMatch.difference) {
            yourMatch.name = friendsData[i].name;
            yourMatch.photo = friendsData[i].photo;
            yourMatch.difference = theDifference;
          }
        }
      }
      console.log(yourMatch);
      friendsData.push(userData);
      res.json(yourMatch);
    });
  };
