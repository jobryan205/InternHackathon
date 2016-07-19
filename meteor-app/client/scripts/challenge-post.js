
Template.challengePost.events({
  'click .like-toggle button': function(e, template) {
    if (Session.get('userId') === template.data.authorId) {
      return alert('You can\'t like your own post!');
    } else {
      var challenge = Challenges.findOne({"challengeId": Router.current().params.challengeId})
      if (challenge) {
        if (challenge.endTime.getTime() < new Date().getTime()) {
          return;
        }
      }
      var wasLiked = template.data.likes[Session.get('userId')];
      var query = {
        targetLiked: !wasLiked,
        challengeId: Router.current().params.challengeId,
        likerId: Session.get('userId') || Random.id(),
        submissionId: template.data.submissionId
      };
      if (!Session.get('userId')) {
        Session.setPersistent('userId', query.likerId);
      }
      Meteor.call('toggleLike', query);
    }
  }
})

Template.challengePost.helpers({
  isLiked: function() {
    var likes = Template.instance().data.likes;
    if(likes) {
      return likes[Session.get('userId')]? 'isLiked': '';
    }
  }
})
