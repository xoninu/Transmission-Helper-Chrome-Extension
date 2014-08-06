var downloadURL = function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
}

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  
  //Formulate rpc call
  
  //Load torrent data
  
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'arraybuffer';
	console.log('Reading in progress...');
	xhr.open("GET", "http://piratebaytorrents.info/9306604/Linkin_Park_-_Rolling_In_The_Deep_(Adele_Cover_-_Live)_HDTV_1080.9306604.TPB.torrent", true);
	
	xhr.onreadystatechange = function() {

		console.log('Process result...');
		
		if (xhr.readyState == 4) {
		
			//console.log(xhr.responseText);
			var arraybuffer = xhr.response; // not responseText
			var view8 = new Uint8Array(arraybuffer);
			console.log(view8);
			//var resp = eval("(" + xhr.responseText + ")");
		};
	};
	
	xhr.send();

    //reader.readAsText('http://piratebaytorrents.info/9306604/Linkin_Park_-_Rolling_In_The_Deep_(Adele_Cover_-_Live)_HDTV_1080.9306604.TPB.torrent');
}

// Create one test item for each context type.
var contexts = ["link"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Add to Transmission";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick}, function() { 
	if (chrome.extension.lastError) {
		console.log("Failed to create item in context menu. Error: " + chrome.extension.lastError.message);
	}
	});
  console.log("'" + context + "' item:" + id);
}
