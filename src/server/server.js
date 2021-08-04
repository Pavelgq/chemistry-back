const express = require('express');
const cors = require('cors');

const logger = require(`../logger/logger`);

const userRoutes = require(`../routes/users-route`);
const chemetryRoutes = require(`../routes/chemetry-route`);


const app = express();

app.use(express.static(`static`));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());



app.use(`/api/user`, userRoutes);
app.use(`/api/chemetry`, chemetryRoutes);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3001;

const serverAddress = `http://${HOSTNAME}:${PORT}`;

module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      logger.info(`Server running at ${serverAddress}/`);
    });
  },
  app
};