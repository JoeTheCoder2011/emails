const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailService = require('./emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await emailService.sendMail(to, subject, body);
    res.json({ status: 'sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/send-attachment', async (req, res) => {
  const { to, subject, body, attachment } = req.body;
  try {
    await emailService.sendMail(to, subject, body, attachment);
    res.json({ status: 'sent with attachment' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email with attachment' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});
