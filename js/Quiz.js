import {QuizFetcher} from './Quiz_Generator.js';
import {Question} from './Question.js';

export class Quiz {
    constructor(totalQuestions, category) {
        this.correct = 0;
        this.total = totalQuestions;
        this.questions = [];//this.makeQuizQuestions(response.results);
        this.currentQuestionIndex = 0;
        this.loadNextQuestion = this.loadNextQuestion.bind(this);
        this.generator = this.getNextQuestion();
        this.fetcher = new QuizFetcher();
        this.category = category;
        this.difficulty = "Easy";
        this.correctInRow = 0;
    }


    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    incrementCurrentQuestion() {
        console.log("Called");
        this.currentQuestionIndex+=1;
    }

    shiftDifficulty() {
        if (this.correctInRow === 2) {
            if (this.difficulty === "Easy") {
                this.difficulty = "Medium";
            } else if (this.difficulty === "Medium") {
                this.difficulty = "Hard";
            }
            this.correctInRow = 0;
        }
        else if(this.correctInRow === -2) {
            if (this.difficulty === "Hard") {
                this.difficulty = "Medium";
            } else if (this.difficulty === "Medium") {
                this.difficulty = "Easy";
            }
            this.correctInRow = 0;
        }
    }

    guess(answer) {
        if(this.getCurrentQuestion().isCorrect(answer)) {
            this.correct++;
            this.correctInRow++;
            return true;
        }
        this.correctInRow > 0 ? this.correctInRow = -1 : this.correctInRow--; // Reset correctInRow when the user gets a wrong answer
        return false;
    }

    // Load next question by using the questions array
    async loadNextQuestion() {
        this.shiftDifficulty();

        const question = await this.generator.next();
        console.log(question);
        if (!question.done) {
            question.value.displayQuestion(this);
        } else {
            const questionElement = document.getElementById('question');
            questionElement.innerHTML = `Quiz Ended!\n Score: ${this.correct/this.total*100}%`;
            const nextButton = document.getElementById('next-btn');
            nextButton.style.display = 'none';
        }
    }

    async *getNextQuestion() {
        for (let i = 0; i < this.total; i++) {
            try{
                const data = await this.fetcher.fetchQuestion(this.category, this.difficulty);
                const question = new Question(data.results[0]);
                if(!question) {
                    throw new Error("Question not found");
                }
                this.questions.push(question);
                yield question;
            } catch(error) {
                console.error(`Error fetching question: ${error}`);
                console.log(this.fetcher.fetchQuestion(this.category, this.difficulty))
                continue;
            }
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