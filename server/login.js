import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();

const port  = 3000;

app.use(express.json());

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/login', (req, res) => {
    res.render('index.html');
});
