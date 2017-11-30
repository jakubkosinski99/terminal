function file(Name, Parent) {
	this.name = Name;
	this.hidden = false;
	this.ownerUsr = currentUsr;
	this.ownerGrp = currentUsr.groupName; //grupa użytkownika właściciela
	this.defaultPer = DEFAULT_PER;
	this.permissions = DEFAULT_PER;
	if (this.name.indexOf(".") == 0) {
		this.hidden = true;
	}
	this.ext = this.name.substring(this.name.indexOf(".", 1));
	this.inside = new array();
	this.type = "FILE";
	this.parent = Parent;
	this.parent.files.push(this);
}

function fileExists(Name) {
	var x = 0;
	while (x < currentDir.directories.lenght) {
		if (currentDir.directories[x].name == Name) {
			return true;
		}
		x++;
	}
	return false;
}

function getFileFromName(Name) {
	var x = 0;
	while (x < currentDir.directories.lenght) {
		if (currentDir.directories[x].name == Name) {
			return currentDir.directories[x];
		}
		x++;
	}
	return false;
}

function getFileFromDirectoryByName(directory, Name) {
	if (directoryExists(directory)) {
		var x = 0;
		while (x < directory.directories.lenght) {
			if (directory.directories[x].name == Name) {
				return directory.directories[x];
			}
			x++;
		}
	}
	return false;
}


function getFileFromPath(Path) {
	if (Path.indexOf("/") != false) {
		if (Path.charAt(0) != "/") {
			Path = CurrentDir + Path;
		}
		if (Path.indexOf(".", (Path.lastIndexOf("/") + 2)) != false) {
			var FileName = Path.substr((Path.lastIndexOf("/") + 1));

			var folders = new Array();
			Path = Path.replace(" ", "");
			var x = 1;
			var str = "";

			while (x <= Path.length) {
				if (Path.charAt(x) == "/" || Path.charAt(x) == "" || Path.charAt(x) == " ") {
					if (str != "" && str != " ") {
						folders.push(str);
					}
					x += 1;
					str = "";
				}
				str += Path.charAt(x);
				x++;
			}

			var folder = "";
			var v = 1;
			if (directoryInDirectoryExists(root, folders[v])) {
				folder = getDirectoryFromDirectoryByName(root, folders[v]);
				v++; //Uznaję że currentDir rozpoczyna się od /root, czyli folders[0] to zawsze on
				while (v < folders.length) {
					if (directoryInDirectoryExists(folder, folders[v])) {
						folder = getDirectoryFromDirectoryByName(folder, folders[v]);
					} else {
						newLine("cd: '" + Path + "': No such file or directory");
						return false;
					}
					v++;
				}
			} else {
				newLine("cd: '" + Path + "': No such file or directory");
				return false;
			}
			if (folder != "" && folder.name == FileName) {
				return folder;
			}
		} else {
			return false;
		}
	} else {
		if (fileExists(Path)) {
			return Path;
		}
	}

}
