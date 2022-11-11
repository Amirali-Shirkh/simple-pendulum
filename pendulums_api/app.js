const express = require('express');
const cluster = require('cluster');
const cors = require('cors');

const Pendulum = require('./model/pendulum');
const { detectCollision } = require('./utils/collisionDetection');

let pause = false;
const hostname = '127.0.0.1';
const instanceToPortMap = {
  instance1: 8000,
  instance2: 8001,
  instance3: 8002,
  instance4: 8003,
  instance5: 8004,
};

function notifyAllWorkers(workers, message) {
  workers.forEach((worker) => {
    worker.send(message);
  });
}

const notifyMaster = (process, message) => process.send(message);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    cluster.fork({
      port: instanceToPortMap[`instance${i + 1}`],
    });
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  const workers = Object.values(cluster.workers);
  let restartMessageCount = 0;
  workers.forEach((worker) => {
    worker.on('message', (message) => {
      if (message === 'STOP') {
        notifyAllWorkers(workers, 'STOP');
      }
      if (message === 'RESTART') {
        restartMessageCount += 1;
        if (restartMessageCount === 5) {
          notifyAllWorkers(workers, 'RESTART');
          restartMessageCount = 0;
        }
      }
    });
  });
} else {
  const app = express();
  let pendulum;

  const port = parseInt(process.env.port, 10);

  app.use(cors(), express.json(), express.urlencoded({ extended: true }));

  app.post('/pendulum', (req, res) => {
    if (typeof pendulum === 'undefined' || req.body.initialization === 'true') {
      pause = false;
      pendulum = new Pendulum(
        req.body.x,
        req.body.y,
        req.body.r,
        req.body.angle,
        req.body.weight,
        process.env.port,
      );
    }
    if (!pause) {
      const urls = pendulum.nearbyPendulumUrls();
      const promises = [];
      urls.forEach((url) => {
        promises.push(detectCollision(url, pendulum));
      });
      Promise.all(promises).then(([values]) => {
        if (values) {
          notifyMaster(process, 'STOP');
        }
      }).catch((error) => console.log(`Error: ${error}`));
      pendulum.update();
    }
    res.send({
      x: pendulum.calculateXCoordinate(),
      y: pendulum.calculateYCoordinate(),
    });
  });

  app.get('/coordinates', (req, res) => {
    if (typeof pendulum === 'undefined') {
      res.status(400).send({ error: 'Bad request' });
    }
    res.send({
      x: pendulum.calculateXCoordinate(),
      y: pendulum.calculateYCoordinate(),
    });
  });
  app.listen(port, hostname, () => {
    console.log(`worker process ${process.pid} is listening on port ${port}`);
  });

  process.on('message', async (message) => {
    console.log(`Worker ${process.pid} received message from master.`, message);
    if (message === 'STOP') {
      pause = true;
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      process.send('RESTART');
    }
    if (message === 'RESTART') {
      pendulum.resetPendulum();
      pause = false;
    }
  });
  console.log(`Worker ${process.pid} started`);
}
