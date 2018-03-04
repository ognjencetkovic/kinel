var models = require('../models/');
var passwordHash = require('../utilities/passwordHash');

models(function (err, db) {
  if (err) throw err;

  db.drop(function (err) {
    if (err) throw err;

    db.sync(function (err) {
      if (err) throw err;

      var passwordData = passwordHash.saltHashPassword("admin123");
      db.models.user.create({
        firstName: "admin",
        lastName: "",
        email: "admin@company.com",
        password: passwordData.passwordHash,
        salt: passwordData.salt,
        admin: true
      }, function (err, user) {
        if (err) throw err;
        console.log("Users entered!");
      });
      
    });
  });
});
