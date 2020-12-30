const _ = require('lodash');
const { Command } = require('commander');
const TvShowsAction = require('../action/shows.js');
const OutputAction = require('../action/output/output.js');

module.exports = function(data) {
    const command = new Command('shows');

    // parameters
    command.option('-c, --countries <countries>', 'list of countries where tv shows where developed');
    command.option('-d, --duration <duration>', 'tv show duration in seasons');
    command.option('-g, --genres <genres>', 'list of tv shows genres');
    command.option('-y, --year <year>', 'movie release year');

    // handler
    command.action(function(cmd) {

        // cli parameters evaluation
        const options = {
            countries: cmd.countries ? cmd.countries.split(',').map(s => s.trim()) : [],
            duration: cmd.duration ? _.toSafeInteger(cmd.duration) : Number.MIN_SAFE_INTEGER,
            genres: cmd.genres ? cmd.genres.split(',').map(s => s.trim()) : [],
            year: cmd.year ? _.toSafeInteger(cmd.year) : Number.MIN_SAFE_INTEGER
        };

        // pipe stream data
        data.pipe(new TvShowsAction(options)).pipe(new OutputAction());
    });

    return command;
};