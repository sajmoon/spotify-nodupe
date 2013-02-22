function getTags(track) {
	getFromMB(track, displayTags);
}

function getTagsForManyTracks(tracks) {
	var i = 0;

	var interval = setInterval(function() {
		console.log("getData for i " + i);
		getFromMB(tracks[i], displayTags);
		i++;
		if ( i > tracks.length) {
			clearInterval(interval);
		}
	}, 1000);
}

function getFromMB(track, callback) {
	var sp = getSpotifyApi();
	var models = sp.require("$api/models");

	var query = "http://musicbrainz.org/ws/2/artist/?query=" + track.data.artists[0].name;

	$.ajax({ 
		url: query,
		method: 'GET',
		success: function(data) {
			callback(track, data);
		},
		error: function(xhr, status, errorThrown) {
			console.log("Error: " + status );
		}

	});
}

function displayTags(track, data) {
	var output = "";
	var tags = $(data).find('artist').first().find('tag-list').children().find('name');
	var liID = "#" +track.data.uri.split(":")[2];
	
	for (var i = 0; i < tags.length && i < 4; i++) {
		output = "<li class='tag'>" + tags[i].firstChild.textContent + "</li>";
		$(liID).append(output);
	}
	
}