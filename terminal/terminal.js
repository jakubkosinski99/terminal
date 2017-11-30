var currentChar = 0,
	terminalInside = document.getElementById("inside"),
	consoleCode,
	currentString,
	prefix,
	currentUser,
	inNano = false,
	inLoginPassword = false,
	currentNanoLine,
	currentNanoChar,
	currentNanoLines,
	currentNanoFile,
	complete = false;


var terminalStart = function() {
	newLine();
}


function newLine(pr, color) {
	currentLine++;
	var line = document.createElement("div");
	line.setAttribute("id", "line-" + currentLine);
	line.setAttribute("class", "line");
	var pref = document.createElement("span");
	pref.setAttribute("class", "prefix");
	pref.setAttribute("id", "prefix-" + currentLine);
	pref.innerHTML = prefix;
	if(pr != null) {
		pref.innerHTML = pr;
	}
	if(color != null) {
		pref.style.color = color;
	}
	var code = document.createElement("span");
	code.setAttribute("id", "code-" + currentLine);
	line.appendChild(pref);
	line.appendChild(code);
	
	$(".current").remove();
	
	var cursor = document.createElement("div");
	cursor.setAttribute("class", "current");
	line.appendChild(cursor);
	terminalInside.appendChild(line);
	consoleCode = document.getElementById("code-" + currentLine);
	currentString = consoleCode.innerHTML;
	currentChar = 0,
	currentNanoFile;
}