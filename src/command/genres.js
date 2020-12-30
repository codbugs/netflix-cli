const _ = require('lodash');
const { Command } = require('commander');
const GenresAction = require('../action/genres.js');
const OutputGenresAction = require('../action/output/genres.js');

module.exports = function(data) {
    const command = new Command('genres');

    // handler
    command.action(function(cmd) {

        // pipe stream data
        data.pipe(new GenresAction()).pipe(new OutputGenresAction());
    });

    return command;
};