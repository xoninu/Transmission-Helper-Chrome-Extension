var refUserSettings = chrome.extension.getBackgroundPage().userSettings;

console.log("Begin");
//console.log(refUserSettings.ip);
//console.log(refUserSettings.port);
//console.log(refUserSettings.username);
//console.log(refUserSettings.password);

// Saves options to chrome.storage
function save_options() {
	
	refUserSettings.ip = document.getElementById('ip').value; 
	refUserSettings.port = document.getElementById('port').value; 
	refUserSettings.username = document.getElementById('username').value; 
	refUserSettings.password = document.getElementById('password').value; 

	console.log("save_options");
	//console.log(refUserSettings.ip);
	//console.log(refUserSettings.port);
	//console.log(refUserSettings.username);
	//console.log(refUserSettings.password);

	chrome.storage.sync.set({
		ip: refUserSettings.ip,
		port: refUserSettings.port,
		username: refUserSettings.username,
		password: refUserSettings.password || "",
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
		
		refUserSettings.updateSettings(items);

	/*console.log(refUserSettings.ip);
	console.log(refUserSettings.port);
	console.log(refUserSettings.username);
	console.log(refUserSettings.password);*/

	document.getElementById('ip').value = refUserSettings.ip; 
	document.getElementById('port').value = refUserSettings.port; 
	document.getElementById('username').value = refUserSettings.username; 
	document.getElementById('password').value = refUserSettings.password; 

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
