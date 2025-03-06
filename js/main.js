import { Quiz } from "./Quiz.js";

const nextButton = document.getElementById("next-btn");
let quiz;
onLoad();

async function onLoad(){
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "none";
}

async function setQuiz(number, topic) {
    if (!Number.isInteger(number)) {
        throw new Error("Number of questions must be an integer.");
    }
    quiz = new Quiz(number, topic);
    const boundLoadNextQuestion = quiz.loadNextQuestion.bind(quiz);

    nextButton.addEventListener("click", boundLoadNextQuestion);

    quiz.boundLoadNextQuestion = boundLoadNextQuestion;
}

document.getElementById("login-btn").addEventListener("click", function(){
    document.getElementById("login-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "block";
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stops the form from refreshing the page
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("Username:", username, "Password:", password);
});

document.getElementById("start-quiz").addEventListener("click", function() {
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("homepage-container").style.display = "none";

    let topics = document.getElementById("topic");
    let topic = topics.options[topics.selectedIndex].text;

    let questions = document.getElementsByName("questions");
    let questionNumber = 0;
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].checked) {
            questionNumber = Number(questions[i].value);
            break;
        }
    }

    setQuiz(questionNumber, topic);
});