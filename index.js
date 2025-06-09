require('dotenv').config();
const express = require('express');
const Twit = require('twit');
const app = express();
app.use(express.json());

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.post('/api/subscribe', (req, res) => {
  const { wallet, twitterUsername, remindInDays, token } = req.body;
  if (!wallet || !twitterUsername || !remindInDays || !token) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const tweetNow = `@${twitterUsername} Reminder registered! We'll notify you in ${remindInDays} days for ${token}.`;
  T.post('statuses/update', { status: tweetNow }, err => {
    if (err) return res.status(500).json({ error: 'Tweet error' });

    const ms = remindInDays * 24 * 60 * 60 * 1000;
    setTimeout(() => {
      const reminderTweet = `@${twitterUsername} Reminder: It’s time to unlock ${token} as planned!`;
      T.post('statuses/update', { status: reminderTweet }, console.error);
    }, ms);

    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
