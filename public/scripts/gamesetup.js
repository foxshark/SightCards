var levels = [];
var inventory = [];
var words = [];
var sound = null;
var answerWord = null;
var numCorrect = 0;
var numWrong = 0;
var gameActive = false;
var currentLevel = 0;
var completedLevels = 0;
var fanfare = null;
var swingHit = null;
var swingMiss = null;
var introSound = null;

$('#scene_game').hide();
$('#scene_loot').hide();
$('#scene_home').hide();
$('#scene_victory').hide();
//$('#intro_card').hide();

$(document).ready(function(){
	$('.btn-primary').click(function() {
            sound.play($(this).attr("value"));
            if( $(this).hasClass("card_btn")) {
            }
        });

	$('#scene_game').on('click', '.card_btn', function() {
		if(gameActive){
			gameActive = false; //deactivate play controls once selection made
            sound.play($(this).attr("value"));
            if( $(this).attr("value") == answerWord) {
            	swingHit.play();
            	numCorrect++;
            	$(this).attr({'disabled': true});
            	console.log('answewrWord = ' + numCorrect);
            	if(numCorrect >= 1) {
            		endLevel();
            	} else {
            		var scorePoint = $('<div class="good_point">*</div>');
					$("#score").append(scorePoint);//put button
					//answerWord = setUpBoard(words);  	
            		
					scorePoint
					  .animate({marginLeft: "-2px"}, 200)
					  .delay(300)
					  .queue(function(){
					  	console.log("finished delay");
						answerWord = setUpBoard(words);  	
					  });
					  
            	}
            } else {
            	swingMiss.play();
            	numWrong++;
            	$(this).removeClass("card_btn");
            	$(this).addClass("card_btn_dead");
            	//or just do this:
            	$(this).hide();
            	$('#score')
				  .animate({color:'red'}, 200)
				  .delay(30)
				  .animate({color:'white'}, 100, function(){
				  	gameActive = true;
				  });
            }
            //$("#score").html("Score "+numCorrect+"😄 "+numWrong+"😖");
        }
    });


	$('#scene_game').on('click', '.btn-success', function() {
			// big green button
            sound.play($(this).attr("value"));
        });
	
	$('#scene_home').on('click', '.level_btn', function() {
			if(!$(this).hasClass("opened")) {
				//start game
				startLevel($(this).attr("value"));
			} else {
				return false;
			}
        });

	$('#scene_intro').on('click', '.gamecard', function() {
		endIntro();
	});

	setUpLevels(9);
	setUpInventory();
	playIntro(0,2);
});

function playIntro(columnOffset, rowOffset){
	$("#intro_card").find(".gamecard").each(function(){
		columnOffset = Math.floor(Math.random() * Math.floor(8));
		rowOffset = Math.floor(Math.random() * Math.floor(5));
		$(this).css("background-position", (columnOffset * -64) + "px " + (rowOffset * -96) + "px");	
	});

	introSound = new Howl({
			src: ['assets/audio/intro_speech_auto.mp3'],
			autoplay: true,
			loop: false,
			volume: 1,
			onend: function() {
				endIntro();
			},
		});
}

function endIntro() {
	introSound.stop();
	$('#scene_intro').hide();
	$('#scene_home').show();	
}

function startLevel(level) {
	gameLevel(level);
	currentLevel = level;
	$("#score").empty();
	$('#scene_home').hide();
	$('#scene_game').show();
}

function endLevel() {
	$('#scene_game').hide();
	//$('#scene_home').show();
	console.log("end level: "+currentLevel);
	levels[(currentLevel-1)].calculateScore(numWrong);
	numCorrect = 0;
	numWrong = 0;
	this.startLoot();
}

function startLoot() {
	completedLevels++;
	$('#scene_loot').show();
	//$('scene_loot').hide();
	//$('#scene_home').show();
}

function endLoot() {
	$("#area_treasure_box").empty();
	$("#area_loot_reveal").empty();	
	$('#scene_loot').hide();
	if(completedLevels >= 1) {//} levels.length) {
		victory();
	} else {
		$('#scene_home').show();	
	}
}

function victory() {
	$('#scene_victory').show();
}

function setUpInventory(){
	$.get("assets/images/sprites/inventory.json", function(data) {
		var items = [];
		$.each(data, function(i, spriteData){
			var item = new inventoryItem(spriteData);
			item.addBlankSpot();
			items.push(item);
		});

		var numItems  = data.length;
		var numLevels = levels.length;
		var itemsPerLevel = Math.ceil(numItems/numLevels);
		console.log("splitting array into " + numLevels);

		// assign them to levels next
		items.sort(function(a, b){return 0.5 - Math.random()});
		for (var i = 0; i<numLevels; i++) {
			if((i+1 < numLevels)) { //account for odd numbers / remainders
				var lootGroup = items.slice((i*itemsPerLevel), ((i+1)*itemsPerLevel));	
			} else {
				var lootGroup = items.slice((i*itemsPerLevel));	
			}
			
			levels[i].assignLoot(lootGroup);
		}
	});
}

function setUpLevels(numLevels){
	setUpSounds();
	for(var x = 1; x < (numLevels + 1); x++) {
		var card = new levelCard(x);
		card.addToScene();
		levels.push(card);
	}
}