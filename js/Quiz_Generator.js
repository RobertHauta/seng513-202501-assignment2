class QuizFetcher {
    constructor() {
        this.keyValuesCategories = {
            "General Knowledge": 9,
            "Books": 10,
            "Film": 11,
            "Music": 12,
            "Musicals & Theatres": 13,
            "Television": 14,
            "Video Games": 15,
            "Board Games": 16,
            "Science & Nature": 17,
            "Computers": 18,
            "Mathematics": 19,
            "Mythology": 20,
            "Sports": 21,
            "Geography": 22,
            "History": 23,
            "Politics": 24,
            "Art": 25,
            "Celebrities": 26,
            "Animals": 27,
            "Vehicles": 28,
            "Comics": 29,
            "Gadgets": 30,
            "Japanese Anime & Manga": 31,
            "Cartoon & Animations": 32
        }
        this.keyValuesDifficulty = {
            "Easy": "easy",
            "Medium": "medium",
            "Hard": "hard"
        }
        this.generalURL = "https://opentdb.com/api.php?";
    }

    async fetchQuiz(category, difficulty, amount) {
        let url = this.generalURL + "amount=" + amount;
        if (category) {
            url += "&category=" + this.keyValuesCategories[category];
        }
        if (difficulty) {
            url += "&difficulty=" + this.keyValuesDifficulty[difficulty];
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (data.response_code === 0) {
                return new Quiz(data);
            } else {
                throw new Error(`API Error: Response code ${data.response_code}`);
            }
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    }
}

const quizFetcher = new QuizFetcher();

const nextButton = document.getElementById("next-btn");

async function setQuiz() {
    let quizInstance = await quizFetcher.fetchQuiz("Mathematics", "Hard", 5);
    const boundLoadNextQuestion = quizInstance.loadNextQuestion.bind(quizInstance);

    nextButton.addEventListener("click", boundLoadNextQuestion);

    quizInstance.boundLoadNextQuestion = boundLoadNextQuestion;
    return quizInstance;
}

// Set the quiz and ensure it's fully resolved before using it
setQuiz().then(qui => {
    quiz = qui;
}).catch(error => {
    console.error('Error setting quiz:', error);
});