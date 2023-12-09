const express = require('express')
const app = express()
const cors = require('cors');
const config = require('./config');
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const bcryptsalt = bcrypt.genSaltSync(10);
const jwtsecret = 'hv8edsdhbb8yhcbhdscbsd'

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));



app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const userDoc = User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptsalt),
    })
        .then((val) => {
            res.json(userDoc);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((userDoc) => {
            if (!userDoc) {
                return res.status(422).json('User not found');
            }

            bcrypt.compare(password, userDoc.password)
                .then((passOk) => {
                    if (!passOk) {
                        return res.status(422).json('Incorrect password');
                    }

                    jwt.sign({ email: userDoc.email, userId: userDoc._id }, jwtsecret, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            return res.status(500).json('Internal server error');
                        }

                        res.cookie('token', token, { maxAge: 3600 * 1000, httpOnly: true, secure: true });
                        res.json(userDoc);
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json('Internal server error');
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json('Internal server error');
        });
});


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const userDoc = User.findOne({ email })
//         .then((userDoc) => {
//             if (userDoc) {
//                 const passOk = bcrypt.compareSync(password, userDoc.password)
//                 if (passOk) {
//                     jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtsecret, {}, (err, token) => {
//                         if (err) { return res.status(500).json('Internal server error' + err); }
//                         res.cookie('token', token)
//                         res.json({ message: 'Login successful' });
//                     })

//                 } else {
//                     res.status(422).json('password not correct')
//                 }

//             }
//             else {
//                 res.status(422).json('user not found')
//             }
//         })
//         .catch((err) => {
//             res.status(422).json(err);
//         })
// })

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, jwtsecret, {}, (err, user) => {
            if (err) throw err

            User.findById(user.userId)
                .then((userinfo) => {
                    const { name, email, _id } = userinfo
                    res.json({ name, email, _id });
                })
                .catch((err) => {
                    console.error(err + 'entha aaara');
                })
        });
    } else {
        res.json(null)
    }
})




mongoose.connect(config.MONGO_URL)
    .then((val) => {
        console.log('database connected successfully');
        app.listen(config.PORT, () => {
            console.log('server start running');
        })

    })
    .catch((err) => {
        console.log(err + 'some errorr in connecting database');
    });

