var db = require("../index.js");
var crypto = require('crypto');
var DataTypes = require("sequelize");
 
var users_table = db.define('users', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    image_url: DataTypes.STRING,
    last_login: DataTypes.DATE
  }, 
  {
    timestamps: true,
    underscored: true
  }
);

function encPassword(password){
  var shasum = crypto.createHash('sha1');
  shasum.update(password);
  password = shasum.digest('hex');
  return password;
}

var User = function(username, password, email) {
  this.username = username;
  this.password = password;
  this.email = email;
};

//TODO: Check existing Email, Username! No Dupeees
User.prototype.save = function(success, error) {
  this.password = encPassword(this.password);
  users_table.build(this).save().success(success).error(error);
};

//TODO: Password validation
User.find = function(username, password, success, error) {
  password = encPassword(password);

  users_table.find({ 
    where: {
      username: username, 
      password: password
    }, 
    attributes: ['id', 'name', 'username'] 
  })
  .success(success)
  .error(error);
};
 
User.lookupByUsername = function(username, success, error) {
  users_table.find({ 
    where : { username: username }
  })
  .success(success)
  .error(error);
};

User.lookupById = function(id, success, error) {
    users_table.find({ 
      where : { id: id }
    })
    .success(success)
    .error(error);
}
 
module.exports = User;