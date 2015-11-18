'use strict';

var pm2 = require('pm2');

module.exports = function (Pm2) {
	// *************************************
	// LIST OF PROCESS
	// *************************************
    Pm2.listProcess = function(cb) {
		pm2.connect(function() {
			pm2.list(cb);
		});
    };

    Pm2.remoteMethod('listProcess', {
    	returns: {arg: 'response', root: true},
        http: {
            path: '/list',
            verb: 'get'
        }
    });

    // *************************************
	// NEW PROCESS
	// *************************************
    Pm2.newProcess = function(path, config, cb) {
		pm2.connect(function() {
			pm2.start(path, config, cb);
		});
    };

	// *************************************
	// RESTART PROCESS
	// *************************************
    Pm2.restartProcess = function(proc_name, cb) {
		if (!proc_name) return cb("No process");
		
		pm2.connect(function() {
			pm2.restart(proc_name, cb);
		});
    };

    Pm2.remoteMethod('restartProcess', {
    	accepts: [
			{ arg: 'proc_name', type: 'string'}
		],
		returns: {arg: 'response', type: 'json', root: true},
        http: {
            path: '/restart',
            verb: 'get'
        }
    });
};
