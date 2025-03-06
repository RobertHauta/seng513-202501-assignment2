class User{
    constructor(name, password){
        this.username = name;
        this.password = password;
        this.highscore = 0;
        this.highscoreHistory = [];
    }

    updateHighscore(score, category){
        const match = this.highscoreHistory.find(history => history.category === category);
        if(match){
            
        }
        this.highscore = Math.max(this.highscore, score);
        this.highscoreHistory.push(score);
    }
}

document.getElementById("loginButton").addEventListener("click", function(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = new User(username, password);
});