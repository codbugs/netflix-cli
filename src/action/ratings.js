const _ = require('lodash');
const { Transform } = require('stream');
const { toSafe } = require('../data/safer.js');


module.exports = function() {

    let ratings = [];

    return new Transform({
        objectMode: true,
        flush(next) {
            ratings = ratings.sort();
            ratings.forEach(r => this.push(r));
            next();
        },
        transform(chunk, encoding, next) {

            const safeChunk = toSafe(chunk);

            if(false === ratings.includes(safeChunk.rating)) {
                ratings.push(safeChunk.rating);
            }

            next();
        }
    });
};