function getInfo() {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");

	tracksFromPlaylist(getPlaylistAPI());



}


function getTags(track) {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");

	var query = "http://musicbrainz.org/ws/2/artist/?query=coldplay"
	$.ajax(query).done( function(data) {
		console.log(data);
		var doc = $.parseXML( data );
		$xml = $( doc);
		var artist = $xml.find("artist-list").text();
		//.each(function() {
			console.log(artist);	
		//});
		

	})


    return "inga taggar";
}