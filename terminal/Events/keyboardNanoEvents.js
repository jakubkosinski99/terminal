var nanokeys = [];

	/*Cursor move*/

setInterval(function() {
	if(inNano == true && inLoginPassword == false) {
		$(".current").css("left", currentNanoChar*8);
	}
}, 1000/120)

	/*Keys events*/

$(window).bind("keypress", function(e) {
	if(inNano == true && complete && inLoginPassword == false) {
		if(e.keyCode == 13) {
			if(currentNanoChar == 0) {
				var cl = currentNanoLine;
				var lines = new Array();
				for(var x = cl; x <= currentNanoLines; x++) {
					var lineInside = document.getElementById("code-" + x).innerHTML;
					lines.push([x+1, lineInside]);
					$("#line-" + x).remove();
				}
				currentNanoLines++;
				var line = document.createElement("div");
				line.setAttribute("id", "line-" + cl);
				line.setAttribute("class", "line");
				var code = document.createElement("span");
				code.setAttribute("id", "code-" + cl);
				line.appendChild(code);
				terminalInside.appendChild(line);
				
				for(var x = 0; x < lines.length; x++) {
					var line = document.createElement("div");
					line.setAttribute("id", "line-" + lines[x][0]);
					line.setAttribute("class", "line");
					var code = document.createElement("span");
					code.setAttribute("id", "code-" + lines[x][0]);
					code.innerHTML = lines[x][1];
					line.appendChild(code);
					terminalInside.appendChild(line);
				}
				
				currentNanoLine++;
				repairCurrentNanoString();
				currentChar = 0;
				return;
			}
			else {
				newNanoLine();
				terminalInside.scrollTop = terminalInside.scrollHeight;
				return;
			}
			return false;
		}
		else {
			insertIntoCurrentNanoPos(consoleCode.innerHTML, String.fromCharCode(e.charCode));
			currentString = consoleCode.innerHTML;
			currentNanoChar += 1;
		}
	}
})


$(window).bind("keydown", function(e) {
	if(inNano == true && inLoginPassword == false) {
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
		if (e.keyCode == 38) {
			keys[38] = true;
		}
		if (e.keyCode == 40) {
			keys[40] = true;
		}
	}
});

$(window).bind("keyup", function(e) {
	if(inNano == true && inLoginPassword == false) {
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
		if (e.keyCode == 38) {
			keys[38] = false;
		}
		if (e.keyCode == 40) {
			keys[40] = false;
		}
	}
});

setInterval(function() {
	if(inNano == true && inLoginPassword == false) {
		if(keys[8] == true) {
			e.preventDefault();
			if(currentNanoChar > 0) {
				var s = consoleCode.innerHTML;
				removeFromCurrentNanoPos(s);
			}
	
			if(currentNanoChar == 0 && currentNanoLine != 1) {
				var cl = currentNanoLine + 1;
				var previous = currentNanoLine - 1;
				var lines = new Array();
				var s = document.getElementById("code-" + previous).innerHTML;
				var thisS = document.getElementById("code-" + currentNanoLine).innerHTML;
				document.getElementById("code-" + previous).innerHTML = s + thisS;
				$("#line-" + currentNanoLine).remove();
				currentNanoChar = document.getElementById("code-" + previous).innerHTML.length;
				for(var x = cl; x <= currentNanoLines; x++) {
					var lineInside = document.getElementById("code-" + x).innerHTML;
					lines.push([x-1, lineInside]);
					$("#line-" + x).remove();
				}				
				currentNanoLines--;
				currentNanoLine--;
				for(var x = 0; x < lines.length; x++) {
					var line = document.createElement("div");
					line.setAttribute("id", "line-" + lines[x][0]);
					line.setAttribute("class", "line");
					var code = document.createElement("span");
					code.setAttribute("id", "code-" + lines[x][0]);
					code.innerHTML = lines[x][1];
					line.appendChild(code);
					terminalInside.appendChild(line);
				}
				
				repairCurrentNanoString();
				
			}			
			
		}
		if(keys[37] == true) {
			if(currentNanoChar >= 1) {
				currentNanoChar -= 1;
			}
		}
		if(keys[39] == true) {
			if(currentNanoChar <= currentString.length - 1) {
				currentNanoChar += 1;
			}
		}
		if(keys[38] == true) {
			if(currentNanoLine - 1 >= 1) {
				currentNanoLine -= 1;
				currentNanoChar = 0;
				repairCurrentNanoString();
			}
		}
		if(keys[40] == true) {
			if(currentNanoLine + 1 <= currentNanoLines) {
				currentNanoLine += 1;
				currentNanoChar = 0;
				repairCurrentNanoString();
			}
		}
	}
}, 1000/12);




$(window).keydown(function(e) {
    if (e.keyCode == 79 && e.ctrlKey) {
		e.preventDefault();
		if(inNano && inLoginPassword == false) {
			if (e.ctrlKey && e.keyCode == 79) {
				for(var x = 1; x <= currentNanoLines; x++) {
					currentNanoFile.inside.push(document.getElementById("line-" + x));
				}
			}	
		}
    }
});

$(window).keydown(function(e) {
    if (e.keyCode == 88 && e.ctrlKey) {
		if(inNano && inLoginPassword == false) {
			e.preventDefault();
			if (e.ctrlKey && e.keyCode == 88) {
				currentNanoFile = "";
				terminalInside.innerHTML = currentInside;
				inNano = false;
				newLine();
			}	
		}
    }
});



