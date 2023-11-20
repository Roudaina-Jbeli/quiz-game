// List of quiz questions, each with a question, possible answers, and the correct answer index
var questions = [
    {
        question: "what is the capital of France ?",
        answers: ["Paris", "Berlin", "Madrid", "Rome"],
        correct: 0
    },
    {
        question: "which programming language is used in web development? ",
        answers: ["Java", "Python", "C++", "Html"],
        correct: 3
    },
    {
        question: "What is the largest planet in our solar system? ",
        answers: ["Mars", "Earth", "Jupiter", "Venus"],
        correct: 2
    },
    {
        question: "Who wrote the play 'Romeo & Juliette'? ",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Leo Tolstoy"],
        correct: 1
    },
    {
        question: "What country has the highest life expectancy? ",
        answers: ["Spain", "Hong Kong", "Dubai", "Germany"],
        correct: 1
    },
    {
        question: "What year was the United Nations established?? ",
        answers: ["2005", "1968", "1800", "1945"],
        correct: 3
    },
    {
        question: "What phone company produced the 3310? ",
        answers: ["apple", "Oppo", "Nokia", "Samsung"],
        correct: 2
    },
]
// Variable to remember which question we're on
var currentQuestionIndex = 0 // It's like a note telling us the number of the question we're dealing with.
// Variable to remember how many questions the player got right
var score = 0 // It's like a note keeping count of the correct answers the player has given.

function displayCurrentQuestion() { // Function to display the current question on the webpage
    var questionText = document.getElementById("question-text")
    var answerForm = document.getElementById("answer-form")
    // Check if all questions have been answered
    if (currentQuestionIndex >= questions.length) {
        questionText.textContent = "Quiz completed"
        answerForm.innerHTML = ""
        showResult()
    } else {
                // Display the current question and its answer options
        var currentQuestion = questions[currentQuestionIndex]
        questionText.textContent = currentQuestion.question
        answerForm.innerHTML = ""
 // Create radio buttons for each answer option
        currentQuestion.answers.forEach((answer, i) => { //i use forEach because it allows me to execute a given function on each element of the array.
    
            var input = document.createElement("input")
            input.type = "radio"
            input.name = "answer"
            input.value = i
            input.required = true
            input.id = 'q' + currentQuestionIndex + 'a' + i

            var label = document.createElement("label")
            label.textContent = answer
            label.setAttribute("for", 'q' + currentQuestionIndex + 'a' + i)// i use setattribute because it adds a new attribute or changes the value of an existing attribute for the specified element
            //appendChild() is a method in JS that is used to append or add a new child element to a parent element
            answerForm.appendChild(input)
            answerForm.appendChild(label)
        })
    }
}
// Function to check the submitted answer and update the score
function submitAnswer() {
    var answerForm = document.getElementById("answer-form")
    var selectedAnswer = parseInt(answerForm.querySelector('input[name="answer"]:checked').value)
    // Check if a valid answer is selected

    if (!isNaN(selectedAnswer)) { //check if selectedAnswer is not a NaN (Not-a-Number).
        var currentQuestion = questions[currentQuestionIndex]

        
        if (selectedAnswer === currentQuestion.correct) { // Check if the selected answer is correct
            score++

            //  make a clapping sound!
            document.getElementById('clapSound').play()

            var resultDiv = document.getElementById("result")
            resultDiv.textContent = 'Your current score: ' + score + ' out of ' + questions.length

            currentQuestionIndex++
   // Check if all questions have been answered
            if (currentQuestionIndex >= questions.length) {
                showResult()
            } else {
                displayCurrentQuestion()
            }
        } else {
            // Reset the score to 0 if the answer is incorrect
            score = 0

            // Play "Oh no" sound
            document.getElementById('ohNoSound').play()

             // Display an alert for an incorrect answer
            alert("Incorrect answer! Score reset to 0.")
            startQuiz() // You can choose to restart the quiz immediately or take another action
        }
    }
}



document.getElementById('next-button').addEventListener("click", submitAnswer)

function showResult() {
    var resultDiv = document.getElementById("result")
    if (score === questions.length) {
        resultDiv.textContent = 'Congratulations! You got all the answers right! 🎉'
    } else {
        resultDiv.textContent = 'Your score for this step: ' + score + ' out of ' + questions.length
    }

    var playAgainButton = document.getElementById("play-again")
    playAgainButton.style.display = "block"
}

document.getElementById("play-again").addEventListener("click", startQuiz)

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    displayCurrentQuestion()

    var playAgainButton = document.getElementById("play-again")
    playAgainButton.style.display = "none"
}

startQuiz()

///////////////////

//A radio button is like a little circle you can click on a computer screen