import { Quiz } from "./Quiz.js";

const nextButton = document.getElementById("next-btn");
let quiz;
setQuiz();

async function setQuiz() {
    quiz = new Quiz(4, "Comics");
    const boundLoadNextQuestion = quiz.loadNextQuestion.bind(quiz);

    nextButton.addEventListener("click", boundLoadNextQuestion);

    quiz.boundLoadNextQuestion = boundLoadNextQuestion;
}