
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

exports['find documents'] = function (test) {
    test.async();
    
    repo.find(function (err, docs) {
        test.ok(!err);
        test.ok(docs);
        test.ok(Array.isArray(docs));
        test.equal(docs.length, 2);
        test.equal(typeof docs[0], "object");
        test.equal(typeof docs[1], "object");
        
        test.ok(sl.exist(docs, { name: "Adam", age: 800 }));
        test.ok(sl.exist(docs, { name: "Eve", age: 700 }));
        test.ok(sl.all(docs, function (doc) { return doc._id; }));
        
        test.done();
    })
}

exports['find documents by name'] = function (test) {
    test.async();
    
    repo.find({ name: "Adam" }, function (err, docs) {
        test.ok(!err);
        test.ok(docs);
        test.ok(Array.isArray(docs));
        test.equal(docs.length, 1);
        test.equal(typeof docs[0], "object");
        
        test.ok(sl.exist(docs, { name: "Adam", age: 800 }));
        test.ok(!sl.exist(docs, { name: "Eve", age: 700 }));
        test.ok(sl.all(docs, function (doc) { return doc._id; }));
        
        test.done();
    })
}

exports['find one document by name'] = function (test) {
    test.async();
    
    repo.findOne({ name: "Adam" }, function (err, doc) {
        test.ok(!err);
        test.ok(doc);
        test.ok(!Array.isArray(doc));
        test.equal(typeof doc, "object");
        test.equal(doc.name, "Adam");
        test.equal(doc.age, 800);
        test.ok(doc._id);
        
        test.done();
    })
}

exports['find document by id'] = function (test) {
    test.async();
    
    repo.find(adamId, function (err, doc) {
        test.ok(!err);
        test.ok(doc);
        test.ok(!Array.isArray(doc));
        test.equal(typeof doc, "object");
        test.equal(doc.name, "Adam");
        test.equal(doc.age, 800);
        test.ok(doc._id);
        
        test.done();
    })
}

exports['find document by id with projection'] = function (test) {
    test.async();
    
    repo.find(adamId, { name: 1}, function (err, doc) {
        test.ok(!err);
        test.ok(doc);
        test.ok(!Array.isArray(doc));
        test.equal(typeof doc, "object");
        test.equal(doc.name, "Adam");
        test.equal(doc.age, null);
        test.ok(doc._id);
        
        test.done();
    })
}

exports['find documents with projection'] = function (test) {
    test.async();
    
    repo.find({}, { name: 1}, function (err, docs) {
        test.ok(!err);
        test.ok(docs);
        test.ok(Array.isArray(docs));
        test.equal(docs.length, 2);
        test.equal(typeof docs[0], "object");
        test.equal(typeof docs[1], "object");
        
        test.ok(sl.exist(docs, { name: "Adam" }));
        test.ok(sl.exist(docs, { name: "Eve" }));
        test.ok(sl.all(docs, function (doc) { return doc._id; }));
        test.ok(sl.all(docs, function (doc) { return doc.age == null; }));
        
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

