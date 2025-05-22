const axios = require('axios');

async function sendToSlack(message) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: message,
  });
}

module.exports = { sendToSlack };
make a description for this code in paragraph

