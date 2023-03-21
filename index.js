import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;


app.post('/login', async (req, res) => {

    const {email} = req.body;
    const token = jwt.sign({email: email, isAdmin: true}, process.env.SECREAT_KEYS, {expiresIn: "1min"});

    res.json({
        success: true,
        data: {
            email: email,
            jwt_token: token
        },
        message: "Login  Successfully..."
    })
})


app.listen(PORT, () => {
    console.log(`Server running on port number = ${PORT}`)
})