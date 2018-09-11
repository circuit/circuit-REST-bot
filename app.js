'use strict';
const simpleOauth2 = require('simple-oauth2');
const fetch = require('node-fetch');
const config = require('./config.json');
const express = require('express');

const app = express();
app.use(express.json());

const URL = config.url;
const DOMAIN = config.bot.domain;
const PORT = config.port;
const convId = config.convId;
const credentials = {
  client: {
    id: config.bot.client_id,
    secret: config.bot.client_secret
  },
  auth: {
    tokenHost: DOMAIN
  }
};

function printMessage(item) {
  let message = '';
  item.text.topic ? message += `Item topic : ${item.text.topic}\n` : message += '';
  item.text.content ? message += `Content: ${item.text.content}`: message += '';
  console.log(message);
}
// Initialize the OAuth2 Library
const oauth2 = simpleOauth2.create(credentials);

// Using a WebHook to log new items added to the listened conversation.
app.post('/webhook', (req, res) => {
  const item = req.body && req.body.item;
  if (item && item.convId === convId) {
    printMessage(item);
  }
});
app.listen(PORT, () => console.log('App listening on: ', PORT));

(async () => {
  try {
    const { access_token: token } = await oauth2.clientCredentials.getToken({scope: 'ALL'})
    console.log('Access Token: ', token);

    // clear all previous webhooks created by bot
    await fetch(`${DOMAIN}/rest/v2/webhooks`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // register a webhook to listen to new items added
    await fetch(`${DOMAIN}/rest/v2/webhooks`, {
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer ' + token
      },
      body: `url=${encodeURI(`${URL}/webhook`)}&filter=CONVERSATION.ADD_ITEM`
    });

    // Using GET to retrieve the most recent items in the conversation
    const res = await fetch(`${DOMAIN}/rest/conversations/${convId}/items`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const items = await res.json();
    console.log('Current Items in the conversation: ');
    items.forEach(printMessage);

    // Having the bot use POST to send a message to the conversation
    await fetch(`${DOMAIN}/rest/conversations/${convId}/messages`, {
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer ' + token
      },
      body: `content=${encodeURI(`I am listening to the conversation starting now at : ${new Date().toLocaleTimeString()}`)}`
    });
  } catch (err) {
    console.error(err);
  }
})();