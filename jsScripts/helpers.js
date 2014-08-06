// Class that holds the users settings

function UserSettings() {
  // initialize all instance properties with defaults
  this.ip = "127.0.0.1";
  this.port = 9091; 
  this.username = "transmission";
  this.password= "";
}

// class methods
UserSettings.prototype.updateSettings = function(userSettings) {

  this.ip = userSettings.ip;
  this.port = userSettings.port; 
  this.username = userSettings.username;
  this.password= userSettings.password;
};