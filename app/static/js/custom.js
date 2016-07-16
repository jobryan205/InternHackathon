$(document).ready(function(){
    $('form[name="createChallenge"]').on('submit', function(e) {
        e.preventDefault();

        var challengeName = e.target["challenge-name"];
        var startTime = e.target["timer"];
        url = window.location.pathname
        $.post(url,
            {
                "challengeName": challengeName,
                "startTime": startTime
            },
            function(data){
                //callback
                console.log("success");
            }
        );
        return false;
    });
});