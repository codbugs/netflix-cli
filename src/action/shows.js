const _ = require('lodash');
const { Transform } = require('stream');
const { toSafe } = require('../data/safer.js');


module.exports = function(options) {

    // options parameter initialization
    options = options || {};
    options.countries = options.countries || [];
    options.duration = options.duration || Number.MIN_SAFE_INTEGER;
    options.genres = options.genres || [];
    options.year = options.year || Number.MIN_SAFE_INTEGER;

    // options parameter validation
    if(_.isEmpty(options)) {
        throw new TypeError('options parameter is mandatory');
    }

    if(!_.isArray(options.countries)) {
        throw new TypeError('countries property must be an array');
    }

    if(!_.isInteger(options.duration)) {
        throw new TypeError('duration property must be an int');
    }

    if(!_.isArray(options.genres)) {
        throw new TypeError('genres property must be an array');
    }

    if(!_.isInteger(options.year)) {
        throw new TypeError('year property must be an int');
    }


    // filters functions definition
    const countriesFilter = (chunk, options) => _.isEmpty(options.countries) ? true : options.countries.every(c => chunk.countries.includes(c));
    const genresFilter = (chunk, options) => _.isEmpty(options.genres) ? true : options.genres.every(g => chunk.genres.includes(g));
    const durationFilter = (chunk, options) => options.duration === Number.MIN_SAFE_INTEGER ? true : chunk.duration === `${options.duration} Season` || chunk.duration === `${options.duration} Seasons`;
    const typeFilter = chunk => chunk['type'] === 'TV Show';
    const yearFilter = (chunk, options) => options.year === Number.MIN_SAFE_INTEGER ? true : chunk.year === options.year;

    const filters = [
        countriesFilter,
        genresFilter,
        durationFilter,
        typeFilter,
        yearFilter
    ];


    // stream object to be returned filtering each chunk provided
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, next) {
            const safeChunk = toSafe(chunk);
            const properties = {
                countries: safeChunk.country,
                duration: safeChunk.duration,
                genres: safeChunk.listed_in,
                type: safeChunk.type,
                year: safeChunk.release_year
            };

            if(filters.every(f => f(properties, options))) {
                this.push(chunk);
            }

            next();
        }
    });
};