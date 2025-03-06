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

document.getElementById("start-quiz").addEventListener("click", function() {
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("homepage-container").style.display = "none";

    let topic = document.getElementById("topic").options[selectElement.selectedIndex].text;

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