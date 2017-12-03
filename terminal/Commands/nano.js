function nano() {
	currentInside = terminalInside.innerHTML;
	if(inNano == false) {
		complete = false;
		var cmd = currentString.slice(5, currentString.length);
		var x = 1;
		var name = "";
		var extension = "";
		name += cmd.charAt(0);
		while(cmd.charAt(x) != ".") {
			if(cmd.charAt(x) == " " || cmd.charAt(x) == "") {
				break;
			}
			name += cmd.charAt(x);
			x++;
		}
		
		extension = cmd.slice(name.length, cmd.length);
		extension.replace(" ", "");
		if(getFile(name, extension, currentDir) != false) {
			if(checkPermission(currentUser, "w", getFile(name, extension, currentDir))) {
				var nanoFile = getFile(name, extension, currentDir);
				currentNanoFile = getFile(name, extension, currentDir);
				newLine();
				inNano = true;
				terminalInside.innerHTML = "";
				var nanoInside = "";
				currentNanoLines = 0;
				currentNanoChar = 0;
				currentNanoLine = 0;
				for(var x = 0; x < nanoFile.inside.length; x++) {
					terminalInside.appendChild(nanoFile.inside[x]);
					currentNanoLines++;
				}
				if(currentNanoLines == 0) {
					newNanoLine();
					setTimeout(function() {
						currentNanoLine = 1;
						currentNanoLines = 1;
						$("#line-2").remove();
						repairCurrentNanoString();
					}, 50)
				}
				else {
					currentNanoLine = 1;
					repairCurrentNanoString();
				}
				setTimeout(function() {
					complete = true;
				})
			}
			else {
				newLine("nano: No permissions to do this action");
				newLine();
			}
		}
		else {
			newLine("nano: '" + name + extension + "': No such file or directory");
			newLine();
		}
	} 
}


function newNanoLine() {
	currentNanoLine++;
	currentNanoLines++;
	var line = document.createElement("div");
	line.setAttribute("id", "line-" + currentNanoLine);
	line.setAttribute("class", "line");
	var code = document.createElement("span");
	code.setAttribute("id", "code-" + currentNanoLine);
	line.appendChild(code);
	
	$(".current").remove();
	var cursor = document.createElement("div");
	cursor.setAttribute("class", "current");
	line.appendChild(cursor);
	terminalInside.appendChild(line);
	consoleCode = document.getElementById("code-" + currentNanoLine);
	currentString = consoleCode.innerHTML;
	currentNanoChar = 0;
	
}



function repairCurrentNanoString() {
	consoleCode = document.getElementById("code-" + currentNanoLine);
	currentString = consoleCode.innerHTML;
	$(".current").remove();
	var cursor = document.createElement("div");
	cursor.setAttribute("class", "current");
	document.getElementById("line-" + currentNanoLine).appendChild(cursor);
}
