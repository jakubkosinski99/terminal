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
		if(this.name = "root") {
			this.bypass = true;
			this.groups = new Array();
			this.groups.push(getGroupByName("root"));
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
		if(users[x] == Name) {
			exists = true;
		}
	}
	if(exists) return true;
	if(!exists) return false;
}

function getUserByName(Name) {
	var user = false;
	for (var x = 0; x < users.length; x++) {
		if(users[x] == Name) {
			user = users[x];
		}
	}
	
	if(user != false) return user;
	if(!user) return false;
}

