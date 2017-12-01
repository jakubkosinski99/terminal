function cd() {
	var cmd = currentString.slice(3, currentString.length);
	var x = 0;
	var folder = "";
	var folders = new Array();
	if(cmd != "" && cmd != " ") {
		if(cmd.length == 2 && cmd.charAt(0) + cmd.charAt(1) == "..") {
			if(currentDir.parent != undefined) {
				currentDir = currentDir.parent;
				newLine();
				
				return;
			}
			else {
				currentDir = currentDir;
				newLine();
				return;
			}
		}
		if(cmd.charAt(0) == "/") {
			if(getDirectoryFromPath(cmd) != false) {
				currentDir = getDirectoryFromPath(cmd);
				newLine();
				return;
			}
			newLine();
			return;
		}
		
		var Other = false;
		while(cmd.charAt(x) != "") {
			if(cmd.charAt(x) == " ") break;
			if(cmd.charAt(x) == "/") {
				Other = true; 
				break;
			}
			folder += cmd.charAt(x);
			x++;
		}
		if(Other) {
			x = 0;
			var folders = [];
			var str = "";
			while(cmd.charAt(x) != "") {
				if(cmd.charAt(x) == " ") {
					folders.push(str); x += 1; str = "";
					break;
				}
				if(cmd.charAt(x) == "/") {
					folders.push(str); x += 1; str = "";
					if(cmd.charAt(x) == "" || cmd.charAt(x) == " ") {break;}
				}
				str += cmd.charAt(x);
				x++;
			}
			if(str != "") {
				folders.push(str);
			}
			
			var folder = currentDir;
			var b = 0;
			while(b < folders.length) {
				if(folders[b] == "..") {
					if(folder.parent == undefined) {
						folder = discDir;
					}
					else {
						folder = folder.parent;
					}
					b++;
				}
				else {
					if(getDirectoryFromDirectoryByName(folder, folders[b]) != false) {
						folder = getDirectoryFromDirectoryByName(folder, folders[b]);
					}
					else {
						newLine("cd: '" + folders[folders.length-1] + "': No such file or directory");
						newLine();		
						return;
					}
					b++
				}
			}
			currentDir = folder;
			newLine();
			
		}
		else {
		
			if(!getDirectoryFromName(folder) == false) {
				currentDir = getDirectoryFromName(folder);
				newLine();
			}
			else {
				newLine("cd: '" + folder + "': No such file or directory");
				newLine();
			}
		}
	}
	else {
		newLine();
	}
	

}

