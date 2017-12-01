var keys = [];

	/*Cursor move*/

setInterval(function() {
	if(inNano == false && psswdInput == false) {
		$(".current").css("left", $("#prefix-" + currentLine).width() + currentChar*8);
	}
}, 1000/120)

	/*Keys events*/

$(window).bind("keypress", function(e) {
	if(inNano == false && inLoginPassword == false) {
		if(e.keyCode == 8) {
			e.preventDefault();
			var s = consoleCode.innerHTML;
			removeFromCurrentPos(s);
		}
		if(e.keyCode == 13) {
			if(nextCommand == ""){
				sendCommand();
				terminalInside.scrollTop = terminalInside.scrollHeight;
				return false;
			}else{
				window[nextCommand](nextCommandVar);
				terminalInside.scrollTop = terminalInside.scrollHeight;
				return false;
			}
		}
		insertIntoCurrentPos(consoleCode.innerHTML, String.fromCharCode(e.charCode));
		currentString = consoleCode.innerHTML;
		currentChar += 1;
	}
})


$(window).bind("keydown", function(e) {
	if(inNano == false && inLoginPassword == false) {
		if (e.keyCode == 8) {
			e.preventDefault();
			keys[8] = true;
		}
		if (e.keyCode == 37) {
			keys[37] = true;
		}
		if (e.keyCode == 39) {
			keys[39] = true;
		}
	}
});

$(window).bind("keyup", function(e) {
	if(inNano == false && inLoginPassword == false ) {
		if (e.keyCode == 8) {
			e.preventDefault();
			keys[8] = false;
		}
		if (e.keyCode == 37) {
			keys[37] = false;
		}
		if (e.keyCode == 39) {
			keys[39] = false;
		}
	}
});

setInterval(function() {
	if(inNano == false && inLoginPassword == false) {
		if(keys[8] == true) {
			if(currentChar > 0) {
				var s = consoleCode.innerHTML;
				removeFromCurrentPos(s);
			}
		}
		if(keys[37] == true) {
			if(currentChar >= 1) {
				currentChar -= 1;
			}
		}
		if(keys[39] == true) {
			if(currentChar <= currentString.length - 1) {
				currentChar += 1;
			}
		}
	}
}, 1000/15);
