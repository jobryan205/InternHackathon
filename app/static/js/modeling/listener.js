var socket = io('http://localhost:5000');
socket.on('connect', function() {
  socket.emit('sendInitialChallengeData', {
    challengeId: window.location.pathname.slice(window.location.pathname.indexOf('/challenge/') + 11)
  });
})

socket.on('sendInitialChallengeData', function(data) {
  globals.model = data;
  redraw();
});

socket.on('updateLikes', function (data) {
  updateSubmissionsProp(data, redraw);
});

socket.on('newPost', function (data) {
  updateSubmissionsProp(data, redraw);
});
