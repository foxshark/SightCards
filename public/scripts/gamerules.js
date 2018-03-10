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
		$("#card_gui").empty();
		words.sort(function(a, b){return 0.5 - Math.random()});
		words = words.slice(0,4);
		var answerWord = words[Math.floor(Math.random()*4)].value;
		//$("#card_gui").append('<div class=""><a class="btn btn-success btn-lg" value="'+answerWord+'" href="#">🔊</a></div>');//put button
		$("#card_gui").append('<div class="npc_tile btn-success" value="'+answerWord+'"></div>');//put button
		$.each(words, function(i, word) {
			var card = $('<div class="gamecard"><a class="card_btn" value="'+word.value+'" href="#">'+word.value+'</a></div>');
			var columnOffset = Math.floor(Math.random() * Math.floor(8));
			var rowOffset = Math.floor(Math.random() * Math.floor(5));
			card.css("background-position", (columnOffset * -128) + "px " + (rowOffset * -192) + "px");	

			$("#card_field").append(card);//put button
		});
		
		sound.play(answerWord);
		gameActive = true;

		return answerWord;
	}