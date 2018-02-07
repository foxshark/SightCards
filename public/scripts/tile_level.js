function levelCard(level) {
	var displayLevel = "LVL."+level;
	var playerScore = 0;
	var levelSprite;
	var loot = [];

	this.addToScene = function() {
		var cardContent = $('<a class="btn btn-primary level_btn" value="'+level+'" href="#"><span class="lvl_score">'+displayLevel+'</span></a> ');
		$("#area_level").append(cardContent);
	}

	this.calculateScore = function(numWrong) {
		if (numWrong == 0) {
			playerScore = 3;
		} else if (numWrong < 10) {
			playerScore = 2;
		} else {
			playerScore = 1;
		}
		this.showLoot((playerScore/3));
	}

	this.assignLoot = function(newLoot) {
		this.loot = newLoot;
	}

	this.showLoot = function(pct) {
		var totalLoot = this.loot.length;
		var numWon = Math.floor(totalLoot * pct);
		var lootWon = this.loot.slice(0, numWon);
		console.log("player won " + numWon + " out of " + totalLoot + " available items");
		$.each(lootWon, function(i, lootItems){
			lootItems.revealItem();
		});
	}
}