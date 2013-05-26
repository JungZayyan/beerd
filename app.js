var express = require('express')
  , utils = require('./lib/utils')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , api = require('./routes/api')
  , db = require('./lib/db');


console.log();
console.log('Starting application...');

var app = express();

//utils.requireEnvVariable app, 'SESSION_SECRET', 'thisisthesecretpassphraseforlocaldev'
utils.requireEnvVariable(app, 'MONGOLAB_URI', 'mongodb://localhost/beerd');
//utils.requireEnvVariable app, 'REDISTOGO_URL'

var models = db(process.env.MONGOLAB_URI)

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.enable('case sensitive routing');
    app.enable('strict routing');
    app.use(express.favicon());
    app.configure('development', function(){
      app.use(express.logger('dev'));
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.locals.pretty = true;
});

routes(app, models);
api(app, models);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in mode %s.",
                app.get('port'), app.settings.env);
});
