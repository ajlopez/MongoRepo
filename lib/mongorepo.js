
"use strict"

var mongodb = require('mongodb');
var async = require('simpleasync');

function Repository(db, name) {
    function collection(next) {
        db.collection(name, next);
    }
    
    this.insert = function (item, cb) {
        var isarray = Array.isArray(item);
        async()
        .exec(collection)
        .then(function (coll, next) {
            coll.insert(item, {}, next);
        })
        .then(function (result) {
            if (isarray)
                cb(null, result.insertedIds);
            else
                cb(null, result.insertedIds[0]);
        })
        .error(cb);
    };
    
    this.find = function (query, projection, cb) {
        if (!cb && !projection && typeof query === 'function') {
            cb = query;
            projection = {};
            query = {};
        }

        if (!cb && typeof projection === 'function') {
            cb = projection;
            projection = {};
        }
        
        async()
        .exec(collection)
        .then(function (coll, next) {
            coll.find(query, projection, next)
        })
        .then(function (cursor) {
            cursor.toArray(cb);
        })
        .error(cb);
    }
    
    this.clear = function (cb) {
        async()
        .exec(collection)
        .then(function (coll) {
            coll.remove(cb);
        })
        .error(cb);
    }
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