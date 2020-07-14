const cluster = require('cluster');

const hostname = 'localhost';
const port = 3012;

const workers = process.env.WORKERS || require('os').cpus().length;

if (cluster.isMaster) {
  console.log('start cluster with %s workers', workers);

  for (let i = 0; i < workers; ++i) {
    const worker = cluster.fork().process;
    console.log('worker %s started.', worker.pid);
  }

  cluster.on('exit', (worker: { process: { pid: number } }) => {
    console.log('worker %s died. restart...', worker.process.pid);
    cluster.fork();
  });
} else {
  const server = require('./controller.ts');

  server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);

    // require('./getPosts');
  });
}

process.on('uncaughtException', (err) => {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});
