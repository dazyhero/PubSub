const { App } = require('./app');
const { Redis } = require('./redis');
const { redisConfig } = require('./config/redis');
const { REDIS_CHANNEL, PORT } = process.env;

const redis = new Redis(redisConfig, REDIS_CHANNEL);

const main = async () => {
  await redis.init();
  const app = new App(redis, PORT);
  app.init();
};

main().catch((e) => console.log(e));
