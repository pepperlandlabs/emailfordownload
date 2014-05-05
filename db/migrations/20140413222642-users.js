var dbm = require('db-migrate');
var type = dbm.dataType;
 
exports.up = function(db, callback) {
    db.createTable('users', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        location: 'string',
        username: 'string',
        password: 'string',
        email: 'string',
        image_url: 'string',
        last_login: 'datetime',
        created_at: 'datetime',
        updated_at: 'datetime'
      }, callback);
};
 
exports.down = function(db, callback) {
    db.dropTable('users', callback);
};