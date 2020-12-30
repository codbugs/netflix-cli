const _ = require('lodash');

function removeDoubleQuotes(value) {
    return value.startsWith('"') && value.endsWith('"')
        ? value.substring(1, value.length-1)
        : value;
}

function convertToArray(value) {
    return removeDoubleQuotes(value).split(',').map(s => s.trim());
}

module.exports = {

    toSafe: function(chunk) {

        return {
            show_id: chunk['show_id'] ? _.toSafeInteger(chunk['show_id']) : Number.MIN_SAFE_INTEGER,
            type: chunk['type'] || '',
            title: chunk['title'] ? removeDoubleQuotes(chunk['title']) : '',
            director: chunk['director'] ? convertToArray(chunk['director']) : [],
            cast: chunk['cast'] ? convertToArray(chunk['cast']) : [],
            country: chunk['country'] ? convertToArray(chunk['country']) : [],
            date_added: chunk['date_added'] ? removeDoubleQuotes(chunk['date_added']) : '',
            release_year: chunk['release_year'] ? _.toSafeInteger(chunk['release_year']) : Number.MIN_SAFE_INTEGER,
            rating: chunk['rating'] ? removeDoubleQuotes(chunk['rating']) : '',
            duration: chunk['duration'] ? removeDoubleQuotes(chunk['duration']) : '',
            listed_in: chunk['listed_in'] ? convertToArray(chunk['listed_in']) : [],
            description: chunk['description'] ? removeDoubleQuotes(chunk['description']) : '',
        };
    }
}