var userSettings = new UserSettings();

// onClick callback function.
function handleLinkClick(info, tab) {
	console.log("info: " + JSON.stringify(info));
	
	console.log(userSettings);

	console.log(info.linkUrl);
}

// Create item for context of type link.
var id = chrome.contextMenus.create({
	"title": "Add to Transmission", 
	"contexts": ["link"],
	"onclick": handleLinkClick,
});

console.log(id);