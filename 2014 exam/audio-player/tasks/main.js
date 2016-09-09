var idGenerator = (function () {
    let id = 0;

    return function () {
        id += 1;
        return id;
    }

} ());

function validateString(value) {
    if (value.length < 3 || 25 < value.length || !value) {
        throw 'Properties name, title and author are a strings between 3 and 25 characters';
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this._playlists = [];
    }

    get playlists() {
        return this._playlists;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        validateString(value);
        this._name = value;
    }

    addPlaylist(playlistToAdd) {
        if (!playlistToAdd || !(playlistToAdd instanceof PlayList)) {
            throw 'Invalid playlist';
        }

        this.playlists.push(playlistToAdd);
        return this;
    }

    getPlaylistById(id) {
        if (!id) {
            throw 'Invalid id';
        }

        let result = null;
        this.playlists.forEach(function (value) {
            if (value.id === id) {
                result = value;
            }
        })
        return result;
    }

    removePlaylist(param) {
        if (!param) {
            throw 'No params';
        }
        let id;

        if (param instanceof PlayList) {
            id = param.id;
        } else if (typeof param === 'number') {
            id = param
        } else {
            throw 'Invalid id';
        }

        let playalistToBeRemoved = false;
        let that = this;
        that.playlists.forEach(function (value, index) {
            if (value.id === id) {
                playalistToBeRemoved = true;
                that.playList.splice(index, 1);
            }
        })
        if (!playalistToBeRemoved) {
            throw 'No matches';
        }

        return this;
    }

    listPlaylists(page, size){
          if (!page || !size || size <= 0 || page < 0 || page * size > this.playlists.length) {
            throw 'Invalid page or size';
        }

        let start = page * size;
        let end = (page + 1) * size - 1;
        let sortedList = this.playlists.sort(function (a, b) {
            if (a.title != b.title) {
                return a.title - b.title
            } else {
                return a.id - b.id;
            }
        })
        let result = [];
        for (let i = start; i < end; i += 1) {
            if (!sortedList[i]) {
                break;
            }
            result.push(sortedList[i]);
        }

        return result;

    }

    contains(playable, playlist){
        if(!playable || !playlist){
            throw 'Invalid playlist or playable'
        };

        let result = false;
        var list = this.playlists.find(x=> x.id === playlist.id);
        if(list.playList.indexOf(playable)>=0){
            result = true;
        }

        return result;
    }

    search(pattern){
        let result = [];

        this.playlists.forEach(function(value){
            value.playList.forEach(function(x){
                if(x.title.indexOf(pattern)>=0){
                    result.push({id: x.id, title: x.title})
                }
            })
        })

        return result;
    }
}

class Playable {
    constructor(title, author) {
        this._id = idGenerator();
        this.title = title;
        this.author = author;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        validateString(value);
        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        validateString(value);
        this._author = value;
    }

    play() {
        let result = `${this.id}. ${this.title} - ${this.author}`;
        return result;
    }
}

class Audio extends Playable {
    constructor(title, author, length) {
        super(title, author);
        this.length = length;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        if (!value || value < 1) {
            throw 'Length must be positive integer';
        }
        this._length = value;
    }

    play() {
        let result = `${super.play()} - ${this.length}`;
        return result;
    }
}

class Video extends Playable {
    constructor(title, author, imdbRating) {
        super(title, author);
        this.imdbRating = imdbRating;
    }

    get imdbRating() {
        return this._imdbRating;
    }

    set imdbRating(value) {
        if (!value || value < 1 || 5 < value) {
            throw 'IMDB rating must be integer between 1 and 5';
        }
        this._imdbRating = value
    }

    play() {
        let result = `${super.play()} - ${this.imdbRating}`;
        return result;
    }
}

class PlayList {
    constructor(name) {
        this._id = idGenerator();
        this.name = name;
        this._playList = [];
    }

    get playList() {
        return this._playList;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        validateString(value);
        this._name = value;
    }

    addPlayable(playable) {
        if (!(playable instanceof Playable) || !playable) {
            throw 'Only Playeble types can be addded';
        }

        this.playList.push(playable);
        return this;
    }

    getPlayableById(id) {
        if (!id) {
            throw 'Id must be provided';
        }

        let result = null;
        this.playList.forEach(function (item) {
            if (item.id === id) {
                result = item;
            }
        })

        return result;
    }

    removePlayable(param) {
        if (!param) {
            throw 'Id must be provided';
        }
        let id;

        if (param instanceof Playable) {
            id = param.id;
        } else if (typeof param === 'number') {
            id = param;
        } else {
            throw 'Not valid search pattern'
        }

        let playableToBeRemoved = false;
        let that = this;
        that.playList.forEach(function (value, index) {
            if (value.id === id) {
                playableToBeRemoved = true;
                that.playList.splice(index, 1);
            }
        })
        if (!playableToBeRemoved) {
            throw 'No matches';
        }

        return this;
    }

    listPlayables(page, size) {
        if (!page || !size || size <= 0 || page < 0 || page * size > this.playList.length) {
            throw 'Invalid page or size';
        }

        let start = page * size;
        let end = (page + 1) * size - 1;
        let sortedList = this.playList.sort(function (a, b) {
            if (a.title != b.title) {
                return a.title - b.title
            } else {
                return a.id - b.id;
            }
        })
        let result = [];
        for (let i = start; i < end; i += 1) {
            if (!sortedList[i]) {
                break;
            }
            result.push(sortedList[i]);
        }

        return result;
    }

}

var v = new Video('abc', '21313', 4);
var v2 = new Video('qwe', '21313', 5);
var v3 = new Video('rty', '21313', 5);
var v4 = new Video('tyu', '21313', 5);
var v5 = new Video('uyui', '21313', 5);
var v6 = new Video('axz', '21313', 5);
var v7 = new Video('fdsf', '21313', 5);
var v8 = new Video('adsf', '21313', 5);
var v9 = new Video('fdsf', '21313', 5);
var v10 = new Video('fdsf', '21313', 5);





var playList = new PlayList('gosho');
playList.addPlayable(v);
playList.addPlayable(v2);
playList.addPlayable(v3);
playList.addPlayable(v4);
playList.addPlayable(v5);
playList.addPlayable(v6);
playList.addPlayable(v7);
playList.addPlayable(v8);
playList.addPlayable(v9);
playList.addPlayable(v10);

var player = new Player('pesho');
player.addPlaylist(playList);

console.log(player.search('a'));
