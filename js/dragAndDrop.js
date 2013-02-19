var playlistURI = "";
window.onload = function(){
    var sp = getSpotifyApi();
    var models = sp.require('$api/models');

    // Handle drops
    var drop_box = document.querySelector('#drop_box');

    drop_box.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.effectAllowed = 'copy';
    }, false);

    drop_box.addEventListener('dragenter', function(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('over');
    }, false);

    drop_box.addEventListener('dragover', function(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    drop_box.addEventListener('dragleave', function(e){
        e.preventDefault();
        this.classList.remove('over');
    }, false);

    drop_box.addEventListener('drop', function(e){
        e.preventDefault();
        var drop = models.Playlist.fromURI(e.dataTransfer.getData('text'));
        this.classList.remove('over');
        var success_message = document.createElement('p');
        this.innerHTML = 'Playlist successfully dropped: ' + drop.name;
        playlistURI = drop.uri;
    }, false);
};

function getPlaylistURI() {
    if (playlistURI === "") {
        console.log("jodu");
        playlistURI = "spotify:user:simstr:playlist:6dC1M384MSr9NIY9SrUI62";
    }
    return playlistURI;
}