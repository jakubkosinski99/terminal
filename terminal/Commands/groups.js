function groups() {
	var str = "";
	var lines = new Array();
	for(var x = 0; x < currentUser.groups.length; x++) {
		if(x > 0 && x % 4 == 0) {
			lines.push(str);
			str = "";
		}
		str += currentUser.groups[x].name + " "
	}
	if(str != "") {
		lines.push(str);
	}
	for(var x = 0; x < lines.length; x++) {
		console.log(lines[x]);
		newLine(lines[x]);
	}
	
	newLine();
	
	
}