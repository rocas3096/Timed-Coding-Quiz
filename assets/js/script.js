var timerElement = document.querySelector(".timer-count")
var startButton = document.querySelector(".start-button")


var timer;
var timerCount;

function startGame(){
    timerCount=100
    startButton.disabled = true;
    startTimer()
}

function startTimer() {
    timer = setInterval(function (){
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >=0) {
            if (finishQuestions & timerCount > 0) {
                clearInterval(timer);
                finishQuestions();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000)
}

startButton.addEventListener("click", startGame)

var playagainbutton = document.querySelector(".play-again-button");

function resetGame() {
    setHighscores()
}

playagainbutton.addEventListener("click", resetGame);