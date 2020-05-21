const Redis = require('ioredis');
const http = require('http');

const { REDIS_HOST, REDIS_PORT } = require('./config/redis');

const { PORT = '3000' } = process.env;

const redisConfig = {
  port: REDIS_PORT,
  host: REDIS_HOST,
};

const redis = new Redis(redisConfig);
const pub = new Redis(redisConfig);

redis.subscribe('messaging', (err, count) => {
  if (err) console.log(err);

  console.log('Connected');
});

const requestHandler = (req, res) => {
  console.log(`----> ${req.url}`);
  if (req.url === '/api/v1/track') {
    res.writeHead(201);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
};

const httpServer = http.createServer(requestHandler);

httpServer.listen(PORT);
