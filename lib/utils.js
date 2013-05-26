
var requireEnvVariable = function(app, name, def) {
    var value = process.env[name];
    if (typeof value !== 'undefined' && value !== null && value.length > 0)
        return value;
    console.log('Warning: no '+name+' env. variable.');
    if (app.settings.env === 'production') {
        console.log('Fatal: need an explicit ' + name + ' in production.');
        process.exit(1);
    }
    if (typeof def === 'undefined') {
        console.log('Fatal: no default value for ' + name + '.');
        process.exit(1);
    }
    console.log('Using a default value for ' + name + ': \'' + def + '\'.');
    process.env[name] = def;
};

module.exports = {
  requireEnvVariable: requireEnvVariable
};
