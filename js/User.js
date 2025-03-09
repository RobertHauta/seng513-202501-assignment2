export class User{
    constructor(name, password){
        this.username = name;
        this.password = password;
        this.highscoreHistory = [];
    }

    updateHighscore(score, category){
        const match = this.highscoreHistory.find(history => history.category === category);
        if(!match){
            this.highscoreHistory.push({category: category, scores: [score]});
            return;
        }
        match.scores.push(score);
    }

    getHighscore(category){
        const match = this.highscoreHistory.find(history => history.category === category);
        if(!match){
            return 0;
        }
        return match.scores.sort();
    }

    displayHighscore(category){
        const highscoreContainer = document.getElementById('highscores-list');
        let scores = this.getHighscore(category);
        console.log(scores);
        scores.forEach(score => {
            const scoreLabel = document.createElement('li');
            scoreLabel.className = 'score-label';
            scoreLabel.innerHTML = score;
            highscoreContainer.appendChild(scoreLabel);
        });
    }
}