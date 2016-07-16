



function submissionTemplate(submissionUrl, submissionName, submissionCaption, isLiked) {
  var submissionHTML = '<div class="submission clearfix"> <div class="card left"> <img id="submissionImageUrl" src="'
  +submissionUrl+
  '" /> <div class="submission-details"> <p> <b id="submissionName"> '
  + submissionName +
  ' </b> <span id="submissionCaption"> '
  + submissionCaption +
   ' </span> </p> </div> </div> <div class="like-container '
    + (isLiked? 'button-is-liked': '')
    + ' right"> <button class="like" id="likeButton"></button> </div> </div>';
    return submissionHTML;
};

templates.updaters.photofeed = function(arr) {
  var totalStr = '';
  arr.forEach(function(submission) {
    var requesterId = globals.methods.getCookie('userID');
    var isLiked = submission.likes[requesterId];
      totalStr += submissionTemplate(submission.url, submission.name, submissionCaption.caption, isLiked);
  });
  document.getElementById('photofeed').innerHTML = totalStr;
};
