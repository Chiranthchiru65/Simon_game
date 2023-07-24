var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var RandomChosenColor = buttonColors[randomNumber];
  gamePattern.push(RandomChosenColor);

  $("#" + RandomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(RandomChosenColor);

  //   console.log(randomNumber);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

  // nextSequence(userChosenColor);
  console.log(userClickedPattern);
  console.log(gamePattern);
});

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function animatePress(currentColor) {
//   $("#" + currentColor).addclass(".pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeclass(".pressed");
//   }, 100);
// }

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// $("#green").click(function () {
//   $("#green").fadeIn(200).fadeOut(200).fadeIn(200);
//   var audio = new Audio("sounds/green.mp3");
//   audio.play();
// });

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over,press any key to restart");

    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
