const url = require('url');
const http = require('http');
const { isValid } = require('./helpers');

class App {
  constructor(redisService, PORT, NODE_ENV) {
    this.redisService = redisService;
    this.PORT = PORT;
  }

  _createMessages() {
    Array.from(Array(5), (_, i) =>
      this.redisService.handleMessage(
        `5ec2b7b810a0565d0d737844${i};https://google.com/id?=${i}`
      )
    );
  }

  async _requestHandler(req, res) {
    const { pathname, query } = url.parse(req.url, true);
    const endpoint = pathname.substring(1).split('/')[2];

    console.log(`----> ${req.url}`);

    if (endpoint === 'track') {
      const { account_id, url } = query;

      if (!isValid(account_id, url)) {
        res.writeHead(400);
      } else {
        await this.redisService.handleMessage(`${account_id};${url}`);
        res.writeHead(201);
      }
      res.end();
    } else {
      res.writeHead(404);
      res.end();
    }
  }

  init() {
    http.createServer(this._requestHandler.bind(this)).listen(this.PORT);
    if (process.env.NODE_ENV === 'development') {
      this._createMessages();
    }
  }
}

module.exports = {
  App,
};
