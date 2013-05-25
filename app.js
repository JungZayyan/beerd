var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , api = require('./routes/api');


console.log();
console.log('Starting application...');

var app = express();

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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/diary', routes.diary);
app.get('/history', routes.history);

app.get('/api/beers', api.beers);


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in mode %s.",
                app.get('port'), app.settings.env);
});
