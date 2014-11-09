// check for necessary startup parameters:
var enVars = process.env;

enVars.EXPERTISE_PORT = enVars.EXPERTISE_PORT || '3000';
enVars.EXPERTISE_ENV = enVars.EXPERTISE_ENV || 'development';

if (undefined === (process.env.NODE_ENV = enVars.EXPERTISE_ENV)) throw 'Env var EXPERTISE_ENV is undefined';
if (undefined === enVars.EXPERTISE_PORT) throw 'Env var EXPERTISE_PORT is undefined';

// load framework modules:
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser'); // pull information from html in POST
var http        = require('http');
var path        = require('path');
var morgan      = require('morgan');      // log every request to the console

var passport    = require('passport');

//var flash       = require('connect-flash');
var session     = require('express-session');
var methodOverride = require('method-override'); // simulate DELETE and PUT

exports = module.exports = global.gApp = app;

// load LESS
app.use(require('less-middleware')(path.join(__dirname, '/client')));

// load environment config:
var appConfig = require('./config');
appConfig.print();

global.appConfig = appConfig.get();
global.commons = appConfig.commons;
global.rootDir = __dirname;

// establish database connection:
var db = mongoose.createConnection(global.appConfig.dbUri);
global.dbConnection = db;
mongoose.set('debug', true);


app.dbUser = require('./db/models/userModel')(db);
app.dbMethod = require('./db/models/methodModel')(db);
app.dbExpertise = require('./db/models/expertiseModel')(db);
app.dbMark = require('./db/models/markModel')(db);

// Configure passport (Enable users authentication:)
require('./passport.js')(app, passport);

// configure Express web framework
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/client');

app.set('title', 'Expertise');
app.use(bodyParser({limit: global.commons.bodyParserSizeLimit}));
app.use(express.static(path.join(__dirname, 'client')));

app.use(methodOverride());
//app.use(flash());
app.use(morgan(global.appConfig.logLevel));
app.use(session({ secret: 'my session secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Setup Mailer
var mailer = require('./libs/mailer')(app);

// mount server routes:
require('./routes/resources')(app);
require('./routes/expertises')(app);
require('./routes/auth')(app, passport);


// start main server

app.listen(enVars.EXPERTISE_PORT);
console.log('Server started on port ' + enVars.EXPERTISE_PORT);
