const _ = require('lodash');
const { Command } = require('commander');
const RatingsAction = require('../action/ratings.js');
const OutputRatingsAction = require('../action/output/ratings.js');

module.exports = function(data) {
    const command = new Command('ratings');

    // handler
    command.action(function(cmd) {

        // pipe stream data
        data.pipe(new RatingsAction()).pipe(new OutputRatingsAction());
    });

    return command;
};