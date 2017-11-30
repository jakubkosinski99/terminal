function Directory(Name, Parent, Modify) {
	this.name = Name;
	this.hidden = false;
	this.modify = true;
	if(Modify != undefined) {
		this.modify = Modify;
	}
	
	this.ownerUsr = currentUser;
	this.type = "DIRECTORY";
	this.ownerGrp;
	this.defaultPer = DEFAULT_PER;
	if (this.name.indexOf(".") == 0) {
		this.hidden = true;
	}
	this.permissions = DEFAULT_PER;
	this.parent = Parent;
	this.directories = new Array();
	this.files = new Array();
	if (this.name == "" && this.parent == undefined) {
		startDir = this;
		this.modify = false;
	}
	if (this.parent != undefined) {
		this.parent.directories.push(this);
	}
	

}

function directoryExists(Name) {
	var exists = false;
	for (var x = 0; x < currentDir.directories.length; x++) {
		if (currentDir.directories[x].name == Name) {
			exists = true;
		}
	}

	if (exists) return true;
	if (!exists) return false;
}

function directoryInDirectoryExists(parent, directory) {
	var exists = false;
	if (parent.name != undefined) {
		for (var x = 0; x < parent.directories.length; x++) {
			if (parent.directories[x].name == directory) {
				exists = true;
			}
		}
	}
	if (exists) return true;
	if (!exists) return false;
}

function getDirectoryFromName(Name) {
	for (var x = 0; x < currentDir.directories.length; x++) {
		if (currentDir.directories[x].name == Name) {
			return currentDir.directories[x];
		}
	}
	return false;
}

function getDirectoryFromDirectoryByName(directory, directoryname) {
	if (directory.name != undefined) {
		for (var x = 0; x < directory.directories.length; x++) {
			if (directory.directories[x].name == directoryname) {
				return directory.directories[x];
			}
		}
		return false;
	}
	return false;
}

function getDirectoryFromPath(Path) {
	if (Path.charAt(0) != "/") {
		Path = CurrentDir + Path; //currentDir ma w sobie na początku /root/? Zakładam że tak
	}
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

	if (folders.length == 0) {
		return root;
	}
	var b = 0;
	var folder = "";
	if (directoryInDirectoryExists(root, folders[b])) {
		folder = getDirectoryFromDirectoryByName(root, folders[b]);
		b++;
		while (b < folders.length) {
			if (directoryInDirectoryExists(folder, folders[b])) {
				folder = getDirectoryFromDirectoryByName(folder, folders[b]);
			} else {
				newLine("cd: '" + Path + "': No such file or directory");
				return false;
			}
			b++;
		}
	} else {
		newLine("cd: '" + Path + "': No such file or directory");
		return false;
	}
	if (folder != "") {
		return folder;
	}
}

function getDirPath(Dir) {
	if(Dir.type == "DIRECTORY") {
		var pr = "";
		folders = new Array();
		var cD = Dir;
		var r = Dir.name;
		if(cD == discDir) {
			pr = discDir.name + "/";
			return pr;
		}
		while(r != discDir.name) {
			folders.push(r);
			cD = cD.parent;
			if (cD.name == discDir.name) {
				folders.push(discDir.name);
				r = discDir.name;
			}
			else {
				r = cD.name;	
			}
		}
		var pr = "";
		for(x = folders.length-1; x >= 0; x--) {
			pr += folders[x] + "/";
		}
		return pr;	
	}
}
