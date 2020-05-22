const { Redis } = require('./redis');
const { redisConfig } = require('./config/redis');
const { REDIS_CHANNEL = 'mq' } = process.env;

const redis = new Redis(redisConfig, REDIS_CHANNEL);

const main = async () => {
  setTimeout(
    async () => await redis.init(),
    process.env.NODE_ENV === 'development' ? 5000 : 0
  );
};

main().catch((e) => console.log(e));
