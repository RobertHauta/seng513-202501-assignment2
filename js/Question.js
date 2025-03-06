export class Question {
    constructor(question) {
        this.category = question.category;
        this.question = question.question;
        this.options = [question.correct_answer, ...question.incorrect_answers].sort();
        this.answer = question.correct_answer;
        this.type = question.type;
        this.difficulty = question.difficulty;
    }

    isCorrect(answer) {
        return this.answer === answer;
    }

    displayQuestion(quiz) {
        const questionContainer = document.getElementById('quiz-container');

        const questionText = document.getElementById('question');
        questionText.innerHTML = this.question;

        const optionsContainer = document.getElementById('options-list');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }

        this.options.forEach((option, index) => {
            const optionLabel = document.createElement('li');
            optionLabel.className = 'option-label';

            const optionInput = document.createElement('input');
            optionInput.type = 'checkbox';
            optionInput.className = 'option-input';
            optionInput.name = 'question-option';
            optionInput.value = option;
            optionInput.id = `option-${index}`;

            const optionText = document.createTextNode(option);

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
            optionsContainer.appendChild(optionLabel);
        });
        this.setOptionInputRule();

        const oldbutton = document.getElementById('next-btn');
        const newButton = document.createElement('button');
        newButton.textContent = 'Submit';
        newButton.className = 'button';
        newButton.id = 'next-btn';
        newButton.addEventListener('click', submitQuestion.bind(quiz));
        // Using Bind Here so function knows this is a Question object
        oldbutton.parentNode.replaceChild(newButton, oldbutton);

        return questionContainer;
    }

    setOptionInputRule(){
        const checkboxes = document.querySelectorAll('.option-input');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // If the current checkbox is checked, uncheck all others
                if (checkbox.checked) {
                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            });
        });
    }
}

var submitQuestion = function () {
    const button = document.getElementById('next-btn');
    const optionsContainer = document.getElementById('options-list');
    const questionText = document.getElementById('question');
    let user_answer = this.getSelectedAnswer();

    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    questionText.innerHTML = this.guess(user_answer) ? "Correct!" : "Incorrect!";
    this.incrementCurrentQuestion();
    button.innerHTML = "Next Question";
    if(!this.isValid){
        button.style.cssText = "background-color: #e91d2d";
    }
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    newButton.addEventListener("click", this.boundLoadNextQuestion);
}