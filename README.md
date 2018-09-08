Circuit RESTful bot GET | POST | Webhook
==================================

## Prerequisites
[![NodeJS](https://img.shields.io/badge/Node.js-6.10.2-brightgreen.svg)](https://nodejs.org) <br/>
* Developer account on circuitsandbox.net. Get it for free at [developer registration](https://www.circuit.com/web/developers/registration).
* OAuth 2.0 `client_id` and optionally `client_secret`. Get if for free at [circuit.github.com/oauth](https://circuit.github.com/oauth).

## Dependencies

* [express](https://www.npmjs.com/package/express).
* [node-fetch](https://www.npmjs.com/package/node-fetch).
* [simple-oauth2](https://www.npmjs.com/package/simple-oauth2).

## REST Reference
Other examples of RESTful API's with circuit can be found [here](https://circuitsandbox.net/rest/v2/swagger/ui/index.html).

## Usage
1. Clone the respository.
2. Rename `config.json.template` to `config.json` after adding your `client_id`, `client_secret`, `url`, and the `port` the bot wil run on. The `url` field should refer to the return url the webhook should send data to. Once you have done so all you need to do is run `$ npm start` and the bot will begin. The bot will log the most recent items in the conversation, post a new item once it is listening, and then log any new items posted in the conversation.
* Note: The bot must be a part of the conversation it is listening to.