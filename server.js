import express from 'express';
import cors from 'cors';

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Example route for the root URL '/'
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Download API');
});

// Route to handle downloading "The Penguin Season 01"
app.get('/download/penguin', (req, res) => {
    res.json({
        success: true,
        message: 'Download link for The Penguin Season 01',
        downloadUrl: 'https://world4ufree.contact/download-the-penguin-season-01-dual-audio-hindi-english/'
    });
});
app.get('/download/wild-robot', (req, res) => {
    res.json({
        success: true,
        message: 'Download link for The Wild Robot',
        downloadUrl: 'https://world4ufree.contact/the-wild-robot-2024-hindi-dubbed/'
    });
});

// Set server to listen on port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
