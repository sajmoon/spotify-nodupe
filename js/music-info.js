function getInfo() {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");

	tracksFromPlaylist(getPlaylistAPI());



}


function getTags(track) {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");


	var query = "http://musicbrainz.org/ws/2/artist/?query=" + track.data.artists[0].name;

	console.log(query);
	$.ajax({ 
		url: query,
		method: 'GET',
		success: function(data) {

			var output = "";
			var tags = $(data).find('artist').first().find('tag-list').children().find('name');
			var liID = "#" +track.data.uri.split(":")[2];
			

			for (var i = 0; i < tags.length && i < 4; i++) {
					
				output = "<div class='tag'>" + tags[i].firstChild.textContent + "</div>";
				console.log($(liID));
				$(liID).append(output);
			}
			
			
		//.each(function() {
			//console.log(tags);
		}
		});
		
    return "inga taggar";
}