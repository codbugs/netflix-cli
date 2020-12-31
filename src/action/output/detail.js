const _ = require('lodash');
const { Writable } = require('stream');

module.exports = function() {

    return new Writable({
        objectMode: true,
        write(chunk, encoding, next) {
            console.log(`id: ${chunk['show_id']}`);
            console.log(`type: ${chunk['type']}`);
            console.log(`title: ${chunk['title']}`);

            let directors = _.reduce(chunk.director, (acc, current) => acc + (!_.isEmpty(acc) ? ', ' : '') + current, '');
            console.log(`director: ${directors}`);

            let cast = _.reduce(chunk.cast, (acc, current) => acc + (!_.isEmpty(acc) ? ', ' : '') + current, '');
            console.log(`cast: ${cast}`);

            let countries = _.reduce(chunk.country, (acc, current) => acc + (!_.isEmpty(acc) ? ', ' : '') + current, '');
            console.log(`country: ${countries}`);
            
            console.log(`added on: ${chunk['date_added']}`);
            console.log(`release year: ${chunk['release_year']}`);
            console.log(`rating: ${chunk['rating']}`);
            console.log(`duration: ${chunk['duration']}`);

            let genres = _.reduce(chunk[`listed_in`], (acc, current) => acc + (!_.isEmpty(acc) ? ', ' : '') + current, '');
            console.log(`genres: ${genres}`);

            console.log(`description: ${chunk['description']}`);

            next();
        }
    });
};