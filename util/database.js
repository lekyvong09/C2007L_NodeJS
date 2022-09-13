const mongodb = require('mongodb');

let _mongoConnectionPool;

const mongoConnect = (callback) => {
    mongodb.MongoClient.connect('mongodb+srv://root:ab123456..@cluster0.pgeminn.mongodb.net/c2007_nodejs?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        _mongoConnectionPool = client.db();
        callback(); /// app.listen(3001);
    })
    .catch(err => console.log(err));
}

const getDb = () => {
    if (_mongoConnectionPool) {
        return _mongoConnectionPool;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;