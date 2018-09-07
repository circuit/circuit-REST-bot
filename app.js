const simpleOauth2 = require('simple-oauth2');
const fetch = require('node-fetch');
const config = require('./config.json');
const bodyParser = require('body-parser');
const express = require('express');
const ngrok = require('ngrok');

const app = express();
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

app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Using a WebHook to log new items added to the listened conversation.
app.post('/webhook', (req, res) => {
  const item = req.body && req.body.item;
  if (item && item.convId === convId) {
    let message = '';
    item.text.topic ? message += `Item topic : ${item.text.topic}\n` : message += '';
    item.text.content ? message += `Content: ${item.text.content}`: message += '';
    console.log(message);
  }
});
app.listen(PORT, () => console.log('App listening on: ', PORT));

// Initialize the OAuth2 Library
const oauth2 = simpleOauth2.create(credentials);

(async () => {
  try {
    URL = await ngrok.connect(PORT);
    URL = URL.replace('https', 'http'); // ngrok with npm returns https, but http also works

    const { access_token: token } = await oauth2.clientCredentials.getToken({scope: 'ALL'})
    console.log('Access Token: ', token);

    // clear all previous webhooks created by bot
    try {
      const a = await fetch(`${DOMAIN}/rest/v2/webhooks`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      }).then(res => res.json());
      console.log(a);
    } catch (e) {
      console.log('Threw Error: ', e);
    }
    
    // register a webhook to listen to new items added
    await fetch(`${DOMAIN}/rest/v2/webhooks`, {
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer ' + token
      },
      body: `url=${encodeURI(URL)}%2Fwebhook&filter=CONVERSATION.ADD_ITEM`
    }).then(res => res.json());

    // Using GET to retrieve the most recent items in the conversation
    const items = await fetch(`${DOMAIN}/rest/conversations/${convId}/items`, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.json());
    console.log('Current Items in the conversation: ');
    items.forEach(item => {
      let message = '';
      item.text.topic ? message += `Item topic : ${item.text.topic}\n` : message += '';
      item.text.content ? message += `Content: ${item.text.content}`: message += '';
      console.log(message)
    });

    // Having the bot use POST to send a message to the conversation
    await fetch(`${DOMAIN}/rest/conversations/${convId}/messages`, {
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer ' + token
      },
      body: `content=${encodeURI(`I am listening to the conversation starting now at : ${new Date().toLocaleTimeString()}`)}`
    }).then(res => res.json());

  } catch (err) {
    console.error(err);
  }
})();