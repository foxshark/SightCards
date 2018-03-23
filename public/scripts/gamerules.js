var gameLevel = function(level) {
	$.get("assets/audio/speech_20180106031119366.marks", function(data) {
		var marks = data.split("\n");
		marks.reverse(); //read last to first
		var markObject = {};
		var lastTime = 0;
		$.each(marks, function(i,mark) {
			if(mark != "") {
				markObject = JSON.parse(mark);	
				var word = {
					timeStart:markObject.time,
					value:markObject.value
				}

				//calculate end time based on start of previous word
				if(lastTime > 0) {
					word.duration = lastTime - markObject.time;
				} else {
					word.duration = 3000; //default to 3 sec duration
				}

				lastTime = markObject.time;
				words.push(word);
			}
		});

		var spriteSounds = {};
		$.each(words, function(i, word) {
			spriteSounds[word.value] = [word.timeStart, word.duration]; //set up sprite
			//$(".button_field").append('<a class="btn btn-primary" value="'+word.value+'" href="#">'+word.value+'</a> ');//put button
		});
		sound = new Howl({
			src: ['assets/audio/speech_20180106031107913.mp3'],
			loop: false,
			volume: 1,
			sprite: spriteSounds
		});
		
		answerWord = setUpBoard(words);
	});
}

var setUpSounds = function() {
	fanfare = new Howl({
		src: ['assets/audio/finale.wav'],
		loop: false,
		volume: 0.25
	});

	gameOver = new Howl({
		src: ['assets/audio/fanfare.wav'],
		loop: false,
		volume: 0.25
	});

	swingHit = new Howl({
		src: ['assets/audio/swing_hit.wav'],
		loop: false,
		volume: 0.25
	});

	swingMiss = new Howl({
		src: ['assets/audio/swing_miss.wav'],
		loop: false,
		volume: 0.25
	});
}

var setUpBoard = function(words) {
	$("#card_field").empty();
	words.sort(function(a, b){return 0.5 - Math.random()});
	words = words.slice(0,4);
	var answerWord = words[Math.floor(Math.random()*4)].value;
	$("#card_gui").attr("value", answerWord);//set NPC button word
	$.each(words, function(i, word) {
		var card = $('<div class="gamecard"><a class="card_btn" value="'+word.value+'" href="#">'+word.value+'</a></div>');
		var columnOffset = Math.floor(Math.random() * Math.floor(8));
		var rowOffset = Math.floor(Math.random() * Math.floor(5));
		card.css("background-position", (columnOffset * -128) + "px " + (rowOffset * -192) + "px");	
		$("#card_field").append($('<div class="col-3"></div>').append(card));//put button
	});
	
	sound.play(answerWord);
	gameActive = true;

	return answerWord;
}

var setUpVictory = function() {
	$("#victory_showcase").empty();
	for(var x = 1; x < (9 + 1); x++) {
		var card = new levelCard(x);
		card.addToVictory();
		levels.push(card);
	}
}

var cycleVictory = function()
	{
		var vBoxes = $(".victory_box");
		vBoxes
			.delay(500)
			.fadeOut(200, function(){
				vBoxes.addClass("opened")
			})
			.fadeIn(200)
			.delay(500)
			.fadeOut(200, function(){
				vBoxes.removeClass("opened")
				cycleVictory();
			})
			.fadeIn(200);
	}