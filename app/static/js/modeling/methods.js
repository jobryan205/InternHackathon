function methods() {
  var socket = io('http://localhost:5000');

  return {
    getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length,c.length);
          }
      }
      return "";
    },

    likes: {
      addLike: function(data, cb) {
        var challenge = globals.model;
        if (challenge and challenge['submissions'] && challenge['submissions'][data.submissionKey]) {
          var newSubmissions = challenge['submissions'];
          newSubmissions[data.submissionKey]['likes']['likeCount'] += 1;
          newSubmissions[data.submissionKey]['likes'][data.requesterId] = true;
          globals.model['submissions'] = newSubmissions;
        };
        socket.emit('likeToggle', $.extend({ //data needs submissionKey, challengeId
          "toLike": true
        }, data));
        cb();
      },
      removeLike: function(data, cb) {
        var challenge = globals.model;
        if (challenge and challenge['submissions'] && challenge['submissions'][data.submissionKey]) {
          var newSubmissions = challenge['submissions'];
          newSubmissions[data.submissionKey]['likes']['likeCount'] -= 1;
          newSubmissions[data.submissionKey]['likes'][data.requesterId] = false;
          globals.model['submissions'] = newSubmissions;
        }
        socket.emit('likeToggle', data); //data needs submissionKey, challengeId
        cb();
      }
    },
    posts: {
      updateSubmissionsProp: function(data, cb) {
        globals.model['submissions'] = data;
        cb();
      }
    }
  };
};

globals.methods = methods();
