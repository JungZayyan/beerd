
var requireEnvVariable = function(app, name, def) {
    var value = process.env[name];
    if (typeof value !== 'undefined' && value !== null)
        return value;
    console.log('warning: no '+name+' env. variable');
    if (app.settings.env === 'production') {
        console.log('fatal: need an explicit ' + name + ' in production');
        process.exit(1);
    }
    if (typeof def === 'undefined') return;
    console.log('using a default value for ' + name + ': ' + def);
    process.env[name] = def;
};

module.exports = {
  requireEnvVariable: requireEnvVariable
};
