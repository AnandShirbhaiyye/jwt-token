import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;

const verifyJwttoken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const decoded = jwt.verify(token, process.env.SECREAT_KEYS );
    if (decoded.isAdmin) {
      next();
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

app.post("/login", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign(
    { email: email, isAdmin: true },
    process.env.SECREAT_KEYS,
    { expiresIn: "1min" }
  );

  res.json({
    success: true,
    data: {
      email: email,
      jwt_token: token,
    },
    message: "login successfully...",
  });
});

app.post('/deletecourse',verifyJwttoken, (req, res)=>{
    res.json({
        success: true,
        message: 'course deleted successfully...'
    })
  })

app.listen(PORT, () => {
  console.log(`Server running on port number = ${PORT}`);
});
