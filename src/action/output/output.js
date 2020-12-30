const { Writable } = require('stream');

module.exports = function() {

    return new Writable({
        objectMode: true,
        write(chunk, encoding, next) {
            console.log(`${chunk['show_id']} - ${chunk['title']} - ${chunk['release_year']}`);
            next();
        }
    });
};