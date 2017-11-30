var groups = new Array();

function Group(Name) {
	this.name = Name;
	this.users = new Array();
}


Group.prototype.addUser(User) {
	
}





function groupExists(Name) {
	var exists = false;
	for(var x = 0; x < groups.length; x++) {
		if(groups[x].name == Name) {
			exists = true;
		}
	}
	if(exists) return true;
	if(!exists) return false;
}

function getGroupByName(Name) {
	var group = false;
	for(var x = 0; x < groups.length; x++) {
		if(groups[x].name == Name) {
			group = groups[x];
		}
	}
	if(group != false) return group;
	if(!group) return false;	
}