class Quiz {
    constructor(response) {
        this.correct = 0;
        this.total = response.results.length;
        this.questions = this.makeQuizQuestions(response.results);
        this.currentQuestionIndex = 0;
        this.loadNextQuestion = this.loadNextQuestion.bind(this);
        this.generator = this.getNextQuestion();
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    incrementCurrentQuestion() {
        console.log("Called");
        this.currentQuestionIndex+=1;
    }

    guess(answer) {
        if(this.getCurrentQuestion().isCorrect(answer)) {
            this.correct++; // Fix: use 'this.correct' instead of 'this.score'
            return true;
        }
        return false;
    }

    // Load next question by using the questions array
    loadNextQuestion() {
        const question = this.generator.next();
        if (!question.done) {
            question.value.displayQuestion();
        } else {
            const questionElement = document.getElementById('question');
            questionElement.innerHTML = `Quiz Ended!\n Score: ${this.correct/this.total*100}%`;
            const nextButton = document.getElementById('next-btn');
            nextButton.style.display = 'none';
        }
    }

    *getNextQuestion() {
        for (const question of this.questions) {
            yield question;
        }
    }

    getSelectedAnswer() {
        let checkboxes = document.querySelectorAll('.option-input');
        const checkedCheckbox = Array.from(checkboxes).find(checkbox => checkbox.checked);
        if (checkedCheckbox) {
            return checkedCheckbox.value;
        }
        return null; // If no checkbox is checked, return null
    }

    makeQuizQuestions(results) {
        return results.map(question => new Question(question));
    }
}