const _ = require('lodash');
const { Transform } = require('stream');
const { toSafe } = require('../data/safer.js');


module.exports = function() {

    let genres = [];

    return new Transform({
        objectMode: true,
        flush(next) {
            genres = genres.sort();
            genres.forEach(g => this.push(g));
            next();
        },
        transform(chunk, encoding, next) {

            const safeChunk = toSafe(chunk);

            safeChunk.listed_in.forEach(function(item) {
                if(false === genres.includes(item)) {
                    genres.push(item);
                }
            });

            next();
        }
    });
};