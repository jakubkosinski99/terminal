var su = function(){
  var login = currentString.slice(3, currentString.lenght);
  if(userExists(login)){
    if(login != currentUser.name){
      nextCommand = "suNext";
      nextCommandVar = login;
      psswdInput = true;
      newLine("Password: ", null, "black");
    }
  }else{
    newLine(currentUser.name + ": user doesn't exist");
    newLine();
  }
}

var suNext = function(login){
  var psswd = currentString,
      user = getUserByName(login);
  if(user.password == psswd){
    currentUser = user;
    newLine();
    nextCommand = "";
    nextCommandVar = "";
    psswdInput = false;
  }else{
    newLine("Password: ", null, "black");
  }
}
