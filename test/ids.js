
var mr = require('..');
var ObjectID = require('mongodb').ObjectID;

exports['is id'] = function (test) {
    test.ok(!mr.isId(null));
    test.ok(!mr.isId(42));
    test.ok(!mr.isId("1234"));
    test.ok(mr.isId("567ed333a95ac6241543d2d0"));
    test.ok(mr.isId(ObjectID.createFromHexString("567ed333a95ac6241543d2d0")));
    test.ok(!mr.isId("z67ed333a95ac6241543d2d0"));
};

exports['string to id'] = function (test) {
    var id = mr.toId("567ed333a95ac6241543d2d0");
    
    test.equal(typeof id, 'object');
    test.ok(mr.isId(id));
};

exports['id to id'] = function (test) {
    var id = mr.toId("567ed333a95ac6241543d2d0");
    var id2 = mr.toId(id);
    
    test.strictEqual(id2, id);
};