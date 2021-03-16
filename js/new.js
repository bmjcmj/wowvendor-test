document.addEventListener("DOMContentLoaded", function() {
    let checkbox = "autorun-checkbox";
    document.addEventListener("keyup", event => {
        if (event.code === "KeyD" && !checkbox.checked) {
            startTimer("live-timer");    
        }

        if(event.code === "Space") {
            event.preventDefault();
            if(window.character.isRunning) {
                if(window.character.isRunning && window.character.characterPosition < window.terrain.rockPosition)
                    window.jumpPosition = window.character.characterPosition;
            }
        }

        if (event.code === "KeyS" && checkbox.checked) {
            checkbox.checked = false;
        }
    });
    //document.getElementById("autorun-checkbox").addEventListener("change", autorun());
});

function startTimer(timerElement) {
          
    let startTime = Date.now();
    window.timerOn = setInterval((function(){
        let runTime = Date.now() - startTime;
        let seconds = Math.floor(runTime / 1000);
        let milliseconds = runTime - seconds * 1000; 
        window.raceTime = seconds+":"+milliseconds;
        document.getElementById(timerElement).innerHTML = window.raceTime;
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
    }), 1);
}

function autorun() {  
    if(document.getElementById("autorun-checkbox").checked) {
        if(!this.timerOn) {
            this.startTimer();
            return;
        }
        window.character.run();
        if(window.character.characterPosition > window.terrain.rockPosition - 120 && window.character.characterPosition < window.terrain.rockPosition) {
            window.character.jump();
            this.setJumpPosition();         
        }
        this.checkGameResult();
    } else {
        window.character.stop();
    }
}

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


class TheGame {

    timerOn = false;
    startTime = "0:000";
    jumpPosition = 0;
    rockPosition = window.terrain.rockPosition;
    rockSize = window.terrain.rockSize;
    timerElement;
    checkboxElement;
    tableId;

    constructor(timerElement, checkboxElement, tableId) {
        this.timerElement = timerElement;  
        this.checkboxElement = checkboxElement;
        this.tableId = tableId;
        this.checkboxElement = checkboxElement;
    }

    startTimer() {
        if(window.timerOn) {
            return false;
        }          
        let startTime = Date.now();
        let timerElement = this.timerElement;
        window.timerOn = setInterval((function(){
            let runTime = Date.now() - startTime;
            let seconds = Math.floor(runTime / 1000);
            let milliseconds = runTime - seconds * 1000; 
            window.raceTime = seconds+":"+milliseconds;
            document.getElementById(timerElement).innerHTML = window.raceTime;
            var checkGameResult = function() {
                if(window.character.characterPosition >= 1015) {
                    window.raceResult = "Success";
                    return window.raceResult;
                }
                if(window.character.collide(window.character.donut, window.terrain.rock)) {
                    window.raceResult = "Fail";
                    return window.raceResult;
                }
                return false;
            }
            if(window.raceResult) {
                clearInterval(window.timerOn);
                document.getElementById(timerElement).innerHTML = "0:000";
            }
        }), 1);
    }

    setJumpPosition() {
        if(window.character.isRunning && window.character.characterPosition < window.terrain.rockPosition)
            this.jumpPosition = window.character.characterPosition;
    }

    autorun() {  
        if(document.getElementById(this.checkboxElement).checked) {
            if(!this.timerOn) {
                this.startTimer();
                return;
            }
            window.character.run();
            if(window.character.characterPosition > window.terrain.rockPosition - 120 && window.character.characterPosition < window.terrain.rockPosition) {
                window.character.jump();
                this.setJumpPosition();         
            }
            this.checkGameResult();
        } else {
            window.character.stop();
        }
    }

    saveResults() {
        let resultData = new FormData();
        resultData.append('raceTime', window.raceTime);
        resultData.append('rockPosition', window.terrain.rockPosition);
        resultData.append('rockSize', window.terrain.rockSize);
        resultData.append('jumpPosition', window.jumpPosition);
        resultData.append('raceResult', window.raceResult);

        let request = new XMLHttpRequest();
        request.open("POST", "/controller.php");
        request.send(resultData);

        document.querySelector(this.tableId+' tbody').innerHTML += `
        <tr>
            <td>${window.raceTime}</td>
            <td>${window.terrain.rockPosition}</td>
            <td>${window.terrain.rockSize}</td>
            <td>${window.jumpPosition}</td>
            <td>${window.raceResult}</td>
        </tr>
    `;
    }
}
