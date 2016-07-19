Template.landing.events({
  'submit form[name="createChallenge"]': function(e) {
    e.preventDefault();
    var $this = e.target;
    var challengeName = $this['challenge-name'].value;
    var time = $this['timer'].value;
    $this.submitBtn.disabled = true;
    Meteor.call('createChallenge', {time: parseFloat(time), challengeName: challengeName}, function(err, resp) {
      $this.submitBtn.disabled = false;
      if (err) {
        alert('We had an issue creating the challenge.\nView the console for more details or try again.');
        console.log(err);
      } else {
        Session.setPersistent('userId', resp.uid);
        Router.go('challenge', {challengeId: resp.challenge});
      }
    });
  }
});
