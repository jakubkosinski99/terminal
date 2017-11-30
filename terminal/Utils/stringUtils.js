/*String.prototype.splice = function(idx, rem, str) {
   console.log(this.slice(0, idx) + str + this.slice(idx + Math.abs(rem)))
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
	
};*/

function insertIntoCurrentPos(str, char) {
	/*consoleCode.innerHTML = str.splice(currentChar, 0, char);*/
	consoleCode.innerHTML = [str.slice(0, currentChar), char, str.slice(currentChar)].join('');
	currentString = consoleCode.innerHTML;
}

function removeFromCurrentPos(str) {
	consoleCode.innerHTML = str.slice(0, currentChar-1) + str.slice(currentChar);
	currentString = consoleCode.innerHTML;
	if(currentChar >= 1) {
		currentChar -= 1;
	}
}

function insertIntoCurrentNanoPos(str, char) {
	consoleCode.innerHTML = [str.slice(0, currentNanoChar), char, str.slice(currentNanoChar)].join('');
	currentString = consoleCode.innerHTML;
}

function removeFromCurrentNanoPos(str) {
	consoleCode.innerHTML = str.slice(0, currentNanoChar-1) + str.slice(currentNanoChar);
	currentString = consoleCode.innerHTML;
	if(currentNanoChar >= 1) {
		currentNanoChar -= 1;
	}
}