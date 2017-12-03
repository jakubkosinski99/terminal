var users = new Array();

function User(Name, Password, Group) {
	if(!userExists(Name)) {
		this.name = Name;
		this.password = Password;
		this.bypass = false;
		this.groups = new Array();
		this.groups.push(getGroupByName("Users"));
		if(Group != undefined) {
			if(groupExists(Group)) {
				this.groups.push(getGroupByName(Group));
			}
		}
		if(this.name == "root") {
			this.bypass = true;
			this.groups = new Array();
			this.groups.push(getGroupByName("root"));
			this.homeDir = discDir;
		}
		else {
			this.homeDir = new Directory(Name, homeDir);
			this.homeDir.ownerUsr = this;
			this.homeDir.ownerGrp = rootGroup;
		}
		users.push(this);
	}
}

function deleteUser(Name) {
	if(userExists(Name)) {
		var userToDelete = getUserByName(Name);
		if(userToDelete != currentUser && userToDelete != getUserByName("root")) {
			for(var x = 0; x < users.length; x++) {
				if(users[x] == userToDelete) {
					users = users.splice(x,1);
				}
			}
		}
	}
}

function userExists(Name) {
	var exists = false;
	for (var x = 0; x < users.length; x++) {
		if(users[x].name == Name) {
			exists = true;
		}
	}
	if(exists) return true;
	if(!exists) return false;
}

function getUserByName(Name) {
	var user = false;
	for (var x = 0; x < users.length; x++) {
		if(users[x].name == Name) {
			user = users[x];
		}
	}

	if(user != false) return user;
	if(!user) return false;
}




function checkPermission(Us, What, FF) {
	if(userExists(Us.name)) {
		if(FF.type == "DIRECTORY") {
			var chain = FF.permissions;
			console.log(chain);
			switch(What) {
				case "r":
					if(FF.ownerUsr == Us) {
						if(chain.charAt(0) == 4 || chain.charAt(0) == 6 || chain.charAt(0) == 7 || chain.charAt(0) == 5) return true;
					}
					for(var x = 0; x < Us.groups.length; x++) {
						if(Us.groups[x] == FF.ownerGrp) {
							if(chain.charAt(1) == 4 || chain.charAt(1) == 6 || chain.charAt(1) == 7 || chain.charAt(0) == 5) return true;
						}
					}
					if(chain.charAt(2) == 4 || chain.charAt(2) == 6 || chain.charAt(2) == 7 || chain.charAt(0) == 5) return true;
					return false;

				case "w":
					if(FF.ownerUsr == Us) {
						if(chain.charAt(0) == 2 || chain.charAt(0) == 3 || chain.charAt(0) == 6 || chain.charAt(0) == 7) return true;
					}
					for(var x = 0; x < Us.groups.length; x++) {
						if(Us.groups[x] == FF.ownerGrp) {
							if(chain.charAt(1) == 2 || chain.charAt(1) == 3 || chain.charAt(1) == 6 || chain.charAt(1) == 7) return true;
						}
					}
					if(chain.charAt(2) == 2 || chain.charAt(2) == 3 || chain.charAt(2) == 6 || chain.charAt(2) == 7) return true;
					return false;
				case "x":
					if(FF.ownerUsr == Us) {
						if(chain.charAt(0) == 1 || chain.charAt(0) == 3 || chain.charAt(0) == 5 || chain.charAt(0) == 7) return true;
					}
					for(var x = 0; x < Us.groups.length; x++) {
						if(Us.groups[x] == FF.ownerGrp) {
							if(chain.charAt(1) == 1 || chain.charAt(1) == 3 || chain.charAt(1) == 5 || chain.charAt(1) == 7) return true;
						}
					}
					if(chain.charAt(2) == 1 || chain.charAt(2) == 3 || chain.charAt(2) == 5 || chain.charAt(2) == 7) return true;
					return false;
			}
		}
		else if(FF.type == "FILE") {
			var chain = FF.permissions;
			switch(What) {
				case "r":
					if(FF.ownerUsr == Us) {
						if(chain.charAt(0) == 4 || chain.charAt(0) == 6 || chain.charAt(0) == 7 || chain.charAt(0) == 5) return true;
					}
					for(var x = 0; x < Us.groups.length; x++) {
						if(Us.groups[x] == FF.ownerGrp) {
							if(chain.charAt(1) == 4 || chain.charAt(1) == 6 || chain.charAt(1) == 7 || chain.charAt(0) == 5) return true;
						}
					}
					if(chain.charAt(2) == 4 || chain.charAt(2) == 6 || chain.charAt(2) == 7 || chain.charAt(0) == 5) return true;
					return false;

				case "w":
					if(FF.ownerUsr == Us) {
						if(chain.charAt(0) == 2 || chain.charAt(0) == 3 || chain.charAt(0) == 6 || chain.charAt(0) == 7) return true;
					}
					for(var x = 0; x < Us.groups.length; x++) {
						if(Us.groups[x] == FF.ownerGrp) {
							if(chain.charAt(1) == 2 || chain.charAt(1) == 3 || chain.charAt(1) == 6 || chain.charAt(1) == 7) return true;
						}
					}
					if(chain.charAt(2) == 2 || chain.charAt(2) == 3 || chain.charAt(2) == 6 || chain.charAt(2) == 7) return true;
					return false;
				case "x":
					if(FF.ownerUsr == Us) {
						if(chain.charAt(0) == 1 || chain.charAt(0) == 3 || chain.charAt(0) == 5 || chain.charAt(0) == 7) return true;
					}
					for(var x = 0; x < Us.groups.length; x++) {
						if(Us.groups[x] == FF.ownerGrp) {
							if(chain.charAt(1) == 1 || chain.charAt(1) == 3 || chain.charAt(1) == 5 || chain.charAt(1) == 7) return true;
						}
					}
					if(chain.charAt(2) == 1 || chain.charAt(2) == 3 || chain.charAt(2) == 5 || chain.charAt(2) == 7) return true;
					return false;
			}
		}
	}
	return false;
}
