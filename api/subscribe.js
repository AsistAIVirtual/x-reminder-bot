
import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { wallet, twitterUsername, remindInDays, token } = req.body;

  if (!wallet || !twitterUsername || !remindInDays || !token) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    const tweetText = `🔔 Reminder received!\n\n@${twitterUsername} will be notified in ${remindInDays} days for ${token} unlock.\n\nWallet: ${wallet}`;

    await client.v2.tweet(tweetText);

    res.status(200).json({ message: 'Tweet sent successfully!' });
  } catch (error) {
    console.error('Tweet error:', error);
    res.status(500).json({ error: 'Failed to send tweet' });
  }
}
