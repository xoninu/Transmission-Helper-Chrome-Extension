var userSettings = new UserSettings();

//Reload settings
chrome.storage.sync.get({
	"ip": userSettings.ip,
	"port": userSettings.port,
	"username": userSettings.username,
	"password": userSettings.password,
}, function(items) {

	userSettings.updateSettings(items);

	/*console.log(userSettings.ip);
	console.log(userSettings.port);
	console.log(userSettings.username);
	console.log(userSettings.password);*/

	console.log("Settings loaded from background script.");
});

// onClick callback function.
function handleLinkClick(info, tab) {
	console.log("info: " + JSON.stringify(info));
	
	console.log(userSettings);

	console.log(info.linkUrl);

	if (isValidTorrentURL(info.linkUrl) == true){
		showNotif("Transmission Client Helper", "Torrent file added!!!!", "icons/trans96.png");
		trAddTorrent(info.linkUrl);
		return;
	}

	showNotif("Transmission Client Helper", "Invalid Torrent File!!!!", "icons/trans96.png");
}

// Create item for context of type link.
chrome.contextMenus.create({
	"title": "Add to Transmission", 
	"contexts": ["link"],
	"onclick": handleLinkClick,
});