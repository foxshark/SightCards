function inventoryItem(spriteData) {
	var spriteDirectory = "/assets/images/sprites/";
	var fileName = spriteDirectory + spriteData.file_name;
	var $inventorySlot = $('<div class="loot_sprite"></div>');

	//$("#area_inventory").append('<div class="loot_sprite" style="background-image: url(\'/assets/images/sprites/' + spriteData.file_name + '\');"></div>');//put button
	this.addBlankSpot = function () {
		$("#area_inventory").append($inventorySlot);//put button
	}

	this.revealItem = function () {
		$inventorySlot.css("background-image", 'url("' + fileName + '")');
	}
/*
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
	}*/
}