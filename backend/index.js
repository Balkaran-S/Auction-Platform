const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json())
app.use(cors())

const SECRET_KEY = 'my_super_secret_123!';

mongoose.connect('mongodb://localhost:27017/auctiondb');

const UserScheme = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('users', UserScheme);

const auctionItemSchema = new mongoose.Schema({
    itemImage: String,
    itemName: String,
    description: String,
    currentBid: Number,
    highestBidder: String,
    closingTime: Date,
    isClosed: { type: Boolean, default: false },
});

const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' });
        }

        const hash = await bcrypt.hash(password, 10);
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password : hash });
        await newUser.save();
        console.log(newUser)

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id, username }, SECRET_KEY, { expiresIn: '2h' });
        res.json({ message: 'Signin successful', token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' }); 
    }
});

app.post('/auction', authenticate, async (req, res) => {
    try {
        const { itemName, description, startingBid, closingTime, itemImage } = req.body;

        if (!itemName || !description || !startingBid || !closingTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = new AuctionItem({
            itemName,
            itemImage,
            description,
            currentBid: startingBid,
            highestBidder: "",
            closingTime,
        });

        await newItem.save();
        res.status(201).json({ message: 'Auction item created', item: newItem });
    } catch (error) {
        console.error('Auction Post Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/auctions', async (req, res) => {
    try {
        const auctions = await AuctionItem.find();
        res.json(auctions);
    } catch (error) {
        console.error('Fetching Auctions Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/auctions/:id', async (req, res) => {
    try {
        const auctionItem = await AuctionItem.findById(req.params.id);
        if (!auctionItem)
            return res.status(404).json({ message: 'Auction not found' });

        res.json(auctionItem);
    } catch (error) {
        console.error('Fetching Auction Item Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/bid/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { bid } = req.body;
        const item = await AuctionItem.findById(id);

        if (!item) return res.status(404).json({ message: 'Auction item not found' });
        if (item.isClosed) return res.status(400).json({ message: 'Auction is closed' });

        if (new Date() > new Date(item.closingTime)) {
            item.isClosed = true;
            await item.save();
            return res.json({ message: 'Auction closed', winner: item.highestBidder });
        }

        if (bid > item.currentBid) {
            item.currentBid = bid;
            item.highestBidder = req.user.username;
            await item.save();
            res.json({ message: 'Bid successful', item });
        } else {
            res.status(400).json({ message: 'Bid too low' });
        }
    } catch (error) {
        console.error('Bidding Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
