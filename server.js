const express = require('express')
const path = require('path');
const exphbs  = require('express-handlebars');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();


require('dotenv').config()

// View engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Logger
app.use(morgan('dev'));

// Middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(expressValidator());

// Public Path
app.locals.publicpath = path.join(__dirname, 'public');
app.use(express.static(app.locals.publicpath));

// Routes
app.use('/', require('./routes/web'));

app.listen(process.env.SERVER_PORT, () => console.log(`Server is listening on port ${process.env.SERVER_PORT}!`));
