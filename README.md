Circuit RESTful bot GET | POST | Webhook
==================================

## Prerequisites
[![NodeJS](https://img.shields.io/badge/Node.js-6.10.2-brightgreen.svg)](https://nodejs.org) <br/>
* Developer account on circuitsandbox.net. Get it for free at [developer registration](https://www.circuit.com/web/developers/registration).
* OAuth 2.0 `client_id` and optionally `client_secret`. Get if for free at [circuit.github.com/oauth](https://circuit.github.com/oauth).

## Dependencies

* [circuit-sdk](https://www.npmjs.com/package/circuit-sdk).
* [express](https://www.npmjs.com/package/express).
* [ngrok](https://www.npmjs.com/package/ngrok).
* [node-fetch](https://www.npmjs.com/package/node-fetch).
* [simple-oauth2](https://www.npmjs.com/package/simple-oauth2).
* [body-parser](https://www.npmjs.com/package/body-parser).

## REST Reference
Other examples of RESTful API's with circuit can be found [here](https://circuitsandbox.net/rest/v2/swagger/ui/index.html).

## Usage
1. Clone the respository.
2. Rename `config.json.template` to `config.json` after adding your `client_id`, `client_secret`, and the `port` the bot wil run on. Once you have done so all you need to do is run `$ npm start` and the bot will begin. The bot will log the most recent items in the conversation, post a new item once it is listening, and then log any new items posted in the conversation.