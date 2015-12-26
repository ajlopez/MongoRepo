
var mr = require('..');
var sl = require('simplelists');

var db;
var repo;

var adamId;
var eveId;

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
    var eve = { name: "Eve", age: 700 }; 
    
    repo.insert([adam, eve], function (err, ids) {
        test.ok(!err);
        test.ok(ids);
        test.ok(Array.isArray(ids));
        test.equal(ids.length, 2);
        test.equal(typeof ids[0], "object");
        test.equal(typeof ids[1], "object");
        
        adamId = ids[0].toString();
        eveId = ids[1].toString();
        
        test.done();
    })
}

exports['remove document by id'] = function (test) {
    test.async();
    
    repo.remove(adamId, function (err, data) {
        test.ok(!err);
        
        repo.find(adamId, function (err, doc) {
            test.ok(!err);
            test.equal(doc, null);
            
            repo.find(eveId, function (err, doc) {
                test.ok(!err);
                test.ok(doc);
                test.equal(doc.name, "Eve");
                
                test.done();
            });
        });
    })
}

exports['remove document by name'] = function (test) {
    test.async();
    
    repo.remove({ name: "Eve" }, function (err, data) {
        test.ok(!err);
        
        repo.find(adamId, function (err, doc) {
            test.ok(!err);
            test.equal(doc, null);
            
            repo.find(eveId, function (err, doc) {
                test.ok(!err);
                test.equal(doc, null);
                
                test.done();
            });
        });
    })
}

exports['close database'] = function (test) {
    test.async();
    
    db.close(true, function (err, data) {
        test.ok(!err);
        test.done();
    })
};

