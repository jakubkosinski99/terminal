var groups = new Array();

function Group(Name) {
	if(!groupExists(Name)) {
		this.name = Name;
		this.users = new Array();
		this.bypass = false;
		this.default = false;
		if(this.name == "Users") {
			this.default = true;
		}
		else if(this.name == "root") {
			this.bypass = true;
		}
		groups.push(this);
	}
}




function deleteGroup(Name) {
	if(groupExists(Name)) {
		var groupToDelete = getGroupByName(Name);
		if(groupToDelete.bypass != true && groupToDelete.default != true) {
			for(var x = 0; x < groups.length; x++) {
				if(groups[x] == groupToDelete) {
					groups = groups.splice(x, 1);	
				}	
			}
			
			for(var x = 0; x < users.length; x++) {
				for(var y = 0; y < users[x].groups.length; y++) {
					if(getGroupByName(users[x].groups[y].name) == false) {
						users[x].groups = users[x].groups.splice(y, 1);
					}
				}
			}
		}
	}
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