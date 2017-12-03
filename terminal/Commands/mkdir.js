var mkdir = function() {
	var cmd = currentString.slice(6, currentString.length);
	var folderName = "";
	var x = 0;
	while(cmd.charAt(x) != "") {
		if(cmd.charAt(x) == "") {break;}
		folderName += cmd.charAt(x);
		x++;
		
	}
	if(checkPermission(currentUser, "w", currentDir)) {
		if(!directoryInDirectoryExists(currentDir, folderName)) {
			new Directory(folderName, currentDir);
		}
		else {
			newLine("mkdir: '" + folderName + "': Folder already exists");
		}
	}
	else {
		newLine("mkdir: No permissions to do this action");
	}
	newLine();
}
