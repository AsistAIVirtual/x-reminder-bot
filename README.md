# x-reminder-bot

This Node.js Twitter bot receives reminder requests and posts a tweet immediately, and another on the scheduled day.

## How to Run

1. Install dependencies:

```
npm install
```

2. Fill in `.env` with your Twitter API keys (already included here).

3. Start the server:

```
npm start
```

4. Send a POST request to `/api/subscribe` with JSON body like:

```json
{
  "wallet": "0xABC123...",
  "twitterUsername": "elonmusk",
  "remindInDays": 3,
  "token": "$JARVIS"
}
```

## Deploy to Vercel

- Use `vercel` CLI or GitHub → Vercel integration.
