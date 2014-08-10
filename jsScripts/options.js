console.log("Begin");
//console.log(chrome.extension.getBackgroundPage().userSettings.ip);
//console.log(chrome.extension.getBackgroundPage().userSettings.port);
//console.log(chrome.extension.getBackgroundPage().userSettings.username);
//console.log(chrome.extension.getBackgroundPage().userSettings.password);

// Saves options to chrome.storage
function save_options() {
	
	chrome.extension.getBackgroundPage().userSettings.ip = document.getElementById('ip').value; 
	chrome.extension.getBackgroundPage().userSettings.port = document.getElementById('port').value; 
	chrome.extension.getBackgroundPage().userSettings.username = document.getElementById('username').value; 
	chrome.extension.getBackgroundPage().userSettings.password = document.getElementById('password').value; 

	console.log("save_options");
	//console.log(chrome.extension.getBackgroundPage().userSettings.ip);
	//console.log(chrome.extension.getBackgroundPage().userSettings.port);
	//console.log(chrome.extension.getBackgroundPage().userSettings.username);
	//console.log(chrome.extension.getBackgroundPage().userSettings.password);

	chrome.storage.sync.set({
		ip: chrome.extension.getBackgroundPage().userSettings.ip,
		port: chrome.extension.getBackgroundPage().userSettings.port,
		username: chrome.extension.getBackgroundPage().userSettings.username,
		password: chrome.extension.getBackgroundPage().userSettings.password || "",
	}, function() {
		
		if (chrome.runtime.lastError)
		{
			console.log(chrome.runtime.lastError);
		}
		else
		{
		// Notify that we saved.
		console.log('Settings saved!!!');
	}
});
}

// Restores saved data using the preferences
// stored in chrome.storage.
function restore_options() {

	var defaultUserSettings = new UserSettings();
	
	console.log("restore_options");
	//console.log(defaultUserSettings.ip);
	//console.log(defaultUserSettings.port);
	//console.log(defaultUserSettings.username);
	//console.log(defaultUserSettings.password);

	chrome.storage.sync.get({
		"ip": defaultUserSettings.ip,
		"port": defaultUserSettings.port,
		"username": defaultUserSettings.username,
		"password": defaultUserSettings.password,
	}, function(items) {
		
	chrome.extension.getBackgroundPage().userSettings.updateSettings(items);

	console.log(chrome.extension.getBackgroundPage().userSettings.ip);
	console.log(chrome.extension.getBackgroundPage().userSettings.port);
	console.log(chrome.extension.getBackgroundPage().userSettings.username);
	console.log(chrome.extension.getBackgroundPage().userSettings.password);

	document.getElementById('ip').value = chrome.extension.getBackgroundPage().userSettings.ip; 
	document.getElementById('port').value = chrome.extension.getBackgroundPage().userSettings.port; 
	document.getElementById('username').value = chrome.extension.getBackgroundPage().userSettings.username; 
	document.getElementById('password').value = chrome.extension.getBackgroundPage().userSettings.password; 

	console.log("restore_options:finished");
	
});
}

//test connection with current settings before being saved
function test_connection() {
	console.log("test connection");
	
	var ip;
	var port;
	var username;
	var password;
	
	ip = document.getElementById('ip').value; 
	port = document.getElementById('port').value; 
	username = document.getElementById('username').value; 
	password = document.getElementById('password').value; 

	console.log("test connection");
	
	chrome.extension.getBackgroundPage().testRPCConfig(ip, port, password, username, function(result) {
		
		console.log("Ret: " + result);
		
		if (document.getElementById('result')){
			password = document.getElementById('result').textContent = result; 
		}
		else {
			
			var newDiv = document.createElement("div"); 
			newDiv.id = "result";
			newDiv.textContent = result;
			document.body.appendChild(newDiv);
		}
		
	});
	
}

//Add Handlers to restore/load settings
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('testconn').addEventListener('click', test_connection);
