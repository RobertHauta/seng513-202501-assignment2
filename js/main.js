import { Quiz } from "./Quiz.js";

const nextButton = document.getElementById("next-btn");
let quiz;

async function setQuiz(number, topic) {
    if (!Number.isInteger(number)) {
        throw new Error("Number of questions must be an integer.");
    }
    quiz = new Quiz(number, topic);
    const boundLoadNextQuestion = quiz.loadNextQuestion.bind(quiz);

    nextButton.addEventListener("click", boundLoadNextQuestion);

    quiz.boundLoadNextQuestion = boundLoadNextQuestion;
}

document.getElementById("start-quiz").addEventListener("click", function() {
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