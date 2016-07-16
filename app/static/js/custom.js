$(document).ready(function(){

    $('form[name="createChallenge"]').on('submit', function(e) {
        e.preventDefault();

        var challengeName = e.target["challenge-name"].value;
        var startTime = e.target["timer"].value;
        var socket = io.connect('http://127.0.0.1:5000');
        socket.emit('join', {data: challengeName})
        url = window.location.pathname;
        $.post(url,
            {
                "challengeName": challengeName,
                "timer": startTime
            },
            function(data){
                //callback
                window.location.href = data;
            }
        );
        return false;
    });
});
