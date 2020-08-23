var NARDOVE = NARDOVE || {};

NARDOVE.Main = (function() {

	paper.install(window);
	paper.setup('canvas');

	var timer = new Date();
	var addJellyTimer = 0;
	var jellyCounter = 0;
	var numJellies = 7;
	var jellies = [numJellies];
	var jellyResolution = 14;

    var body = document.body;
    var html = document.documentElement;
    
    function resize() {
        console.log("resize");
        $("#canvas").height($(".wrap").height());
        $("#canvas").width($(".wrap").width());
        paper.view.viewSize.width = $(".wrap").width();
        paper.view.viewSize.height = $(".wrap").height();
    }

	window.onload = function() {
        console.log("onload");
		view.onFrame = draw;
        resize();
	};

    window.onresize = resize;

	this.draw = function(event) {
		if (event.time > addJellyTimer + 6 && jellyCounter < numJellies) {
			jellySize = Math.random() * 10 + 40;
			jellies[jellyCounter] = new NARDOVE.Jelly(jellyCounter, jellySize, jellyResolution);
			jellies[jellyCounter].init();

			jellyCounter++;
			addJellyTimer = event.time;
		}

		if (jellyCounter > 0) {
			for (var j = 0; j < jellyCounter; j++) {
				jellies[j].update(event);
			}
		}
	};

})();
