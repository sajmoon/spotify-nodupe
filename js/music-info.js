function getInfo() {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");

	tracksFromPlaylist(getPlaylistAPI());



}


function getTags(track) {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");

	var query = "http://musicbrainz.org/ws/2/artist/?query=coldplay"
	$.ajax({ 
		url: query,
		method: 'GET',
		success: function(data) {

			
			var tags = $(data).find('artist').first().find('tag-list').children().find('name');
			var liID = "#" +track.data.uri.split(":")[2];
			
			$(liID)[0].innerHTML = tags[0].firstChild.textContent;
			
			console.log(tags[0].firstChild);
		//.each(function() {
			//console.log(tags);
		}
		});
		
    return "inga taggar";
}