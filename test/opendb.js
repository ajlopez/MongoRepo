
var mr = require('..');

exports['open database without options'] = function (test) {
    test.async();
    
    mr.openDatabase('mongorepo-test', function (err, db) {
        test.ok(!err);
        test.ok(db);
        test.ok(db.close);
        test.equal(typeof db.close, 'function');
        db.close();
        
        test.done();
    });
};

exports['open database with option'] = function (test) {
    test.async();
    
    mr.openDatabase('mongorepo-test', function (err, db) {
        test.ok(!err);
        test.ok(db);
        test.ok(db.close);
        test.equal(typeof db.close, 'function');
        db.close();
        
        test.done();
    });
};
