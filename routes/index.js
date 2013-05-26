
/*
 * GET home page.
 */

module.exports = function(app, models) {

    app.get('/', function(req, res) {
        res.redirect('/sign-in');
    });

    app.get('/sign-in', function(req, res) {
        res.render('sign-in', { title: 'Sign in' });
    });

    app.get('/diary', function(req, res) {
        res.render('diary', { title: 'Diary' });
    });

    app.get('/history', function(req, res){
        models.Tasting
            .find()
            .sort({ created: -1 })
            .exec(function(err, tastings) {
                res.render('history', {
                    title: 'History',
                    tastings: tastings
                });
        });
    });

    app.get('/trending', function(req, res){
        models.Tasting.find(function(err, tastings) {
            console.log(tastings);
            res.render('trending', { title: 'Trending', tastings: tastings });
        });
    });
};

