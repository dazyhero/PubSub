const IORedis = require('ioredis');
const RedisSMQ = require('rsmq');

class Redis {
  constructor(redisConfig, REDIS_CHANNEL) {
    this.sub = new IORedis(redisConfig);
    this.redis = new IORedis(redisConfig);
    this.rsmq = new RedisSMQ(redisConfig);
    this.REDIS_CHANNEL = REDIS_CHANNEL;
  }

  async init() {
    await this.sub.subscribe(`rsmq:rt:${this.REDIS_CHANNEL}`);

    await this._getOfflineMsgs();

    this.sub.on('message', () => {
      this.rsmq.popMessage({ qname: this.REDIS_CHANNEL }, (err, resp) => {
        if (resp) {
          this.logMessage(resp.message);
        }
      });
    });
  }

  logMessage(message) {
    const [account_id, url] = message.split(';');
    console.log({
      account_id,
      url,
      timestamp: Date.now(),
    });
  }

  async _getOfflineMsgs() {
    try {
      while (await this._checkMessages()) {
        const resp = await this.rsmq.popMessageAsync({
          qname: this.REDIS_CHANNEL,
        });
        this.logMessage(resp.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async _checkMessages() {
    try {
      const { msgs } = await this.rsmq.getQueueAttributesAsync({
        qname: this.REDIS_CHANNEL,
      });

      return msgs;
    } catch (e) {
      return 0;
    }
  }
}

module.exports = {
  Redis,
};
