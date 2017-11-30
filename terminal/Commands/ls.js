var ls = function() {
	var directories = "";
	var cmd = currentString;
	var files = "";
	for (var x = 0; x < currentDir.directories.length; x++) {
		directories += currentDir.directories[x].name + " ";
	}
	for (var x = 0; x < currentDir.files.length; x++) {
		if(currentDir.files[x].visibility == true) {
			files += currentDir.files[x].name + currentDir.files[x].extension + " ";
		}
	}	
	if (directories != "") {
		newLine(directories, "#4444ff");
	}
	if (files != "") {
		newLine(files, "#c1c1c1");
	}
	files = "";
	if(cmd.indexOf(" -a") >= 0) {
		for (var x = 0; x < currentDir.files.length; x++) {
			if(currentDir.files[x].visibility == false) {
				files += currentDir.files[x].name + currentDir.files[x].extension + " ";
			}
		}			
	}
	
	if (files != "") {
		newLine(files, "#656565");
	}
	newLine();
}