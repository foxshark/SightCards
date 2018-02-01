function levelCard(level) {
	var displayLevel = "LVL."+level;
	this.addToScene = function() {
		$("#area_level").append('<a class="btn btn-primary level_btn" value="'+level+'" href="#">'+displayLevel+'</a> ');
	}

}