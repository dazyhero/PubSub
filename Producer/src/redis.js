const RedisSMQ = require('rsmq');

class Redis {
  constructor(redisConfig, REDIS_CHANNEL) {
    this.REDIS_CHANNEL = REDIS_CHANNEL;
    this.rsmq = new RedisSMQ(redisConfig);
  }

  async init() {
    try {
      await this.rsmq.createQueueAsync({ qname: this.REDIS_CHANNEL });
    } catch (e) {
      e.message === 'queueExists' && console.log(e);
    }
  }

  async handleMessage(message) {
    try {
      await this.rsmq.sendMessageAsync({
        qname: this.REDIS_CHANNEL,
        message,
        delay: 0,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  Redis,
};
