class User{
    constructor(name, password){
        this.username = name;
        this.password = password;
        this.highscore = 0;
    }
}

document.getElementById("loginButton").addEventListener("click", function(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = new User(username, password);
});