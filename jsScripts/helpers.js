// Class that holds the users settings

function UserSettings() {
  // initialize all properties with defaults
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

UserSettings.prototype.getRpcURL = function()
{
	var rpcUrl = "http://" + this.ip + ":" + this.port + "/transmission/rpc";
	return rpcUrl;
};

var notifID = 1;

function showNotif(title, message, icon){

	var options = {
		type : "basic",
		title: title,
		message: message,
		expandedMessage: message,
		iconUrl: icon,
		priority: 2,
		isClickable: false,
	}

	chrome.notifications.create("id" + notifID++, options, function creationCallback(notID) {
		//console.log("Succesfully created " + notID + " notification");
	});
}