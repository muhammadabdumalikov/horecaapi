const axios = require('axios');

const sendSmsTo = async (receiver, message_key, genNumber) => {
  const postData = {
    messages: [
      {
        recipient: `${receiver}`,
        'message-id': `${message_key}`,
        sms: {
          originator: '3700',
          content: {
            text: `HORECA: Sizning verifikatsiya kodingiz: ${genNumber} \n\n ${message_key}`,
          },
        },
      },
    ],
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: process.env.SMS_BASIC_TOKEN,
    },
  };

  axios
    .post('https://send.smsxabar.uz/broker-api/send', postData, axiosConfig)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      new Error(error);
      console.log('ERROR: ', error);
    });
};

module.exports.sendSmsTo = sendSmsTo;
