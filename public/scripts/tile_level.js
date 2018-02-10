function levelCard(level) {
	var displayLevel = "LVL."+level;
	var treasureBoxSprite = "treasure_box_1";
	var playerScore = 0;
	var levelSprite;
	var loot = [];
	var cardContent = $();

	this.addToScene = function() {
		//this.cardContent = $('<a class="btn btn-primary level_btn" value="'+level+'" href="#"><span class="lvl_score">- - -</span></a> ');
		this.cardContent = $('<a class="treasure_box ' + treasureBoxSprite + ' level_btn" value="'+level+'" href="#"></a> ');
		$("#area_level").append(this.cardContent);
	}

	this.calculateScore = function(numWrong) {
		var display = "- - -";
		if (numWrong == 0) {
			playerScore = 3;
			display = "* * *";
			this.cardContent.addClass("opened");
		} else if (numWrong < 10) {
			playerScore = 2;
			display = "* - *";
		} else {
			playerScore = 1;
			display = "- * -";
		}
		this.cardContent.html('<span class="lvl_score">' + display + '</span>');
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
		$.each(lootWon, function(i, lootItem){
			lootItem.revealItem();
		});
		this.populateLootReveal(totalLoot, lootWon);
	}

	this.populateLootReveal = async function(totalLoot, rewardLoot) {
		var treasureBoxHero = $('<div class="treasure_box_hero_sprite ' + treasureBoxSprite + '"></div>');
		$("#area_treasure_box").append(treasureBoxHero.delay(500).fadeOut(500, function(){treasureBoxHero.addClass("opened")}).fadeIn(300, function(){endLoot()})); /*To(0, 100, function() {
						treasureBoxHero.addClass("opened")
					})
				  .delay(30)
				  .fadeTo(1, 100, function(){
				  	//something
				  })); */
				  /*
		$.each(rewardLoot, function(i, lootItem) {
			var reward = $('<div class="col reward_loot_slot"></div>');
			reward.css("background-image", 'url("' + lootItem.getSprite() + '")');
			$("#area_loot_reveal").append(reward);
		}); 
		*/
		while(rewardLoot.length > 0) {
			this.getNextReward(rewardLoot);
		}
	}

	this.getNextReward = function(rewardLoot) {
		if(rewardLoot.length > 0) {
			var lootItem = rewardLoot.shift(); //slice(0,1);
			//rewardLoot = rewardLoot.slice(1);
			var reward = $('<div class="col-2 reward_loot_slot"></div>');
			$("#area_loot_reveal").append(reward);
			reward.delay(200)
				.fadeOut(300, function() {
					reward.css("background-image", 'url("' + lootItem.getSprite() + '")');		
				})
				.fadeIn(500)
				.delay(500, function() {
					if(rewardLoot.length > 0) {
						return rewardLoot;
					}
				});
		}

	}
}