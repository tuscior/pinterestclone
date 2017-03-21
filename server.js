const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT;
const home = require('./routes/home');
const app = express();
const path = require('path');
const config = require('./config/config');
const database = 'mongodb://tuscior:tuscior@ds137230.mlab.com:37230/pinterest';
const passport = require('passport');
require('./config/passport')(passport);
const router = require('./router');
const session = require('express-session');
mongoose.connect(database);
mongoose.connection.once('open', () => {
	console.log('Connected to database');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
secret: "pinterest",
resave: false,
saveUniintialized: true	
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan());

router(app);

app.listen(port, () => {
	console.log('server listening on', port);
});
