
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.diary = function(req, res){
  res.render('diary', { title: 'Diary' });
};
