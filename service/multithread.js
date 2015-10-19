var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var arg = process.argv.slice(2);

var n = arg[0] || numCPUs * 1;

if (cluster.isMaster) {
	console.log('--> Your system have ' + numCPUs + ' CPU, running on ' + n + ' thread(s).');

	// Fork workers.
	for (var i = 0; i < n; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	// Run multi crawler	
	require('./index');
}
