var startButton = document.querySelector(".start-button")
var timerElement = document.querySelector("#timer-count")
var userInitialsInput = document.querySelector ("#user-initials-input")
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
    var scores = document.getElementById("scores")
    scores.textContent = "Your final score is " + score + "/5";
}

function timesUp() {
    startButton.disabled = false;
    var scores = document.getElementById("user-score");
    scores.textContent = "Your final score is " + score + "/5";
}

function saveUserScore() {
    var userInitials = userInitialsInput.value;
    if (userInitials === "") {
        alert("Please type in your initials")
        return;
    }
    var highScores = {
        userInitials: userInitialsInput.value,
        newScore: score
    }
    
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function clearScoreDisplay() {
    var scores =document.getElementById("user-score")
    scores.textContent = ""
}

startButton.addEventListener("click", function(){
    startGame();
    clearScoreDisplay();
});

submitButton.addEventListener("click", saveUserScore); 