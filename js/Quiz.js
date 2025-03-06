import {QuizFetcher} from './Quiz_Generator.js';
import {Question} from './Question.js';

export class Quiz {
    constructor(totalQuestions, category) {
        this.correct = 0;
        this.total = totalQuestions;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.loadNextQuestion = this.loadNextQuestion.bind(this);
        this.generator = this.getNextQuestion();
        this.fetcher = new QuizFetcher();
        this.category = category;
        this.difficulty = "Easy";
        this.correctInRow = 0;
        this.isValid = true;
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
        if(!this.isValid){
            return;
        }

        this.shiftDifficulty();

        const question = await this.generator.next();
        console.log(question);
        if (!question.done) {
            question.value.displayQuestion(this);
            this.isValid = false;
            this.timeout5Seconds();
        } else {
            const questionElement = document.getElementById('question');
            questionElement.innerHTML = `Quiz Ended!\n Score: ${this.correct/this.total*100}%`;
            const nextButton = document.getElementById('next-btn');
            nextButton.style.display = 'none';
            let homeButton = document.createElement('button');
            homeButton.classList.add('button');
            homeButton.id = 'next-btn';
            homeButton.textContent = 'Return to Home';
            homeButton.addEventListener('click', () => {
                document.getElementById("login-container").style.display = "none";
                document.getElementById("quiz-container").style.display = "none";
                document.getElementById("homepage-container").style.display = "block";
            });
            nextButton.parentNode.replaceChild(homeButton, nextButton);
            user.updateHighscore(this.correct/this.total*100, this.category);
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

    async timeout5Seconds() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.isValid = true;

        const button = document.getElementById('next-btn');
        if(button.innerHTML === 'Next Question'){
            button.style.cssText = "background-color: #007bff";
        }
    }
}