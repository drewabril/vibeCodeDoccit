import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import subredditRoutes from './routes/subredditRoutes';
import config from './config';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { marked } from 'marked';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Markdown config: enable GitHub Flavored Markdown
marked.setOptions({ gfm: true, breaks: true });

// File uploads
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Sessions (in-memory for simplicity)
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_session_secret',
    resave: false,
    saveUninitialized: false,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subreddits', subredditRoutes);

// Simple web pages
app.get('/', (req, res) => {
    res.render('index', { title: 'Doccit', message: 'Welcome to Doccit', user: (req as any).session?.user });
});

app.get('/subreddits', async (req, res) => {
    try {
        const Subreddit = (await import('./models/Subreddit')).default;
        const subs = await Subreddit.find().lean();
        res.render('subreddits', { subreddits: subs, user: (req as any).session?.user });
    } catch (e) {
        res.status(500).send('Error loading subreddits');
    }
});

// Subreddit detail and create post
app.get('/subreddits/:id', async (req, res) => {
    try {
        const [Subreddit, Post] = [
            (await import('./models/Subreddit')).default,
            (await import('./models/Post')).default,
        ];
        const subreddit = await Subreddit.findById(req.params.id).lean();
        if (!subreddit) return res.status(404).send('Subreddit not found');
        const postsRaw = await Post.find({ subreddit: subreddit._id }).lean();
        const posts = postsRaw.map((p: any) => ({ ...p, contentHtml: marked.parse(p.content || '') }));
        res.render('subreddit_detail', { subreddit, posts, user: (req as any).session?.user, error: null, success: null });
    } catch (e) {
        res.status(500).send('Error loading subreddit');
    }
});

app.post('/subreddits/:id/posts', upload.single('image'), async (req, res) => {
    if (!(req as any).session?.user) return res.redirect('/login');
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            const Subreddit = (await import('./models/Subreddit')).default;
            const subreddit = await Subreddit.findById(req.params.id).lean();
            return res.status(400).render('subreddit_detail', { subreddit, posts: [], user: (req as any).session?.user, error: 'Title and content required', success: null });
        }
        const [Subreddit, Post] = [
            (await import('./models/Subreddit')).default,
            (await import('./models/Post')).default,
        ];
        const subreddit = await Subreddit.findById(req.params.id);
        if (!subreddit) return res.status(404).send('Subreddit not found');
        const owner = (req as any).session.user.id;
        let finalContent = content;
        if (req.file) {
            const imageUrl = `/uploads/${req.file.filename}`;
            finalContent += `\n\n![uploaded image](${imageUrl})`;
        }
        const post = new Post({ title, content: finalContent, subreddit: subreddit._id, owner });
        await post.save();
        const postsRaw = await Post.find({ subreddit: subreddit._id }).lean();
        const posts = postsRaw.map((p: any) => ({ ...p, contentHtml: marked.parse(p.content || '') }));
        return res.render('subreddit_detail', { subreddit: subreddit.toObject(), posts, user: (req as any).session?.user, error: null, success: 'Post created' });
    } catch (e) {
        return res.status(500).send('Failed to create post');
    }
});

// Register user (simplified)
app.get('/register', (req, res) => {
    res.render('register', { error: null, success: null });
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).render('register', { error: 'All fields are required', success: null });
        }
        const User = (await import('./models/User')).default;
        const exists = await User.findOne({ $or: [{ username }, { email }] });
        if (exists) {
            return res.status(400).render('register', { error: 'Username or email already exists', success: null });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hash });
        await user.save();
        return res.render('register', { error: null, success: 'User registered successfully' });
    } catch (e) {
        return res.status(500).render('register', { error: 'Registration failed', success: null });
    }
});

// Auth: login/logout
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const User = (await import('./models/User')).default;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).render('login', { error: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).render('login', { error: 'Invalid credentials' });
        (req as any).session.user = { id: user._id.toString(), username: user.username };
        res.redirect('/');
    } catch (e) {
        return res.status(500).render('login', { error: 'Login failed' });
    }
});

app.post('/logout', (req, res) => {
    (req as any).session.destroy(() => {
        res.redirect('/');
    });
});

// Create subreddit (requires login)
app.get('/subreddits/new', (req, res) => {
    if (!(req as any).session?.user) return res.redirect('/login');
    res.render('subreddit_new', { error: null, success: null });
});

app.post('/subreddits', async (req, res) => {
    if (!(req as any).session?.user) return res.redirect('/login');
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).render('subreddit_new', { error: 'Name is required', success: null });
        }
        const Subreddit = (await import('./models/Subreddit')).default;
        const exists = await Subreddit.findOne({ name });
        if (exists) {
            return res.status(400).render('subreddit_new', { error: 'Subreddit name already exists', success: null });
        }
        const owner = (req as any).session.user.id;
        const sub = new Subreddit({ name, description, owner });
        await sub.save();
        return res.render('subreddit_new', { error: null, success: 'Subreddit created successfully' });
    } catch (e) {
        return res.status(500).render('subreddit_new', { error: 'Failed to create subreddit', success: null });
    }
});

// Database connection
mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });