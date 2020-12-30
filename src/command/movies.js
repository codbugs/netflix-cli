const _ = require('lodash');
const { Command } = require('commander');
const MoviesAction = require('../action/movies.js');
const OutputAction = require('../action/output/output.js');

module.exports = function(data) {
    const command = new Command('movies');

    // parameters
    command.option('-c, --countries <countries>', 'list of countries where movies where developed');
    command.option('-g, --genres <genres>', 'list of movie genres');
    command.option('-r, --rating <rating>', 'movie rating');
    command.option('-y, --year <year>', 'movie release year');

    // handler
    command.action(function(cmd) {

        // cli parameters evaluation
        const options = {
            countries: cmd.countries ? cmd.countries.split(',').map(s => s.trim()) : [],
            genres: cmd.genres ? cmd.genres.split(',').map(s => s.trim()) : [],
            rating: cmd.rating || '',
            year: cmd.year ? _.toSafeInteger(cmd.year) : Number.MIN_SAFE_INTEGER
        };

        // pipe stream data
        data.pipe(new MoviesAction(options)).pipe(new OutputAction());
    });

    return command;
};