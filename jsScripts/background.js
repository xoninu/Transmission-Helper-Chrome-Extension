var userSettings = new UserSettings();

// onClick callback function.
function onClick(info, tab) {
  console.log("info: " + JSON.stringify(info));
  
  console.log(userSettings);

 //alert(info.linkUrl);

    //reader.readAsText('http://piratebaytorrents.info/9306604/Linkin_Park_-_Rolling_In_The_Deep_(Adele_Cover_-_Live)_HDTV_1080.9306604.TPB.torrent');
}

// Create item for context of type link.
var id = chrome.contextMenus.create({
	"title": "Add to Transmission", 
	"contexts": ["link"],
	"onclick": onClick,
});

console.log(id);