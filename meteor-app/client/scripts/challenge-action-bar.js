imageFixInterval = undefined;
Template.challengeActionBar.events({
	'focus input[readonly]': function (e, template) {
		$(e.currentTarget).select();
	},
	'click .create-new-challenge': function() {
		Router.go('/');
	},
	'change #imageUpload': function(e, template) {
		clearInterval(imageFixInterval);
		$('.post-modal .loader').show();
		$('.post-modal').fadeIn(600);
		FS.Utility.eachFile(e, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
           alert("Could not upload file.\nSee console for details or try again.");
					 console.log(err);
			 		$('.post-modal').fadeOut(600);
        } else {
          var imageURL = "/cfs/files/images/" + fileObj._id;

					var postObj = {
              'url': imageURL
          };
					Session.set('postMount', postObj);
					$('.post-modal .loader').fadeOut(900);
					$('#imageInjectionPoint').html('<img src="/images/loader.gif" alt="uploaded image preview" />');
					setTimeout(function() {
						$('#imageInjectionPoint').html('<img src="'+imageURL+'" alt="uploaded image preview" />');
						imageFixInterval = setInterval(function() {
							$('#imageInjectionPoint img')[0].src = imageURL
						}, 60);
					}, 5400);
        }
      });
		});
		$(e.currentTarget).val('');
	}
});
