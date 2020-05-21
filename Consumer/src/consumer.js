const Redis = require('ioredis');
const { REDIS_HOST, REDIS_PORT } = require('./config/redis');

const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

const redis = new Redis(redisConfig);
const sub = new Redis(redisConfig);

redis.subscribe('messaging', (err) => {
  if (err) console.log(err);

  console.log('Connected');
});

sub.on('message', (channel, message) => {
  console.log(`Received message ${message} from ${channel}`);
});
