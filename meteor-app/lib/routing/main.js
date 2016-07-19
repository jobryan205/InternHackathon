Meteor.startup(function () {
	Router.configure({
		notFoundTemplate: 'notFound',
		loadingTemplate: 'loader'
	});

	Router.map(function() {

		this.route('landing', {
			path: '/',
			template: 'landing',
			onBeforeAction: function() {
				this.next();
			},
			onAfterAction: function() {
				SEO.set({
					"title": "face | off",
					"meta" : {
						'description': '',
						'keywords': ''
					},
					"og" : {
						'title': '',
						'image': ''
					}
				});
				document.title = 'face | off';
			},
			data: function() {

			}
		});

		this.route('challenge', {
			path: '/challenge/:challengeId',
			template: 'challenge',
			onBeforeAction: function() {
				this.next();
			},
			onAfterAction: function() {
				SEO.set({
					"title": "face | off",
					"meta" : {
						'description': '',
						'keywords': ''
					},
					"og" : {
						'title': '',
						'image': ''
					}
				});
				document.title = 'face | off';
			},
			data: function() {
				return ({
					challengeId: this.params.challengeId,
					urlBase: window.location.host,
					challenge: Challenges.findOne({"challengeId": this.params.challengeId})
				})
			}
		});

	});

});
