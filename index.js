const venom = require('venom-bot');
const express = require('express');
const app = express();
app.use(express.json());

venom
  .create({
    session: 'whatsapp-bot', //nome da sessão
    multidevice: true // Habilita suporte multi-dispositivos
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  app.post('/send-message', (req, res) => {
    const { number, message } = req.body;
    client
      .sendText(number + '@c.us', message)
      .then((result) => {
        res.send(result);
      })
      .catch((erro) => {
        res.send(erro);
      });
  });

  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Hello! How can I help you?')
        .then((result) => {
          console.log('Result: ', result); //retorno do objeto de sucesso
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //retorno do erro
        });
    }
  });
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
