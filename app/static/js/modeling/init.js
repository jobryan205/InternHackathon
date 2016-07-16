
function init() {
  globals = {
    model: {}
  };
  templates = {
    updaters: {}
  };

  var totalSeconds = (new Date(globals.model.endTime).getTime() - (new Date().getTime()))/1000;
  globals.countdown = setInterval(function() {
    totalSeconds--;
    templates.updaters.countdowns(totalSeconds);
  }, 1000);
};
init();
