function solve(){
var idGenerator = (function () {
    let id = 0;
    return function () {
        id += 1;
        return id;
    }
} ());

function ItemLike(actualType) {
    var result = true;
    var book = new Item('fsafd', 'fsdafds')
    var wantedProps = [];
    var ownedPropes = [];

    for (let prop in book) {
        if (book.hasOwnProperty(prop)) {
            wantedProps.push(prop);
        }
    }

    for (let prop in actualType) {
        ownedPropes.push('_' + prop)
    }

    wantedProps.forEach(function (prop) {
        if (ownedPropes.indexOf(prop) < 0) {
            result = false;
        }
    })

    return result;
}

function BookLike(actualType) {
    var result = true;
    var book = new Book('fsafd', 'fsdafds', '1452365879', 'fasfds')
    var wantedProps = [];
    var ownedPropes = [];

    for (let prop in book) {
        if (book.hasOwnProperty(prop)) {
            wantedProps.push(prop);
        }
    }

    for (let prop in actualType) {
        ownedPropes.push('_' + prop)
    }

    wantedProps.forEach(function (prop) {
        if (ownedPropes.indexOf(prop) < 0) {
            result = false;
        }
    })

    return result;
}

function MediaLike(actualType) {
    var result = true;
    var media = new Media('fsdfs', 'fsdf', 123, 4);
    var wantedProps = [];
    var ownedPropes = [];

    for (let prop in media) {
        wantedProps.push(prop);
    }

    for (let prop in actualType) {
        ownedPropes.push('_' + prop)
    }

    wantedProps.forEach(function (prop) {
        if (ownedPropes.indexOf(prop) < 0) {
            result = false;
        }
    })

    return result;
}

class Item {
    constructor(description, name) {
        this._id = idGenerator();
        this.description = description;
        this.name = name
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        if ((value === '') || !value) {
            throw 'Description can not be null or empty'
        }
        this._description = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 2 || 40 < value.length) {
            throw 'Name must be between 2 and 40 chars.'
        }

        this._name = value;
    }
}

class Book extends Item {
    constructor(description, name, isbn, genre) {
        super(description, name);
        this.isbn = isbn;
        this.genre = genre;
    }
    get isbn() {
        return this._isbn
    }

    set isbn(value) {
        this._validateIsbn(value);
        this._isbn = value;
    }

    get genre() {
        return this._genre;
    }

    set genre(value) {
        if (value.length < 2 || 20 < value.length) {
            throw 'Genre must be between 2 and 20 chars'
        }
        this._genre = value;
    }
    _validateIsbn(isbn) {
        if (isbn.length != 10 && isbn.length != 13) {
            throw 'ISBN must be exactly 10 or 13 digits'
        }

        if (isNaN(isbn)) {
            throw 'ISBN must contain only digits'
        }
    }
}

class Media extends Item {
    constructor(description, name, duration, rating) {
        super(description, name);
        this.duration = duration;
        this.rating = rating;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        if (value <= 0 || !value) {
            throw 'Duration must be greater than zero'
        }

        this._duration = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        if (value < 1 || 5 < value || !value) {
            throw 'Rating must be between 1 and 5';
        }

        this._rating = value;
    }
}

class Catalog {
    constructor(name) {
        this._id = idGenerator();
        this.name = name;
        this._items = [];
    }

    get items() {
        return this._items;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 2 || 40 < value.length) {
            throw 'Name must be between 2 and 40 chars';
        }
        this._name = value;
    }

    add() {
        let items = [];
        if (Array.isArray(arguments[0])) {
            items = arguments[0];
        } else {
            for (let item of arguments) {
                items.push(item)
            }
        }

        if (items.length < 1) {
            throw 'Items must be passed';
        }
        items.forEach(function (x) {
            if (!(x instanceof Item)) {
                if (!(ItemLike(x))) {
                    throw 'Only type of Items can be passed'
                }
            }
        });

        for(let item of items){
            this.items.push(item);
        }
        return this;
    }

    find(options) {

        if (!options) {
            throw 'Id must be passed';
        }

        if (options instanceof Object) {
            let result = [];

            for (let prop in options) {
                if (options.hasOwnProperty(prop)) {
                    this.items.forEach(function (item) {
                        for (let mykey in item) {
                            if (('_' + prop === mykey) && (item[mykey] === options[prop])) {
                                if (result.indexOf(item) < 0) {
                                    result.push(item);
                                }
                            }
                        }

                    })
                }
            }

            return result;
        } else {

            if (typeof options != 'number') {
                throw 'Id must be a number'
            }

            let result = null;
            this.items.forEach(function (item) {
                if (item.id === options) {
                    result = item;
                }
            })

            return result;
        }
    }

    search(pattern) {
        if(!pattern){
            throw 'Pattern is mandatory'
        }
        let resut = [];
        this.items.forEach(function (item) {
            if (item.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) {
                if (resut.indexOf(item) < 0) {
                    resut.push(item);
                }
            } else if (item.description.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) {
                if (resut.indexOf(item) < 0) {
                    resut.push(item);
                }
            }
        })

        return resut;
    }
}

class BookCatalog extends Catalog {
    constructor(name) {
        super(name);
    }

    add() {
        let items = [];
        if (Array.isArray(arguments[0])) {
            items = arguments[0];
        } else {
            for (let item of arguments) {
                items.push(item)
            }
        }

        items.forEach(function (item) {
            if (!(item instanceof Book)) {
                if (!BookLike(item)) {
                    throw 'You can add only booklike objects'
                }
            }
        })

        return super.add(items);
    }

    getGenres() {
        let result = [];
        this.items.forEach(function (item) {
            if (result.indexOf(item.genre) < 0) {
                result.push(item.genre);
            }
        })

        return result;
    }
}

class MediaCatalog extends Catalog {
    constructor(name) {
        super(name);
    }

    add() {
        let items = [];
        if (Array.isArray(arguments[0])) {
            items = arguments[0];
        } else {
            for (let item of arguments) {
                items.push(item)
            }
        }

        items.forEach(function (item) {
            if (!(item instanceof Media)) {
                if (!MediaLike(item)) {
                    throw 'You can add only medialike objects'
                }
            }
        })

      return super.add(items);
    }

    getTop(count) {
        if (typeof count != 'number' || count < 1) {
            throw 'Count must be number greater than 1'
        }

        var sortedByRating = this.items.sort(function (a, b) {
            return b.rating - a.rating;
        })

        let result = [];
        for (let i = 0; i < count; i += 1) {
            result.push({id: sortedByRating[i].id, name: sortedByRating[i].name});
        }

        return result;
    }

    getSortedByDuration() {
        var result = this.items.sort(function (a, b) {
            if (a.duration != b.duration) {
                return b.duration - a.duration;
            } else {
                return a.name - b.name;
            }
        })

        return result;
    }
    
}

// var catalog = new BookCatalog('catalog');
// var gosho = new Book('fsfd', 'fsdfsd', '3256879512', 'fds')
// var pesho = new Book('fsfd', 'fsdfsd', '3256879512', 'daiba')
// var sasho = new Book('fsfd', 'fsdfsd', '3256879512', 'mnogo')
// var tosho = new Book('fsfd', 'fsdfsd', '3256879512', 'muhal')
// var vsichkite = [gosho, pesho, sasho, tosho];
// var addResult = catalog.add(gosho, pesho, sasho, tosho);
// console.log(addResult);


return {
		getBook: function (name, isbn, genre, description) {
			return new Book(description,name,isbn,genre);
		},
		getMedia: function (name, rating, duration, description) {
			return new Media(description,name,duration,rating)
		},
		getBookCatalog: function (name) {
			return new BookCatalog(name);
		},
		getMediaCatalog: function (name) {
			return new MediaCatalog(name);
		}
	};
}

module.exports = solve;
