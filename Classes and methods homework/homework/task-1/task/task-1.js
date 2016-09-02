'use strict';

class listNode {
    constructor(value) {
        this._value = value;
        this._next = null;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get next() {
        return this._next;
    }

    set next(value) {
        this._next = value;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._length = 0;
    }

    _first() {
        return this._head;
    }

    _last() {
        var currentElement = this._first();
        var last = this._first();
        while (currentElement) {
            last = currentElement;
            currentElement = currentElement.next;
        }

        return last;
    }

    get first() {
        return this._first().value;
    }

    get last() {
        return this._last().value;
    }

    get length() {
        var length = 0;
        var currentElement = this._first();
        while (currentElement) {
            length += 1;
            currentElement = currentElement.next;
        }

        return length;
    }

    append(...args) {
        if (args.length < 1) {
            return this;
        }

        this._addElements(args);

        return this;
    }

    prepend(...args) {
        if (args.length < 1) {
            return this;
        }

        let previousHead = this._head;
        this._head = new listNode(args[0]);
        args.shift();
        this._addElements(args);
        this._last().next = previousHead;

        return this;
    }
    insert(index, ...args) {

        if (index === 0) {
            let previuosHead = this._head;
            this._head = null;
            this._addElements(args);
            this._last().next = previuosHead;
        } else {
            let placeToInsert = this._findIndex(index);
            let previousTail = this._findIndex(index + 1);
            placeToInsert.next = null;
            this._addElements(args);
            this._last().next = previousTail;
        }

        return this;
    }

    at(index, args) {
        let result;
        if (index) {
            result = this._findIndex(index).next;
        } else {
            result = this._head;
        }
        if (typeof args != 'undefined') {
            result.value = args;
        } else {
            return result.value;
        }
    }

    removeAt(index) {
        let previous;
        let elementToRemove;
        if (index) {
            previous = this._findIndex(index);
            elementToRemove = previous.next;
            previous.next = elementToRemove.next;

            return elementToRemove.value;
        } else {
            elementToRemove = this._head;
            this._head = elementToRemove.next;

            return elementToRemove.value;
        }

    }

    toArray() {
        let currentElement = this._first();
        let result = [];
        while (currentElement) {
            result.push(currentElement.value);
            currentElement = currentElement.next;
        }

        return result;
    }

    toString() {
        let asArray = this.toArray();
        let result = asArray.join(' -> ');

        return result;
    }

    _addElements(args) {

        if (this.length === 0) {
            this._head = new listNode(args[0]);
            args.shift();
        }
        for (let i = 0, len = args.length; i < len; i += 1) {


            let positionOfAppending = this._last();
            let elementToAppend = new listNode(args[i]);
            positionOfAppending.next = elementToAppend;
        }
    }

    _findIndex(index) {
        let currentElement = this._head;
        let i = 0;
        for (i; i < index - 1; i += 1) {
            currentElement = currentElement.next
        }

        return currentElement;
    }

    *[Symbol.iterator]() {
        let len = this.length;
        let result = this.toArray();

        for (let i = 0; i < len; i += 1) {
            yield result[i];
        }
    }

}



//console.log(list.first)


module.exports = LinkedList;