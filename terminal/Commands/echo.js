var echo = function() {
	var e = currentString.slice(5, currentString.length);
	console.log("To:" + currentString.slice(0, 4));
	newLine(e);
	newLine();
}