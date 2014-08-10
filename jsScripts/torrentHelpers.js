
function isValidTorrentURL(torrentURL){

	var tmpStr = new String(torrentURL);

	if (tmpStr.search(".torrent") != -1 || tmpStr.search("magnet:") != -1){

		return true;
	}
		
	return false;
}