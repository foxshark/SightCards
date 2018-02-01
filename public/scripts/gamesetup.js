var levels = [];
var words = [];
var sound = null;
var answerWord = null;
var numCorrect = 0;
var numWrong = 0;


$(document).ready(function(){
	$('.btn-primary').click(function() {
            sound.play($(this).attr("value"));
            if( $(this).hasClass("card_btn")) {
            }
        });

	$('#scene_game').on('click', '.card_btn', function() {
            sound.play($(this).attr("value"));
            if( $(this).attr("value") == answerWord) {
            	numCorrect++;
            	$(this).attr({'disabled': true});
            	console.log('answewrWord = ' + numCorrect);
            	if(numCorrect >= 10) {
            		endLevel();
            	} else {
					$('#score')
					  .animate({color:'green'}, 400)
					  .delay(100)
					  .animate({color:'white'}, 400, function(){
						answerWord = setUpBoard(words);  	
					  });
            	}
            } else {
            	numWrong++;
            	$(this).attr({'disabled': true});
            	$('#score')
				  .animate({color:'red'}, 200)
				  .delay(30)
				  .animate({color:'white'}, 100);
            }
            $("#score").html("Score "+numCorrect+"😄 "+numWrong+"😖");
        });


	$('#scene_game').on('click', '.btn-success', function() {
			// big green button
            sound.play($(this).attr("value"));
        });
	
	$('#scene_home').on('click', '.level_btn', function() {
			//start game
			startLevel($(this).attr("value"));
        });
	$('#scene_game').hide();
	setUpLevels();
});

function startLevel(level) {
	gameLevel(level);
	$('#scene_home').hide();
	$('#scene_game').show();
}

function endLevel() {
	$('#scene_game').hide();
	$('#scene_home').show();
	numCorrect = 0;
	numWrong = 0;
}


function setUpLevels(){
	for(var x = 1; x < 7; x++) {
		var card = new levelCard(x);
		card.addToScene();
		levels.push(card);
	}
}