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
}