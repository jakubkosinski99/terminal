function touch() {
	var cmd = currentString.slice(6, currentString.length);
	var name = "";
	var x = 0;
	if(cmd.charAt(0) != ".") {
		while(cmd.charAt(x) != " ") {
			if(cmd.charAt(x) == "") {break;}
			if(cmd.charAt(x) == ".") {break;}
			name += cmd.charAt(x);
			x++;	
		}
	}
	else {
		x = 0;
		name+= cmd.charAt(x);
		x++
		while(cmd.charAt(x) != " ") {
			if(cmd.charAt(x) == "") {break;}
			if(cmd.charAt(x) == ".") {break;}
			name += cmd.charAt(x);
			x++;	
		}		
	}
	var full = cmd.slice(name.length, cmd.length + 1);
	console.log(full);
	var extension = "";
	x = 0;
	while(full.charAt(x) != " ") {
		if(full.charAt(x) == "") {break;}
		extension += full.charAt(x);
		x++;	
	}
	
	if(extension != "" && extension != " ") {
		new File(name, currentDir, extension);
		newLine();
	} 
	else {
		new File(name, currentDir);
		newLine();
	}
}