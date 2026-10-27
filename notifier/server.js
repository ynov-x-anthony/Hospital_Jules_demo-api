'use strict';

const express = require('express');

const PORT = Number(process.env.PORT || 3001);
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.post('/notify', (req, res) => {
  console.log(JSON.stringify({
    level: 'info',
    msg: 'notification received',
    body: JSON.stringify(req.body),
  }));
  res.status(202).json({ accepted: true });
});

app.listen(PORT, () => {
  console.log(JSON.stringify({ level: 'info', msg: 'notifier started', port: PORT }));
});
