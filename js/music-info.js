function getTags(track) {
	getFromMB(track, displayTags);
}

function getTagsForManyTracks(tracks) {
	var i = 0;
	getCachedValue(tracks[0]);

	var interval = setInterval(function() {
		console.log("getData for i " + i);
		getFromMB(tracks[i], displayTags);
		i++;
		if ( i >= tracks.length) {
			clearInterval(interval);
		}
	}, 1000);
}

function getCachedValue(track) {

	var cache = "spotiboob";
	var items = "itemName";

	var query = "https://cache-aws-us-east-1.iron.io/1/projects/" + configs.ironCache.projectID + "/caches/" + cache + "/items/" + items + "?oauth=" + configs.ironCache.oauth;
	
	$.ajax({
		url: query,
		method: 'GET',
		success: function(data) {
			console.log("data: " + data);
		},
		error: function(xhr, status, errorThrown) {
			console.log("ERROR!: " + xhr + " - " + status + " - " + errorThrown);
		}
	});
}

function getCaches() {
	var query = "" + configs.ironCache.baseURL + configs.ironCache.projectID + "/caches?oauth=" + configs.ironCache.oauth;

	console.log("query: " + query);

	$.ajax({
		url: query,
		body: "",
		dataType: "json",
		type: "GET",
		success: function(data) {
			console.log(data);
		},
		error: function(xhr, status) {
			console.log("errors: " + xhr + "|" + status );
			console.log(xhr);
		}
	});
}

function putValue(key, value) {
	var query = "" + configs.ironCache.baseURL + configs.ironCache.projectID + "/caches/" + configs.ironCache.cache1 + "/items/" + key + "?oauth=" + configs.ironCache.oauth;
	var theBody = '{"value": "' + value + '"}';
	

	$.ajax({
		url: query,
		body: theBody,
		dataType: "json",
		type: 'PUT',
		succes: function() {
			console.log("put value");
		}
	});
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