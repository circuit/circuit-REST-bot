Circuit RESTful bot GET | POST | Webhook
==================================
## Decription
This is an example bot that uses RESTful API calls to monitor a conversation on circuit.  The bot will log the most recent items in the conversation, post a new item once it is listening, and then log any new items posted in the conversation.
## Prerequisites
[![NodeJS](https://img.shields.io/badge/Node.js-6.10.2-brightgreen.svg)](https://nodejs.org) <br/>
* Developer account on circuitsandbox.net. Get it for free at [developer registration](https://circuit.github.io/).
* OAuth 2.0 `client_id` and optionally `client_secret`. Get if for free at [circuit.github.com/oauth](https://circuit.github.com/oauth).

## Dependencies

* [express](https://www.npmjs.com/package/express)done

* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)

## REST Reference
Other examples of RESTful API's with circuit can be found [here](https://circuitsandbox.net/rest/v2/swagger/ui/index.html).

## Usage
1. Clone the respository.
2. Run : `$ npm install`.
3. Rename `config.json.template` to `config.json` after adding your `client_id`, `client_secret`, `url`, and the `port` the bot will run on. The `url` field should refer to the return url the webhook should send data to. Once you have done so all you need to do is run `$ npm start` and the bot will begin.
* Note: The bot must be a part of the conversation it is listening to.
4. If you want to host this on your local machine you can use something like [ngrok](https://ngrok.com/) to host the bot. For the webhooks just add the ngrok url as the `url` field in the `config.json` file, make sure you serve the ngrok tunnel on the same port as the bot.