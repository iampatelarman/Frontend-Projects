var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = true;
var level = 0;

// Generating sequence 
function nextSequence()
{
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);
    level++;
    $("#level-title").html("level "+level);
    
}

// Button click 
$(".btn").click(function (event)
{
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
   animatePress(userChosenColor);
    checkSequence(userClickedPattern.length-1);
    
})
    // Sound
function playSound(name)
{
    var audio = new Audio("sounds\\"+name+".mp3");
    audio.play();
}
// Animation
function animatePress(currentColor)
{   var char = "."+currentColor;
    $(char).addClass("pressed");
    setTimeout(function ()
    {
        $(char).removeClass("pressed");
    },100)   ;
}

// detecting Key
$(document).keydown(function ()
{   while (started)
    {
    nextSequence();
    level = 0;
    $("#level-title").html("Level 0");
    started = false;
    }
});

// checking sequence of user clicks
function checkSequence(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            console.log("equal")
        }
        else
        {
            return ;
        }
    }
    else 
    {
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function ()
       {
           $("body").removeClass("game-over");
       },300)   ;
       $("#level-title").html("Game Over! press any key to restart");
       startOver();
       return ;

    }
    setTimeout(function ()
    {
        nextSequence();
    },1000);
    userClickedPattern = [];
}

//start over 
function startOver()
{
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = true;
}