
var mongodb = require('mongodb');

function Repository(db, name) {
}

function createRepository(db, name) {
    return new Repository(db, name);
}

function openDatabase(dbname, options, cb) {
    if (!cb && typeof options === 'function') {
        cb = options;
        options = null;
    }
    
    options = options || {};
    
    if (!options.host)
        options.host = 'localhost';
        
    if (!options.port)
        options.port = 27017;
        
    var db = new mongodb.Db(dbname, new mongodb.Server(options.host, options.port, { auto_reconnect: true }, {}), { safe: true  });
    db.open(cb); 
}

module.exports = {
    openDatabase: openDatabase,
    createRepository: createRepository
}