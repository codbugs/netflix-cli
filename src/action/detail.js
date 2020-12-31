const { Transform } = require('stream');
const { toSafe } = require('../data/safer.js');


module.exports = function(id) {
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, next) {
            const safeChunk = toSafe(chunk);
            const isTheSameId = safeChunk.show_id === id;

            if(isTheSameId) {
                this.push(safeChunk);
            }

            next();
        }
    });
};