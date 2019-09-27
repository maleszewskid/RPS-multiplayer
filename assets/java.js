var firebaseConfig = {
    apiKey: "AIzaSyB_u64MjpDHqA7cw3xQ4QCAnnlRvpcLfi8",
    authDomain: "domm-a7373.firebaseapp.com",
    databaseURL: "https://domm-a7373.firebaseio.com",
    projectId: "domm-a7373",
    storageBucket: "",
    messagingSenderId: "651633677889",
    appId: "1:651633677889:web:8731b3f75b269e2c6658c0"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


var computerChoices = ["r", "p", "s"];

var user = {
    userName: "",
    wins: 0,
    losses: 0,
    ties: 0,
    comment: ""

}
var userGuess = "";
var userChoiceText = "";
var computerChoiceText = "";


database.ref().on("child_added", function(childSnapshot) {


    $("#leaderboards").append("<div class='well'><span>Username: " +
        childSnapshot.val().User +
        " </span><span > | Wins: " + childSnapshot.val().Win +
        " </span><span > | Losses: " + childSnapshot.val().Loss +
        " </span><span > | Ties: " + childSnapshot.val().Tie +
        "</span><span > | Comments: " + childSnapshot.val().Comment +
        "</span>")
})


$(document).on("click", "#submit", function newUser() {

    user.userName = $("#username").val().trim();

    alert("Welcome " + user.userName)
})
$(document).on("click", "#submit1", function newUser() {

    user.comment = $("#comment").val().trim();

})
$(document).on("click", ".btn", function game() {

    userGuess = $(this).val();
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

        if ((userGuess === "r" && computerGuess === "s") ||
            (userGuess === "s" && computerGuess === "p") ||
            (userGuess === "p" && computerGuess === "r")) {
            user.wins++;
        } else if (userGuess === computerGuess) {
            user.ties++;
        } else {
            user.losses++;
        }
    }
    $("#userchoice-text").text("You chose: " + userGuess);
    $("#computerchoice-text").text("The computer chose: " + computerGuess);
    $("#wins-text").text("wins: " + user.wins);
    $("#losses-text").text("Losses: " + user.losses);
    $("#ties-text").text("Ties: " + user.ties);

    database.ref(user.userName).set({
        User: user.userName,
        Win: user.wins,
        Loss: user.losses,
        Tie: user.ties,
        Comment: user.comment
    })
})