function getInfo() {
	var sp = getSpotifyAPI();
	var models = sp.require("$api/models");

	tracksFromPlaylist(getPlaylistAPI());

	

}