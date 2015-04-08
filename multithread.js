var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var n = numCPUs * 3;

if (cluster.isMaster) {
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