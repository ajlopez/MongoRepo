
var mr = require('..');

exports['open database without options'] = function (test) {
    test.async();
    
    mr.openDatabase('mongorepo-test', function (err, db) {
        test.ok(!err);
        test.ok(db);
        test.ok(db.close);
        test.equal(typeof db.close, 'function');
        db.close(true, function (err, data) {
            test.ok(!err);
            test.done();
        });
    });
};

exports['open database with option'] = function (test) {
    test.async();
    
    mr.openDatabase('mongorepo-test', { host: 'localhost', port: 27017 }, function (err, db) {
        test.ok(!err);
        test.ok(db);
        test.ok(db.close);
        test.equal(typeof db.close, 'function');
        db.close(true, function (err, data) {
            test.ok(!err);
            test.done();
        });
    });
};
