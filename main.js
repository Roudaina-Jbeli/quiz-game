// List of quiz questions, each with a question, possible answers, and the correct answer index
var questions = [
	{
		question: "what is the capital of France ?",
		answers: ["Paris", "Berlin", "Madrid", "Rome"],
		correct: 0,
	},
	{
		question: "which programming language is used in web development? ",
		answers: ["Java", "Python", "C++", "Html"],
		correct: 3,
	},
	 {
	 	question: "What is the largest planet in our solar system? ",
	 	answers: ["Mars", "Earth", "Jupiter", "Venus"],
	 	correct: 2,
	 },
	 {
	 	question: "Who wrote the play 'Romeo & Juliette'? ",
	 	answers: [
	 		"Charles Dickens",
	 		"William Shakespeare",
	 		"Jane Austen",
	 		"Leo Tolstoy",
	 	],
	 	correct: 1,
	 },
	 {
	 	question: "What country has the highest life expectancy? ",
	 	answers: ["Spain", "Hong Kong", "Dubai", "Germany"],
	 	correct: 1,
	 },
	 {
	 	question: "What year was the United Nations established?? ",
	 	answers: ["2005", "1968", "1800", "1945"],
	 	correct: 3,
	 },
	 {
	 	question: "What phone company produced the 3310? ",
	 	answers: ["apple", "Oppo", "Nokia", "Samsung"],
	 	correct: 2,
	 },
];
// Variables to keep track of quiz state
var currentQuestionIndex = 0;
var playerOneName, playerTwoName;
var playerOneScore = 0, playerTwoScore = 0;
var currentPlayer = 1;
var timerInterval;
// Event listener for the start button

document.getElementById("start-button").addEventListener("click", function() {
      // Get player names from input fields
    playerOneName = document.getElementById("player-one").value;
    playerTwoName = document.getElementById("player-two").value;
// Check if both players entered their names
    if (playerOneName.trim() === "" || playerTwoName.trim() === "") {
        alert("Please enter names for both players.");
        return;
    }
 // Hide player inputs, show quiz container, and start the quiz
    document.getElementById("player-inputs").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    startQuiz();
    updateTurnIndicator();
});
// Function to update the turn indicator
function updateTurnIndicator() {
    var turnIndicator = document.getElementById("turn-indicator");
    if (!turnIndicator) {
        turnIndicator = document.createElement("div");
        turnIndicator.id = "turn-indicator";
        document.getElementById("quiz-container").appendChild(turnIndicator);
    }
// Display current player's turn
    turnIndicator.textContent = "Turn: " + (currentPlayer === 1 ? playerOneName : playerTwoName);
}
// Function to start the timer
function startTimer() {
     // Initialize timer bar animation
    var timerBar = document.getElementById("timer-bar");
    timerBar.style.animation = 'none';
    void timerBar.offsetWidth; 
    timerBar.style.animation = null;
 // Clear any existing interval and set up a new one
    clearInterval(timerInterval);

    var width = 100;
    timerInterval = setInterval(function() {
        width -= 1;
        timerBar.style.width = width + '%';
        // Submit answer when the timer runs out
        if (width <= 0) {
            clearInterval(timerInterval);
            submitAnswer(); // Automatically submit the answer when the timer runs out
        }
    }, 100);
}
// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    var timerBar = document.getElementById("timer-bar");
    timerBar.style.width = '100%';
}
// Function to display the current question
function displayCurrentQuestion() {
    var questionText = document.getElementById("question-text");
    var answerForm = document.getElementById("answer-form");
    // Check if all questions have been answered

    if (currentQuestionIndex >= questions.length) {
        questionText.textContent = "Quiz completed";
        answerForm.innerHTML = "";
        showResult();
    } else {
                // Display the current question and start the timer

        var currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        answerForm.innerHTML = "";
        // Create radio buttons for each answer
        currentQuestion.answers.forEach((answer, i) => {
            var input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = i;
            input.required = true;
            input.id = "q" + currentQuestionIndex + "a" + i;

            var label = document.createElement("label");
            label.textContent = answer;
            label.setAttribute("for", "q" + currentQuestionIndex + "a" + i);

            answerForm.appendChild(input);
            answerForm.appendChild(label);
        });
        // Start the timer for the current question
        startTimer();
    }
}
// Function to submit the answer

function submitAnswer() {
    var answerForm = document.getElementById("answer-form");
    var selectedAnswerInput = answerForm.querySelector('input[name="answer"]:checked');
    // Check if an answer is selected

    if (selectedAnswerInput) {
        var selectedAnswer = parseInt(selectedAnswerInput.value);
        var currentQuestion = questions[currentQuestionIndex];
        // Check if the selected answer is correct

        if (selectedAnswer === currentQuestion.correct) {
                       // Update scores, play sound, and show result

            if (currentPlayer === 1) {
                playerOneScore++;
            } else {
                playerTwoScore++;
            }

            document.getElementById('clapSound').play();
            var resultDiv = document.getElementById("result");
            resultDiv.textContent = 'Your current scores:\n' + playerOneName + ': ' + playerOneScore + '\n' + playerTwoName + ': ' + playerTwoScore;
            // Move to the next question or show result modal

            setTimeout(function() {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    currentPlayer = 3 - currentPlayer; // Switch turns between 1 and 2
                    updateTurnIndicator();
                    displayCurrentQuestion();
                    startTimer(); // Reset the timer for the new question
                } else {
                    showResultModal();
                }
            }, 1000); // Adjust the delay time as needed
        } else {
            document.getElementById('ohNoSound').play();
            setTimeout(function() {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    currentPlayer = 3 - currentPlayer; // Switch turns between 1 and 2
                    updateTurnIndicator();
                    displayCurrentQuestion();
                    startTimer(); // Reset the timer for the new question
                } else {
                    showResultModal();
                }
            }, 1000); // Adjust the delay time as needed
        }
    } else {
        // Player didn't answer in time
        setTimeout(function() {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                currentPlayer = 3 - currentPlayer; // Switch turns between 1 and 2
                updateTurnIndicator();
                displayCurrentQuestion();
                startTimer(); // Reset the timer for the new question
            } else {
                showResultModal();
            }
        }, 1000); // Adjust the delay time as needed
    }

    stopTimer();
}

function showResultModal() {
    var winnerModal = document.getElementById("winner-modal");
    var winnerImage = document.getElementById("winner-image");
    var winnerName = document.getElementById("winner-name");
    var playAgainRevengeButton = document.getElementById("play-again-revenge");

    if (playerOneScore > playerTwoScore) {
        winnerName.textContent = playerOneName + " is the winner!";
    } else if (playerOneScore < playerTwoScore) {
        winnerName.textContent = playerTwoName + " is the winner!";
    } else {
        winnerName.textContent = "It's a tie!";
    }

    // Set the image source accordingly
    winnerImage.src = "./winner.png"

    // Display the modal
    winnerModal.style.display = "block";

    // Button event for playing again
    playAgainRevengeButton.addEventListener("click", function() {
        // Reset quiz and close the modal
        startQuiz();
        winnerModal.style.display = "none";

        // Remove the event listener to avoid multiple bindings
        playAgainRevengeButton.removeEventListener("click", arguments.callee);
    });
}





function showResult() {
    var resultDiv = document.getElementById("result");
    if (playerOneScore > playerTwoScore) {
        resultDiv.textContent = playerOneName + " is the winner!";
    } else if (playerOneScore < playerTwoScore) {
        resultDiv.textContent = playerTwoName + " is the winner!";
    } else {
        resultDiv.textContent = "It's a tie!";
    }

    var playAgainButton = document.getElementById("play-again");
    playAgainButton.style.display = "block";
}

document.getElementById("play-again").addEventListener("click", startQuiz);

function startQuiz() {
    playerOneName = document.getElementById("player-one").value;
    playerTwoName = document.getElementById("player-two").value;
    currentQuestionIndex = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    displayCurrentQuestion();

    var playAgainButton = document.getElementById("play-again");
    playAgainButton.style.display = "none";
}

startQuiz();