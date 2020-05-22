# PubSub

Application containing 2 services
* Producer
* Consumer
And redis as a message broker

## Producer
Has one endpoint
  ** api/v1/track?account_id=<ObjectID>&url=<URL> **
When valid data is received producer sends message to consumer service

``` curl "localhost:3000/api/v1/track?account_id=5ec2b7b810a0565d0d737844&url=https://google.com" ```

When NODE_ENV is set to development, sends 5 messages to the queue to test consumer ability to retract messages even after disconnect

## Consumer
On startup if NODE_ENV is set to development has a 5s delay to simulate disconnect and poll for unreceived messages

## Running application

You need to have docker installed

``` npm start ``` 
