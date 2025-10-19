import express, { Request, Response } from 'express';
import { BskyAgent } from '@atproto/api';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

const agent = new BskyAgent({
  service: 'https://bsky.social'
})

// root
app.get('/', async (req: Request, res: Response) => {
  await agent.login({
    identifier: process.env.BLUESKY_HANDLE!,
    password: process.env.BLUESKY_PASSWORD!
  });
  const timeline = await agent.getTimeline({ limit: 10 });

  res.render('index', {
    title: 'Bluesky Timeline',
    posts: timeline.data.feed
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});