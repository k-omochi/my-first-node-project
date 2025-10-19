"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("@atproto/api");
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
const agent = new api_1.BskyAgent({
    service: 'https://bsky.social'
});
// root
app.get('/', async (req, res) => {
    await agent.login({
        identifier: process.env.BLUESKY_HANDLE,
        password: process.env.BLUESKY_PASSWORD
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
//# sourceMappingURL=server.js.map