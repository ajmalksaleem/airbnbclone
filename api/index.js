const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require("image-downloader");
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');

const bcryptsalt = bcrypt.genSaltSync(10);
const jwtsecret = 'hv8edsdhbb8yhcbhdscbsd'

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/Uploads'))  //This line of code essentially tells Express.js to serve static files from the Uploads directory whenever a request comes in for a URL starting with /uploads.

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

                    jwt.sign({ email: userDoc.email, userId: userDoc._id }, jwtsecret, { expiresIn: '36h' }, (err, token) => {
                        if (err) {
                            return res.status(500).json('Internal server error');
                        }

                        res.cookie('token', token, { maxAge: 3600 * 9000, httpOnly: true, secure: true });
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


app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    imageDownloader.image({
        url: link,
        dest: __dirname + '/Uploads/' + newName
    })
        .then((val) => {
            res.json(newName)
            console.log(newName); // saved to /path/to/dest/image.jpg
        })
        .catch((err) => console.error(err + 'this errooooooor'));
});

const photosMiddleware = multer({ dest: 'Uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];                                                    //formore: https://g.co/bard/share/1e97ed6cb45f
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext    // for eg: originalname = shibu.jpg, then we cut it into shibu and jpg and paste that jpg to the img path name,so name will be different
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('Uploads\\', ''));
    }
    res.json(uploadedFiles)
})


app.post('/addplaces', (req, res) => {
    const token = req.cookies.token;
    const { title, address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

    jwt.verify(token, jwtsecret, {}, (err, user) => {
        if (err) throw err

        Place.create({
            owner: user.userId,
            title, address, addedPhotos, description, perks,
            extraInfo, checkIn, checkOut, maxGuests, price
        })
            .then((placeDoc) => {
                res.json(placeDoc);
            })
            .catch((err) => {
                res.json(err);
            })
    });
})

app.get('/user-places', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, jwtsecret, {}, (err, user) => {
        if (err) throw err
        Place.find({ owner: user.userId })
            .then((foundplace) => {
                res.json(foundplace)
            })
            .catch((err) => {
                res.json(err)
            })
    })

})



app.get('/places/:id', (req, res) => {
    const { id } = req.params;
    Place.findById(id)
        .then((placefound) => {
            res.json(placefound);
        }).catch((err) => {
            res.json(err)
        });

});

app.put('/updateplaces', (req, res) => {
    const token = req.cookies.token;
    const { id, title, address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtsecret, {}, (err, user) => {
        if (err) throw err
        Place.findById(id)
            .then((foundplace) => {
                if (foundplace.owner.toString() === user.userId) {
                    foundplace.set({
                        title, address, addedPhotos, description, perks,
                        extraInfo, checkIn, checkOut, maxGuests, price
                    })
                    foundplace.save()
                        .then((result) => {
                            res.json('ok')
                        }).catch((err) => {
                            res.send(err)
                        });

                }
            })
            .catch((err) => {
            });
    })
})

app.get('/places', (req, res) => {
    Place.find()
        .then((foundplaces) => {
            res.json(foundplaces)
        }).catch((err) => {
            res.send(err);
        });
})


app.post('/booking', (req, res) => {
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price
    })
        .then((response) => {
            res.send(response)
        }).catch((err) => {
            res.send(err);
        });
})


app.get('/bookings', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, jwtsecret, {}, (err, user) => {
        if (err) throw err

    })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

