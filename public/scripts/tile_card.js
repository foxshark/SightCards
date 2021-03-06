
var words = [];
var sound = null;
var answerWord = null;
var numCorrect = 0;
var numWrong = 0;

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
		//autoplay: true,
		loop: false,
		volume: 1,
		onend: function() {
			console.log('Finished!');
		},
		sprite: spriteSounds
	});
	
	answerWord = setUpBoard(words);
});