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
  const timeline = await agent.app.bsky.feed.searchPosts({
    q: 'Node.js',
    limit: 5, // 取得件数（デフォルト25、最大100）
  });

  console.log(timeline.data.posts[0]);
  res.render('index', {
    title: 'Bluesky Timeline',
    posts: timeline.data.posts
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});