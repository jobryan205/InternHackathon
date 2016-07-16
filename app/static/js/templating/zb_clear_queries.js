function clearHolders() {
  let ids = [
    'challengeUrlContainer', 'countdownContainer', 'challengeNameHolder', //footer
    'photofeed' //photofeed
  ];
  $('#' + ids.join(', #')).html('');

};
