function levelCard(level) {
	var displayLevel = "LVL."+level;
	var treasureBoxSprite = "box" + level + ".png";
	var treasureBoxSpritePath = '/assets/images/treasurebox_sprites/'+ treasureBoxSprite;
	var playerScore = 0;
	var levelSprite;
	var loot = [];
	var cardContent = $();
	var objectsPerRow = 4;
	var gameDifficulty = 1; 

	this.addToScene = function() {
		this.cardContent = $('<a class="treasure_box xtreasure_box_card level_btn" value="'+level+'" href="#"></a> ');
		this.cardContent.css("background-image", 'url("' + treasureBoxSpritePath +'")');
		$("#area_level").append(this.cardContent);
	}

	this.calculateScore = function(numWrong) {
		if (numWrong == 0 || gameDifficulty == 1) {
			//on easy game mode, don't count wrong answers
			playerScore = 3;
			this.cardContent.addClass("opened");
		} else if (numWrong < 10) {
			playerScore = 2;
		} else {
			playerScore = 1;
		}
		//this.cardContent.html('<span class="lvl_score">' + display + '</span>');
		this.showLoot((playerScore/3));
	}

	this.assignLoot = function(newLoot) {
		this.loot = newLoot;
		this.treasureBoxHero = new treasureBoxHero(newLoot);
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
		var treasureBoxHero = $('<div class="treasure_box_hero_sprite"></div>');
		treasureBoxHero.css("background-image", 'url("' + treasureBoxSpritePath +'")');
		$("#area_loot_reveal").show();
		$("#area_treasure_box").css("height", Math.floor(Math.max(1,(rewardLoot.length / objectsPerRow)) * 140));
		$("#area_treasure_box").append(
			treasureBoxHero
				.delay(500)
				.fadeOut(500, function(){
					treasureBoxHero.addClass("opened")
				})
				.fadeIn(300, function(){
					//endLoot();
					fanfare.play();
					cycleRewards(rewardLoot);
				})
			); 
	}

	var cycleRewards = function(rewardLoot)
	{
		if(rewardLoot.length > 0) {
			var lootItem = rewardLoot.shift(); //slice(0,1);
			var reward = $('<div class="reward_loot_slot"></div>');
			reward.css("background-image", 'url("' + lootItem.getSprite() + '")');
			reward.css("opacity", 0);
			reward.css("top", (Math.floor(rewardLoot.length / objectsPerRow) * 130));
			var positionMuliplier = rewardLoot.length % objectsPerRow;
			$("#area_loot_reveal").append(reward);
			reward
				.animate({
				    opacity: 1,
				    left: ((positionMuliplier * 110 ) + 10),
				    //height: "toggle"
				  }, 300)
				.delay(500, function() {
					//if(rewardLoot.length > 0) {
						cycleRewards(rewardLoot);
					//}
				});
		} else {
			console.log("done with everything");
			$("#area_loot_reveal")
				.delay(500)
				.fadeOut(250, function() {
					endLoot();
				});
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