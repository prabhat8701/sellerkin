const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/subscribe" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <button type="submit">Subscribe</button>
    </form>
  `);
});

app.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;

  try {
    const response = await axios.post('https://api.brevo.io/v1/sendEmail', {
      from: 'prabhat8701.ps@gmail.com',
      to: email,
      subject: 'Thanks for Subscribing',
      text: `Hello ${name}, Thanks for subscribing!`,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'xsmtpsib-645beb0a7a47ff331512e2d221e069073843b490e7a32e7bcdcca7349fefeebb-Tbh59DzQdMYXa7tZ',
      },
    });

    if (response.status === 200) {
      res.send('Email sent successfully!');
    } else {
      res.send('Failed to send email. Please try again.');
    }
  } catch (error) {
    console.error(error);
    res.send('Failed to send email. Please try again.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
