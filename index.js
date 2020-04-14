
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
alert("At the beginning of the game, one of the 4 keys lights up randomly producing simultaneously a sound associated to the key. The player has to press the same key. Next, the Simon turns back the same light on and a second one, again randomly. The player has to reproduce this chain of light using his memory. And so on... In each round a new key is added to the series and the game becomes all the more difficult as the player's memory is put to the test. If the player doesn't make any mistake, the game goes on, so it is an endless game!");

$(document).keydown(function() {
	if (!started) {
		started = true;
		$("#level-title").text("Level " + level);
		setTimeout(function () {
			nextSequence();
		},500);
	}
});

$(".btn").click(function() {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length){

		setTimeout(function() {
			nextSequence();
		}, 1000);
	 }
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game over! Press any key to restart");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * (4));
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	playAudio(randomChosenColour);
}

function animatePress(currentColour) {
	$("#"+currentColour).addClass("pressed");
	setTimeout(function () {
		$("#"+currentColour).removeClass("pressed");
	}, 100);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}



function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}