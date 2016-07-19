Meteor.methods({
  createChallenge: function(data) {
    if(Meteor.isServer){
      if(typeof data.time === "number" && !isNaN(data.time) && typeof data.challengeName === "string") {

        var challengeId = Random.hexString(6).toLowerCase();
        while(Challenges.findOne({"challengeId": challengeId})) {
          challengeId = Random.hexString(6).toLowerCase();
        };

        var endTime = new Date((new Date().getTime()) + (data.time*3600000));
        var challengeObj = {
            'challengeId': challengeId,
            'name': data.challengeName,
            'endTime': endTime,
            'submissions': []
        };
        Challenges.insert(challengeObj);
        return {
          uid: Random.id(),
          challenge: challengeId
        };
      } else {
        throw new Meteor.Error('Invalid request');
      };
    };
  },
  makePost: function(data) {
    if (typeof data.challengeId === "string" && typeof data.name === "string" && typeof data.userId === "string" && typeof data.url === "string") {
      var challenge = Challenges.findOne({"challengeId": data.challengeId});
      if(challenge && challenge.submissions) {
        challenge.submissions.push({
          name: data.name,
          caption: data.caption && data.caption.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/(?:\r\n|\r|\n)/g, '<br />'),
          likes: {
            likeCount: 0
          },
          url: data.url,
          authorId: data.userId,
          submissionId: Random.id(),
          createdAt: new Date()
        });
        Challenges.update({"challengeId": data.challengeId}, {$set: {"submissions": challenge.submissions}});
      } else {
        throw new Meteor.Error('Challenge not found.');
      }
    } else {
      throw new Meteor.Error('Invalid request');
    }
  },
  toggleLike: function(data) {
    var { targetLiked, challengeId, likerId, submissionId } = data;
    if(typeof targetLiked === "boolean" && typeof challengeId === "string"  && typeof likerId === "string" && typeof submissionId === "string") {
      var challenge = Challenges.findOne({"challengeId": challengeId});
      if(challenge && challenge.submissions) {
        var indexx;
        if (challenge.submissions.find(function(submission, i) {if(submission.submissionId === submissionId) {indexx = i; return true;}})) {
          challenge.submissions[indexx].likes[likerId] = targetLiked;
          if(targetLiked) {
              challenge.submissions[indexx].likes.likeCount += 1;
          } else {
            challenge.submissions[indexx].likes.likeCount -= 1;
          }
          Challenges.update({"challengeId": data.challengeId}, {$set: {"submissions": challenge.submissions}});
        } else {
          throw new Meteor.Error('Could not find submission');
        }
      } else {
        throw new Meteor.Error('Could not find challenge');
      }
    } else {
      throw new Meteor.Error('Invalid request.');
    }
  }
});
