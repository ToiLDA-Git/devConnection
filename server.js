const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./src/config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => { console.log('MongoDB connected') })
  .catch((err) => { console.log(err) });

// passport middleware
app.use(passport.initialize());

// passport config
require('./src/config/passport')(passport);


app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`))