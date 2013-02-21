"use strict";
window.onload = function() {
    var sp = getSpotifyApi();
    var models = sp.require('$api/models');

    function htmlEscape(str) {
        return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    }

    function tabs() {
        var args = models.application.arguments;
        if (args) {
            var lastArg = args[args.length - 1];
            if (lastArg !== 'index' && lastArg !== 'tabs') {
                return;
           }
       }

        // compose file
        var file = args.length == 1 ? (args[0] + '.html') : '/tutorials/' + args.slice(0, args.length-1).join('/') + '.html';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4 || xhr.status != 200) return;

            var wrapper = document.getElementById('wrapper');
            wrapper.innerHTML = args[0] === 'index' ? '' : '<ul class="breadcrumb"><li><a href="spotify:app:api-tutorial:index">&laquo; Back to main page</a></li></ul>';
            wrapper.innerHTML += xhr.responseText;

            window.scrollTo(0, 0);
            var htmlSnippets = wrapper.querySelectorAll(".html-snippet");
            for (i = 0; i < htmlSnippets.length; i++) {
                container = htmlSnippets[i].getAttribute("data-container");
                if (container) {
                    document.getElementById(container).innerHTML = '<pre><code data-language="html">' + htmlEscape(htmlSnippets[i].innerHTML) + '</code></pre>';
                }
            }

            // search js snippets
            var scripts = wrapper.querySelectorAll("script");
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].getAttribute('type') == 'script/snippet') {
                    var dataExecute = scripts[i].getAttribute('data-execute');
                    if (!dataExecute || dataExecute != 'no') {
                        eval(scripts[i].innerHTML);
                    }
                    var container = scripts[i].getAttribute("data-container");
                    if (container) {
                        document.getElementById(container).innerHTML = '<pre><code data-language="javascript">' + htmlEscape(scripts[i].innerHTML) + '</code></pre>';
                    }
                }
            }

            // search html snippets
            Rainbow.color();
        };
        xhr.send(null);
    }
    //document.getElementById('getPlaylistTracks').attr('onclick','findDupesInPlaylist()');

    models.application.observe(models.EVENT.ARGUMENTSCHANGED, tabs);
};

function handleGetPlaylistTracks() {
    tracksFromPlaylist(getPlaylistURI(), listTracks);
    getDupes(getPlaylistURI(), listDupes);
}

function getDupes(playlistURI, callback) {
    
    tracksFromPlaylist(playlistURI, function(tracks) {
        var dupes = [];
        var dupeTracks = [];
        for (var i = 0; i < tracks.length - 1; i++) {
            var track = tracks[i];
            for (var j = i + 1; j < tracks.length; j++) {
                if (tracks[j].data.uri == track.data.uri) {
                    console.log($.contains(track.data.uri,dupes));
                    if ($.inArray(track.data.uri, dupes)==-1) {
                        dupes.push(track.data.uri);
                        dupeTracks.push(track);
                    }
                }
            }
        }
        console.log(dupeTracks.length);
        callback(dupeTracks);    
    });
}


function removeFromPlaylist(trackURI) {
    
    var sp = getSpotifyApi();
    var models = sp.require("$api/models");
    var playlist = models.Playlist.fromURI(getPlaylistURI());

    playlist.remove(trackURI);
    handleGetPlaylistTracks();
}

function removeAllDupes() {

    var tracks = tracksFromPlaylist(getPlaylistURI());
    for (var i = 0; i < tracks.length - 1; i++) {
        var track = tracks[i];
        for (var j = i +1; j < tracks.length; j++) {
            if (tracks[j].data.uri == track.data.uri) {
                console.log("Found a dupe. Removing it!");
                removeFromPlaylist(track.uri);
            }
        }
    }
}

function listDupes(dupes) {
    console.log(dupes.length);
    $('#dupeCount').empty();
    $('#dupeCount').append(""+ dupes.length + " dupes in this playlist");
    $("#dupelist").empty();
    for (var i = 0; i < dupes.length; i++) {
        var track = dupes[i];            
        $('#dupelist').append ( "<div class='track'>" + track.data.name + "<button onClick=removeFromPlaylist('" + track.uri + "')>Remove</button></div>");
    }
}

function getPlaylists() {
    var sp = getSpotifyApi();
    var models = sp.require("$api/models");

    console.log(models.Player);
}

function listTracks(tracks) {
    $('#trackCount').empty();
    $('#trackCount').append("" + tracks.length + " tracks in this playlist");
    $("#trackslist").empty();
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];            
        $("#trackslist").append( "<div class='track'>" + track.data.name + " <ul class='tags' id='"+ track.data.uri.split(":")[2] +"'></ul></div>");
        getTags(track);
    }
}

function tracksFromPlaylist(playlistURI, callback) {
    var sp = getSpotifyApi();
    var models = sp.require('$api/models');
    var playlist = models.Playlist.fromURI(playlistURI);
    var tracks = playlist.tracks;
        
    if (callback==undefined)
        return tracks;
    else
        callback(tracks);
    
}

