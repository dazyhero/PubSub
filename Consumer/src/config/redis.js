const { REDIS_HOST = '127.0.0.1', REDIS_PORT = '6379' } = process.env;

const redisConfig = {
  port: REDIS_PORT,
  host: REDIS_HOST,
  ns: 'rsmq',
  realtime: true,
};

module.exports = {
  redisConfig,
};
