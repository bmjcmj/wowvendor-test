document.addEventListener("DOMContentLoaded", function() {
    let checkbox = "autorun-checkbox";
    let timerElement = "live-timer";
    window.jumpPosition = 0;
    window.timerOn = false;
    function saveResults() {
        let resultData = new FormData();
        resultData.append('raceTime', window.raceTime);
        resultData.append('rockPosition', window.terrain.rockPosition);
        resultData.append('rockSize', window.terrain.rockSize);
        resultData.append('jumpPosition', window.jumpPosition);
        resultData.append('raceResult', window.raceResult);
    
        let request = new XMLHttpRequest();
        request.open("POST", "/controller.php");
        request.send(resultData);
    
        document.querySelector('#results-table tbody').innerHTML += `
        <tr>
            <td>${window.raceTime}</td>
            <td>${window.terrain.rockPosition}</td>
            <td>${window.terrain.rockSize}</td>
            <td>${window.jumpPosition}</td>
            <td>${window.raceResult}</td>
        </tr>
    `;
    }
    function startTimer() {        
        if(window.timerOn) {
            alert(window.timerOn);
            return false;
        }
        let startTime = Date.now();
        window.timerOn = setInterval((function(){
            let runTime = Date.now() - startTime;
            let seconds = Math.floor(runTime / 1000);
            let milliseconds = runTime - seconds * 1000; 
            window.raceTime = seconds+":"+milliseconds;
            document.getElementById("live-timer").innerHTML = window.raceTime;
            if(window.character.characterPosition >= 1015) {
                window.raceResult = "Success";
            }
            if(window.character.collide(window.character.donut, window.terrain.rock)) {
                window.raceResult = "Fail";
            }
            if(window.raceResult) {
                clearInterval(window.timerOn);
                window.timerOn = false;
                document.getElementById(timerElement).innerHTML = "0:000";
                saveResults();
            }
        }), 10);
    }
    document.addEventListener("keyup", event => {
        if (event.code === "KeyD" && !checkbox.checked) {
            startTimer();    
        }
        if(event.code === "Space") {
            event.preventDefault();
            if(window.character.isRunning) {
                if(window.character.isRunning && window.character.characterPosition < window.terrain.rockPosition)
                    window.jumpPosition = window.character.characterPosition;
            }
        }
    });
});