
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
		volume: 0.5,
		onend: function() {
			console.log('Finished!');
		},
		sprite: spriteSounds
	});
	
	answerWord = setUpBoard(words);
});

var setUpBoard = function(words){
	$(".button_test").empty();
	words.sort(function(a, b){return 0.5 - Math.random()});
	words = words.slice(0,4);
	var answerWord = words[Math.floor(Math.random()*4)].value;
	$(".button_test").append('<a class="btn btn-success btn-lg" value="'+answerWord+'" href="#">🔊</a> ');//put button
	$.each(words, function(i, word) {
		$(".button_test").append('<a class="btn btn-primary card_btn" value="'+word.value+'" href="#">'+word.value+'</a> ');//put button
	});
	
	sound.play(answerWord);

	return answerWord;
}


$(document).ready(function(){
	$('.btn-primary').click(function() {
            sound.play($(this).attr("value"));
            if( $(this).hasClass("card_btn")) {
            }
        });

	$('.button_test').on('click', '.card_btn', function() {
            sound.play($(this).attr("value"));
            if( $(this).attr("value") == answerWord) {
            	numCorrect++;
            	$(this).attr({'disabled': true});
            	$('#score')
				  .animate({color:'green'}, 400)
				  .delay(100)
				  .animate({color:'white'}, 400, function(){
					answerWord = setUpBoard(words);  	
				  });
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


	$('.button_test').on('click', '.btn-success', function() {
			// big green button
            sound.play($(this).attr("value"));
        });
});