var startButton = document.querySelector(".start-button")
var timerElement = document.querySelector("#timer-count")
var userInitialsInput = document.querySelector ("#user-initials-input")
var highScoresButton = document.getElementById("high-scores-button");
var highScoresList = document.getElementById("high-scores-list");
var submitButton = document.querySelector("#submit-button");
var scores = document.getElementById("scores");
submitButton.disabled = true;
var index = 0;
var score = 0;
var timer;
var timerCount;
var questions = [
    {
        question: "commonly used data types do not include which of the following:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "Arrays in Javascript can be used to store which of the following:",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "The condition in an if/else statement is enclosed within which of the following:",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        question: "String values must be enclosed within _____ when being assiged to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    }
];


function startGame(){
    index = 0;
    score = 0;
    timerCount = 100;
    startButton.disabled = true;
    submitButton.disabled = true;
    startTimer();
    showQuestions();
}

function startTimer() {
    timer = setInterval(function (){
        timerCount--;
        timerElement.textContent = "Time: " +timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            timesUp();
        }
    }, 1000)
}

function showQuestions() {
    var currentQuestion = questions[index];
    var questionasked = document.getElementById("question-asked")
    var questionanswerchoices = document.getElementById("question-answer-choices");
    questionasked.textContent = currentQuestion.question;
    questionanswerchoices.textContent = ""
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = currentQuestion.choices[i];
        button.setAttribute("user-answer", currentQuestion.choices[i]);
        button.addEventListener("click", function() {
            var userAnswer = this.getAttribute("user-answer");
            if (userAnswer === currentQuestion.answer) {
                score ++;
            } else {
                timerCount -= 10;
            }
            index++;
            if (index >= questions.length) {
                endQuiz();
            } else {
                showQuestions();
            }
        });
        li.appendChild(button);
        questionanswerchoices.appendChild(li);
    }

}

function endQuiz(){
    startButton.disabled = false
    clearInterval(timer);
    scores.textContent = "Your final score is " + score + "/5";
    clearHighScoreList();
    submitButton.disabled = false;
}

function timesUp() {
    startButton.disabled = false;
    var scores = document.getElementById("user-score");
    scores.textContent = "Your final score is " + score + "/5";
    clearHighScoreList();
    submitButton.disabled = false;
}

function saveUserScore() {
    var userInitials = userInitialsInput.value;
    if (userInitials === "") {
        alert("Please type in your initials")
        return;
    }
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    if (!Array.isArray(highScores)) {
        highScores = [];
    }
    var newScore = {
        userInitials: userInitials,
        score: score
    }

    highScores.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function viewHighScores () {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = "";

    if (highScores.length === 0) {
        alert("No high scores found")
    } else {
        //sorts scores in order of descedning value
        highScores.sort(function(a,b) {
            return b.score - a.score;
        });

        //limits high scores to top 10
        var numToShow = Math.min (highScores.length,10);

        for (var i = 0; i < highScores.length; i++) {
            var li2 = document.createElement("li");
            li2.textContent = highScores[i].userInitials + ": " + highScores[i].score;
            highScoresList.appendChild(li2)
        }
    }
}

function clearHighScoreList() {
    highScoresList.innerHTML = "";
}

startButton.addEventListener("click", function(){
    startGame();
    clearHighScoreList();
    userInitialsInput.value = "";
    scores.textContent = "";
});

submitButton.addEventListener("click", function() {
    saveUserScore();
    clearHighScoreList();
}); 

highScoresButton.addEventListener("click", viewHighScores)