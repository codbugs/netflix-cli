const _ = require('lodash');
const { Command } = require('commander');
const DetailAction = require('../action/detail.js');
const OutputAction = require('../action/output/detail.js');

module.exports = function(data) {
    const command = new Command('detail');

    // parameters
    command.requiredOption('-i, --id <id>', 'item id');

    // handler
    command.action(function(cmd) {

        // cli parameters evaluation
        const id = cmd.id ? _.toSafeInteger(cmd.id) : Number.MIN_SAFE_INTEGER;
        
        data.pipe(new DetailAction(id)).pipe(new OutputAction());
    });

    return command;
};