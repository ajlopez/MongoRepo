
var mr = require('..');
var sl = require('simplelists');

var db;
var repo;

exports['open database'] = function (test) {
    test.async();
    
    mr.openDatabase('mongorepo-test', function (err, data) {
        test.ok(!err);
        db = data;
        test.ok(db);
        test.ok(db.close);
        test.equal(typeof db.close, 'function');
        
        test.done();
    });
};

exports['create and clear repository'] = function (test) {
    test.async();
    
    repo = mr.createRepository(db, 'persons');

    test.ok(repo);
    test.equal(typeof repo, 'object');
    
    repo.clear(function (err, data) {
        test.ok(!err);
        test.done();
    })
}

exports['insert documents'] = function (test) {
    test.async();
    
    var adam = { name: "Adam", age: 800 };
    var eve = { name: "Adam", age: 800 }; 
    
    repo.insert([adam, eve], function (err, ids) {
        test.ok(!err);
        test.ok(ids);
        test.ok(Array.isArray(ids));
        test.equal(ids.length, 2);
        test.equal(typeof ids[0], "object");
        test.equal(typeof ids[1], "object");
        test.done();
    })
}

exports['find documents'] = function (test) {
    test.async();
    
    repo.find(function (err, docs) {
        console.log(err);
        test.ok(!err);
        test.ok(docs);
        test.ok(Array.isArray(docs));
        test.equal(docs.length, 2);
        test.equal(typeof docs[0], "object");
        test.equal(typeof docs[1], "object");
        
        sl.exist(docs, { name: "Adam", age: 800 });
        sl.exist(docs, { name: "Eve", age: 700 });
        
        test.done();
    })
}

exports['close database'] = function (test) {
    test.async();
    
    db.close(true, function (err, data) {
        test.ok(!err);
        test.done();
    })
};

