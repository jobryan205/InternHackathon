
function updateAllInfants() {
  templates.updaters.challengeUrl();
  templates.updaters.challengeName();
  clearInterval(globals.countdown);

  var totalSeconds = (new Date(globals.model.endTime).getTime() - (new Date().getTime()))/1000;
  globals.countdown = setInterval(function() {
    totalSeconds--;
    templates.updaters.countdowns(totalSeconds);
  }, 1000);
}
updateAllInfants();
//footer
templates.updaters.countdowns = function(seconds) {
  var hours = Math.floor(seconds/3600);
  var minutes = Math.floor((hours*60) - (seconds/60));
  var seconds = seconds - minutes*60;
  var str = hours + ' hr ' + minutes + ' min ' + seconds + ' sec ';
  document.getElementById('countdownContainer').innerHTML = str;
};


templates.updaters.challengeUrl = function() {
  var url = window.location.href;
  document.getElementById('challengeUrlContainer').innerHTML = url;
}


templates.updaters.challengeName = function() {
  var challengeName = globals.model.name;
  document.getElementById('challengeNameHolder').innerHTML = challengeName;
}

templates.updaters.postPreviewImageUrl = function(url) {
  document.getElementById('canvasUploadPreviewImage').url = url;
}
