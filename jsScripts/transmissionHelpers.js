var lastReqStatus = 0;
var sessionID = "";

var READYSTATE = {
  UNSENT : {value: 0, name: "UNSENT", desc: "open()has not been called yet."}, 
  OPENED: {value: 1, name: "OPENED", desc: "send()has not been called yet."}, 
  HEADERS_RECEIVED : {value: 2, name: "HEADERS_RECEIVED", desc: "send() has been called, and headers and status are available."},
  LOADING : {value: 3, name: "LOADING", desc: "Downloading; responseText holds partial data."},
  DONE : {value: 4, name: "DONE", desc: "The operation is complete."}
};

Object.freeze(READYSTATE); //this will force the var READYSTATE not to change

var TAGNO = 0x535253; //SRS :D

//Reference: https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt

//Send RPC to Add torrent file
function trAddTorrent(torrentURL) {

  var refUserSettings = chrome.extension.getBackgroundPage().userSettings;

    // Build request
    var data = JSON.stringify({
      "method": "torrent-add",
      "arguments": {
        "filename": torrentURL,
        "paused": false
      },
      "tag": TAGNO
    });
    
    sendRPCRequest(data, function(req) {
      try {
            //Success. Parse the response
            if (lastReqStatus == 200) {

              console.log(req.responseText);

              var resp = JSON.parse(req.responseText);
              if (resp["result"] == "success"){
               console.log("Torrent Added. Name [" + resp["arguments"]["torrent-added"]["name"] + "], ID [" + resp["arguments"]["torrent-added"]["id"] + "], HashString [" + resp["arguments"]["torrent-added"]["hashString"] + "]");
             }
             else {

              if (resp["arguments"] == "torrent-duplicate"){
                console.log("Torrent already exist.");
              }
              else
              {
                console.log("Failed to add torrent. ", resp["result"]);
              }
            }

            lastReqStatus = 0;
          }
          else {
                // unable to contact server
                var title = "unable to contact " + rpcUrl;
                var text = "";
                switch (JSON.parse(lastReqStatus)) {
                  case 0:
                  text = "no response";
                  break;
                  case 401:
                  text = "Unauthorized";
                  break;
                  default:
                  text = "unrecognized response";
                  break;
                }
                console.log(title + " - " + text);
              }
            }
            catch (err) {
              console.log("Something went really wrong!!!!!!");
            }
          }, refUserSettings.getRpcURL(), refUserSettings.password, refUserSettings.username);
}

//Send RPC Test
function testRPCConfig(host, port, password, username, cbResult) {

	var refUserSettings = chrome.extension.getBackgroundPage().userSettings;
  var rpcUrl = "http://" + host + ":" + port + "/transmission/rpc";

	// Build request
  var data = JSON.stringify({
    "method": "session-get",
    "arguments":  "",
    "tag": TAGNO
  });

  var returnVal= "OOPS!!!";

  sendRPCRequest(data, function(req) {
    try {
			//Success. Parse the response
      if (lastReqStatus == 200) {

        console.log(req.responseText);

        var resp = JSON.parse(req.responseText);
        if (resp["result"] == "success"){
         console.log("Settings are correct :D");
         returnVal = "Settings are correct :D. RPC API Version [" + resp["arguments"]["rpc-version"] + "]. Version [" + resp["arguments"]["version"] + "].";
       }
       else {
         console.log("Settings not correct :(. Error: ", resp["result"]);
           returnVal = "Settings not correct :(. Error: ", resp["result"];
         }

         lastReqStatus = 0;
       }
       else {
                // unable to contact server
                var title = "unable to contact " + rpcUrl;
                var text = "";
                switch (JSON.parse(lastReqStatus)) {
                  case 0:
                  text = "no response";
                  break;

                  case 401:
                  text = "Unauthorized";
                  break;

                  case 409:
                  text = "Invalid Session ID (" + sessionID + ")";
                  break;

                  default:
                  text = "unrecognized response";
                  break;
                }
                console.log(title + " - " + text);
                returnVal = title + " - " + text;
              }
            } 
            catch (err) {
              returnVal = "Something went really wrong!!!!!!";
            }

        //sessionID = "";
        
        if (typeof cbResult == "undefined"){
         console.log("Result callback not available");
       }
       else {
         console.log("Invoking callback with result : " + returnVal);
         cbResult(returnVal);
       }

     }, rpcUrl, password, username);
}

//Generic RPC Request method
function sendRPCRequest(data, cbFunction, rpcUrl, rpcPassword, rpcUsername) {
  var refUserSettings = chrome.extension.getBackgroundPage().userSettings;
  var req = new XMLHttpRequest();

  console.log(rpcUrl);
  console.log(rpcUsername);
  console.log(rpcPassword);

  req.open("POST", rpcUrl, true, rpcUsername, rpcPassword);

	//Refer to 2.3.1.  CSRF Protection in reference document
	req.setRequestHeader("X-Transmission-Session-Id", sessionID);
  req.setRequestHeader("Content-Type", "application/json");

  req.onreadystatechange = function() {

    if (req.readyState == READYSTATE.DONE.value) {

    			//Refer to 2.3.1.  CSRF Protection in reference document
    			if (req.getResponseHeader("X-Transmission-Session-Id")) {
            sessionID = req.getResponseHeader("X-Transmission-Session-Id");
            return sendRPCRequest(data, cbFunction, rpcUrl, rpcPassword, rpcUsername);
          }

          if (typeof cbFunction != "undefined"){
            cbFunction(req);
          }

          console.log("lastReqStatus : " + req.status);
          lastReqStatus = req.status;
        }
        else{
          console.log("Ready State: " + req.readyState);
        }
      };

      req.send(data);
    }