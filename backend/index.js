const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const mySecretKey = "someSecretKey";


function checkToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ msg: "Token not found" });
    }

    token = token.split(" ")[1]; 
    try {
        const decoded = jwt.verify(token, mySecretKey);
        req.userInfo = decoded;
        next();
    } catch (e) {
        res.status(401).json({ msg: "Token invalid" });
    }
}

const studentModel = mongoose.model("Student", new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
}));

const staffModel = mongoose.model("Staff", new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
}));

const noticeModel = mongoose.model("Notice", new mongoose.Schema({
    title: String,
    description: String,
    branch: [String],
    announcer: String
}));

app.get("/notices", checkToken, async (req, res) => {
    const allNotices = await noticeModel.find();
    res.json(allNotices);
});

app.get("/notices/:branch", checkToken, async (req, res) => {
    const branchName = req.params.branch;
    const notices = await noticeModel.find({ branch: branchName });
    res.json(notices);
});

app.post("/notices/add", checkToken, async (req, res) => {
    console.log("Adding notice...");
    await noticeModel.create(req.body);
    res.json("Notice Added");
});

app.post("/student/register", async (req, res) => {
    await studentModel.create(req.body);
    res.json("Student registered!");
});

app.post("/staff/register", async (req, res) => {
    await staffModel.create(req.body);
    res.json("Staff registered!");
});

app.post("/student/login", async (req, res) => {
    const data = req.body;
    const student = await studentModel.findOne({ id: data.id, password: data.password });
    if (student) {
        const token = jwt.sign({ id: student.id, role: "student" }, mySecretKey, { expiresIn: "1h" });
        res.json({ token: token });
    } else {
        res.status(404).json("Student not found");
    }
});

app.post("/staff/login", async (req, res) => {
    const data = req.body;
    const staff = await staffModel.findOne({ id: data.id, password: data.password });
    if (staff) {
        const token = jwt.sign({ id: staff.id, role: "staff" }, mySecretKey, { expiresIn: "1h" });
        res.json({ token: token });
        console.log("Token:", token);
    } else {
        res.status(404).json("Staff not found");
    }
});

app.listen(5000, async () => {
    console.log("Server is running on port 5000");
    mongoose.connect("mongodb://localhost:27017/noticeboard")
      .then(() => {
        console.log(" Database connected");
      })
      .catch((err) => {
        console.error(" Error connecting to DB:", err.message);
      });
  });
  
