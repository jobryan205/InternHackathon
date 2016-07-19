Template.postModal.helpers({
	mountedPost: function() {
		return Session.get('postMount');
	}
})

Template.postModal.events({
	'click .modal-wrapper': function(e) {
		if (e.target === e.currentTarget) {
			$(e.target).fadeOut(600);
		}
	},
	'click .modal-wrapper .wormhole>span:first-of-type': function(e) {
		$('.modal-wrapper').fadeOut(600);
	},
	'submit form[name="makePost"]': function(e) {
		e.preventDefault();
		$this = e.target;
		$this.makePostSubmit.disabled = true;
		var name = $this.name.value;
		var caption = $this.postCaption.value;
		var challengeId = Router.current().params.challengeId;
		var req = $.extend({
			name, caption, challengeId
		}, Session.get('postMount'));
		req.userId = Session.get('userId') || Random.id();
		if (!Session.get('userId')) {
			Session.setPersistent('userId', req.userId);
		}

		Meteor.call('makePost', req, function(e) {
			$this.makePostSubmit.disabled = false;
			$this.reset();
			if (e) {
				alert('Error submitting your post.\nView console for details or try again later.');
				console.log(e);
			} else {
				$('.modal-wrapper').fadeOut(600);
			}
		});

	}
});

Template.postModal.destroyed = function() {
	clearInterval(imageFixInterval);
}
