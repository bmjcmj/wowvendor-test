function timer(startTime) {
    var runTime = Date.now() - startTime;
    var seconds = Math.floor(runTime / 1000);
    var milliseconds = runTime - seconds*1000;
    window.results.raceTime = seconds+":"+milliseconds;
    document.getElementById("live-timer").innerHTML = window.results.raceTime;
    return seconds+":"+milliseconds;
}

function resetTimer() {
    clearInterval(window.timerOn);
    window.timerOn = false;
    document.getElementById("live-timer").innerHTML = "0:000";
}

function saveResults() {
    document.querySelector('#results-table tbody').innerHTML += `
        <tr>
            <td>${window.results.raceTime}</td>
            <td>${window.terrain.rockPosition}</td>
            <td>${window.terrain.rockSize}</td>
            <td>${window.results.jumpPosition}</td>
            <td>${window.results.raceResult}</td>
        </tr>
    `;
    var formData = new FormData();
    formData.append('raceTime', window.results.raceTime);
    formData.append('rockPosition', window.terrain.rockPosition);
    formData.append('rockSize', window.terrain.rockSize);
    formData.append('jumpPosition', window.results.jumpPosition);
    formData.append('raceResult', window.results.raceResult);
    var request = new XMLHttpRequest();
    request.open("POST", "/controller.php");
    request.send(formData);
}

function autorun() {
    clearInterval(window.handler);
    let checkbox = document.getElementById("autorun-checkbox");
    let startTime = Date.now();
    if (checkbox.checked) {
        clearInterval(window.check);
        if(!window.timerOn) {
            window.timerOn = setInterval((function(){
                timer(startTime);
            }), 10);
        }
        window.character.run();
        window.jump = setInterval((function(){
            if(window.character.characterPosition > window.terrain.rockPosition - 120) {
                if(window.character.characterPosition < window.terrain.rockPosition) {
                    window.character.jump();
                    window.results.jumpPosition = window.character.characterPosition;
                }     
                clearInterval(window.jump);
                window.check = setInterval((function(){
                    checkResult(autorun);
                }), 10);
            }
        }), 10);
        document.addEventListener("keyup", event => {
            if (event.code === "KeyS" && checkbox.checked) {
                checkbox.checked = false;
                clearInterval(window.jump);
            }
        });
    } else {
        window.character.stop();
        clearInterval(window.jump);
        clearInterval(window.check);
    }   
}

function checkResult(handler = false) {
    if(window.character.characterPosition >= 1015) {
        window.results.raceResult = "Success";
    }
    if (window.character.collide(window.character.donut, window.terrain.rock)) {
        window.results.raceResult = "Fail";
    }
    if(window.results.raceResult) {
        clearInterval(window.check);
        resetTimer();
        saveResults();
        window.results.raceResult = false;
        if(handler) {
            setTimeout((function(){
                handler();
            }), 150); 
        }

    }
}

document.addEventListener("keyup", event => {
    if (event.code === "KeyD" && !document.getElementById("autorun-checkbox").checked) {
        clearInterval(window.check);
        if(!window.timerOn) {
            let startTime = Date.now();
            window.timerOn = setInterval((function(){
                timer(startTime);
            }), 10);
        }
        window.check = setInterval((function(){
            checkResult();
        }), 10);
        document.addEventListener("keyup", event => {
            if(window.character.isRunning && event.code === "Space" && window.character.characterPosition < window.terrain.rockPosition) {
                window.results.jumpPosition = window.character.characterPosition;
            } else {
                window.results.jumpPosition = 0;
            }
        });       
    }
});

document.documentElement.addEventListener('keydown', function (event) {
    if(event.code === "Space") {
        event.preventDefault();
    }
}, false);