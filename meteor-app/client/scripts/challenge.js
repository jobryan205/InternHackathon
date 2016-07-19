var countdownInterval;
Template.challenge.onCreated(function() {
	var countDownCreator = function() {
		var endTime = Challenges.findOne({"challengeId": Router.current().params.challengeId});
		if (endTime) {
			endTime = endTime.endTime;
			var diff = endTime.getTime() - new Date().getTime();
			if (diff > 0) {
				var hours = Math.floor(diff/3600000);
				var minutes = Math.floor((diff - hours*3600000)/60000);
				var seconds = Math.floor((diff - (minutes*60000) - (hours*3600000))/1000);
				return {
					hours, minutes, seconds
				}
			}
		}
	};
	this.sessionEnd = new ReactiveVar(countDownCreator());
	var $this = this;
	countdownInterval = setInterval(function() {
		$this.sessionEnd.set(countDownCreator());
	}, 1000);
});
Template.challenge.rendered = function () {
	$('body').css('background-color', '#F9F9F8');
};
Template.challenge.destroyed = function () {
	clearInterval(countdownInterval);
	$('body').css('background-color', '');
};

Template.challenge.helpers({
	sessionEnd: function() {
		return Template.instance().sessionEnd.get();
	},
	posts: function() {
		var challenge = Challenges.findOne({"challengeId": Router.current().params.challengeId})
		var sortFunc;
		if (Template.instance().sessionEnd.get()) {
			sortFunc = function(a, b) {
				return b.createdAt - a.createdAt;
			};
		} else {
			sortFunc = function(a, b) {
				return b.likes.likeCount - a.likes.likeCount;
			};
		}
		return challenge && challenge.submissions.sort(sortFunc);
	},
	topPosterName: function() {
		var challenge = Challenges.findOne({"challengeId": Router.current().params.challengeId});
		if(challenge) {
			var topPosterIndx, topPosterVal = 0;
			challenge.submissions.forEach(function(submission, indx) {
				if (submission.likes.likeCount > topPosterVal) {
					topPosterIndx = indx;
					topPosterVal = submission.likes.likeCount;
				};
			});
			return challenge.submissions[topPosterIndx].name;
		}
	}
});
