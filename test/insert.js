
var mr = require('..');

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

exports['create repository'] = function (test) {
    repo = mr.createRepository(db, 'persons');

    test.ok(repo);
    test.equal(typeof repo, 'object');
}

exports['insert document'] = function (test) {
    test.async();
    
    var adam = { name: "Adam", age: 800 };
    
    repo.insert(adam, function (err, id) {
        test.ok(!err);
        test.ok(id);
        test.ok(!Array.isArray(id));
        test.equal(typeof id, "object");
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

