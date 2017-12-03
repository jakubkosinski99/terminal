var defaultExtension = ".txt";

function File(Name, Parent, Extension) {
	var y = defaultExtension;
	if(Extension != undefined) {
		y = Extension;
	}
	if(!fileExists(Name, y, Parent)) {
		this.name = Name;
		this.hidden = false;
		this.ownerUsr = currentUser;
		this.ownerGrp;
		this.defaultPer = DEFAULT_PER;
		this.permissions = DEFAULT_PER;
		if (Extension != undefined) {
			this.extension = Extension;
		} else {
			this.extension = defaultExtension;
		}
		this.visibility = true;
		if (this.name.charAt(0) == ".") {
			this.visibility = false;
		}
		this.inside = new Array();
		this.type = "FILE";
		this.parent = Parent;
		this.parent.files.push(this);
	}
	else {
		newLine("touch: cannot create file '" + Name + "': File exists");
	}
}

function fileExists(Name, Extension, Parent) {
	var x = 0;
	
	if(Parent.type == "DIRECTORY") {
		while (x < Parent.files.length) {
			console.log(Parent.files[x])
			if (Parent.files[x].name == Name && Parent.files[x].extension == Extension) {
				return true;
			}
			x++;
		}
	}
	else {
		console.log("XD");
		return false;
	}
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

function getFile(Name, Extension, Parent) {
	if(Parent.type == "DIRECTORY") {
		for(var x = 0; x < Parent.files.length; x++) {
			if(Parent.files[x].name == Name && Parent.files[x].extension == Extension) {
				return Parent.files[x];
			}
		}
	}
	return false;
}


