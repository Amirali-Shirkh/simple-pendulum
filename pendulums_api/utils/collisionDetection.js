const axios = require('axios');

const isPendulumTooClose = (pendulum, x, y, threshold) => {
  if ((x + threshold) > pendulum.calculateXCoordinate()
        && pendulum.calculateXCoordinate() > (x - threshold)
        && (y + threshold) > pendulum.calculateYCoordinate()
        && pendulum.calculateYCoordinate() > (y - threshold)) {
    return true;
  }
  return false;
};

const detectCollision = (url, pendulum) => axios.get(url)
  .then((response) => isPendulumTooClose(pendulum, response.data.x, response.data.y, 60))
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  detectCollision,
};
