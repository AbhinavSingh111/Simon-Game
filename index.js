let started = false;
const buttonColors = ["red" , "blue" , "green" , "yellow"];
let randChosenColor ;
let gamePattern = [] ;
let userClickedPattern = [];
let level = 0;

function animate(colorPressed){
    let query = "#"+colorPressed;
    $(query).addClass("pressed");
    setTimeout(() => {
        $(query).removeClass("pressed");
    }, 100);
}

function wrongClick(){
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);
}

function audioPlayer(colorPressed){
   let path = "./sounds/"+colorPressed+".mp3";
   let sound = new Audio(path);
   sound.play();
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            console.log('success')
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        
    }
    else{
        audioPlayer("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

$(".btn").on("click",function (event){
    const userChosenColor = event.target.id;
    audioPlayer(userChosenColor);
    animate(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
    level += 1
    userClickedPattern =[];
    const randNum = Math.floor((Math.random()*4));
    randChosenColor = buttonColors[randNum];  
    document.querySelectorAll("link")[2].setAttribute("href","./images/"+randChosenColor+".png");
    audioPlayer(randChosenColor);
    animate(randChosenColor);
    $("h1").text("Level "+level);
    gamePattern.push(randChosenColor);
}

$(document).on("keypress",()=>{
    if (!started){
        nextSequence();
        started = true;
    }
});




