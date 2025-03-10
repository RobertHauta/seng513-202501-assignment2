import { Quiz } from "./Quiz.js";
import {User } from "./User.js";

let quiz;

onLoad();

async function onLoad(){
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "none";
    document.getElementById("highscore-container").style.display = "none";
}

async function setQuiz(number, topic) {
    const nextButton = document.getElementById("next-btn");

    if (!Number.isInteger(number)) {
        throw new Error("Number of questions must be an integer.");
    }
    quiz = new Quiz(number, topic, user);
    const boundLoadNextQuestion = quiz.loadNextQuestion.bind(quiz);

    nextButton.addEventListener("click", boundLoadNextQuestion);

    quiz.boundLoadNextQuestion = boundLoadNextQuestion;
}

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stops the form from refreshing the page
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    user = new User(username, password);
    console.log("Username:", username, "Password:", password);
    document.getElementById("welcome-username").innerHTML = `Welcome ${username}`;

    document.getElementById("login-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "flex";
    document.getElementById("highscore-container").style.display = "flex";
});

document.getElementById("start-quiz").addEventListener("click", async function() {
    await resetQuiz();

    let topics = document.getElementById("topic");
    let topic = topics.options[topics.selectedIndex].text;

    let questions = document.getElementsByName("questions");
    let questionNumber = null;
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].checked) {
            questionNumber = Number(questions[i].value);
            break;
        }
    }

    if(questionNumber){
        setQuiz(questionNumber, topic);

        document.getElementById("quiz-container").style.display = "flex";
        document.getElementById("homepage-container").style.display = "none";
        document.getElementById("highscore-container").style.display = "none";
        document.getElementById("login-container").style.display = "none";
    }
});

document.getElementById("topic").addEventListener("change", function(){
    user.showHighscore();
});

document.getElementById("app-name").addEventListener("click", function() {
    document.getElementById("login-container").style.display = "flex";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "none";
    document.getElementById("highscore-container").style.display = "none";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("topic").selectedIndex = 0;
    let radioButtons = document.getElementsByName('questions');
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
    });
});


async function resetQuiz(){
    if(quiz){
        quiz = null;
    }

    let oldButton = document.getElementById('next-btn');
    let newButton = document.createElement('button');
    newButton.textContent = 'Next Question';
    newButton.className = 'button';
    newButton.id = 'next-btn';
    oldButton.parentNode.replaceChild(newButton, oldButton);
    document.getElementById("next-btn").style.display = 'block';
    document.getElementById("question").textContent = 'Click "Next Question" to start!';
    document.getElementById("options-list").innerHTML = '';
}