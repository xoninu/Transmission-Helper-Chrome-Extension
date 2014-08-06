var refUserSettings = chrome.extension.getBackgroundPage().UserSettings;

// Saves options to chrome.storage
function save_options() {
  refUserSettings.ip = document.getElementById('ip').value;
  refUserSettings.port = document.getElementById('port').value;
  refUserSettings.username = document.getElementById('username').value;
  refUserSettings.password = document.getElementById('passwrd').value;

  chrome.storage.sync.set({
    ip: refUserSettings.ip,
    port: refUserSettings.port,
    username: refUserSettings.username,
    password: refUserSettings.password,
  }, function() {
   // Notify that we saved.
   alert('Settings saved!!!');
  });
}

// Restores saved data using the preferences
// stored in chrome.storage.
function restore_options() {

	var defaultUserSettings = new UserSettings();

	chrome.storage.sync.get({
    ip: defaultUserSettings.ip,
    port: defaultUserSettings.port,
    username: defaultUserSettings.username,
    password: defaultUserSettings.password,
  }, function(items) {
  
	refUserSettings.updateSettings(items);

    document.getElementById('ip').value = refUserSettings.ip;
	document.getElementById('port').value = refUserSettings.port;
	document.getElementById('username').value = refUserSettings.username;
	document.getElementById('passwrd').value = refUserSettings.password;
  });
}

//Add Handlers to restore/load settings
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);