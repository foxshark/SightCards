function levelCard(level) {
	var displayLevel = "LVL."+level;
	var playerScore = 0;
	var levelSprite;

	this.addToScene = function() {
		var cardContent = $('<a class="btn btn-primary level_btn" value="'+level+'" href="#"><span class="lvl_score">'+displayLevel+'</span></a> ');
		$("#area_level").append(cardContent);
	}

	this.calculateScore = function(numCorrect, numWrong) {
		if (numWrong == 0) {
			playerScore = 3;
		} else if (numCorrect < 10) {
			playerScore = 2;
		} else {
			playerScore = 1;
		}

		levelSprite.find(".lvl_score").html(displayLevel + " : " + playerScore);
	}
}