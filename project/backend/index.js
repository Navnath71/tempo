const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../frontend/dist");
app.use(express.static(buildpath));
app.use(
    cors({
        "origin": "*",
    })
    
);

// Define routes after app initialization

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        });
});

// Connect to MongoDB after app initialization
mongoose.connect('mongodb+srv://navnathsangale71:navnath@mern.mejqz2a.mongodb.net/?retryWrites=true&w=majority&appName=mern')
    .then(() => {
        app.listen(3000, () => {
            console.log("Server listening on 3000");
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err.message));
