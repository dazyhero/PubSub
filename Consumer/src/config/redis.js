const { REDIS_HOST = '127.0.0.1', REDIS_PORT = '6379' } = process.env;

module.exports = {
  REDIS_PORT,
  REDIS_HOST,
};
