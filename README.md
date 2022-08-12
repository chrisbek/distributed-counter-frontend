# Frontend for distributed counter

This project consists of an [SPA](https://en.wikipedia.org/wiki/Single-page_application) written in React which:

- Consumes a list of existing identifiers from a backend, where each identifier is supposed to have 
  a one-to-one relation with a "video".
- Subscribes to a websocket server (using SocketIO) and registers itself to listen for events for each video-identifier.
- Updates the "likes" of each video for the last 1', 5' and 10' everytime that the websocket server provides new data.
- Generates "likes" for each video-identifier per 1' interval. The number of likes that will be generated per minute
is configurable through the UI.

# Local Setup

## Prerequisites
- Clone the [distributed-counter](https://github.com/chrisbek/distributed-counter) and follow the instructions in the 
`Local Setup` section in order to start the kafka-cluster and the faust-consumers.
  
- Clone the [kafka_consumer_websockets](https://github.com/chrisbek/kafka_consumer_websockets) and the instructions in the
  `Local Setup` section in order to start the SocketIO server.
  
- Have `yarn` installed.
  
- Clone this repo.

## Start the backend server
This frontend is using a backend server in order to:
- Get the list of existing video identifier
- Create one or more new "like" event per video-identifier, which will be then persisted to a kafka-cluster

In order to start such backend server, the [distributed-counter](https://github.com/chrisbek/distributed-counter) must be
used:
```
cd path/to/distributed-counter
yarn install
poetry shell
poetry install
cp serverless.dev.yml serverless.yml -v
serverless offline start --stage=dev
```

## Start the frontend
In order to start the frontend locally: 
```
yarn install
yarn run dev
```
