const user_model = require('../models/user_model.js');
const ErrorHandler = require('../modules/error_handler/error_handler.js');


class UserService
{
  register(username, email, password, done){
    //console.log(`Register data: {username: ${username}, email: ${email}, password: ${password}}`);
    user_model.exists({email: email}, (err, doc) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Error: register error!"));
      }
      else if(doc)
        return done(new ErrorHandler(409, "Error: This email exists!"));
      else{
        user_model.exists({username: username}, (err1, doc1) => {
          if(err1){
            console.log(err1);
            return done(new ErrorHandler(500, "Error: register1 error!"));
          }
          else if(doc1)
            return done(new ErrorHandler(409, "Error: This username exists!"));
          else{
            user_model.create({ username: username, email: email, authkeys: { password: password }, date: new Date }, (error, new_user) => {
              if(error) {
                console.log(error);
                return done(new ErrorHandler(500, "Error: Server didn't register account!"));
              }
              else{
                //console.log("Successful saving account!");
                done(null, new_user);
              }
            });
          }
        });
      }
    });
  }

  login(condition, password, done){
    user_model.findOne(condition, (err, user) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Error: login error!"));
      }
      else if(!user){
        console.log("Error: User not found!");
        return done(new ErrorHandler(403, "Error: User not found!"));
      }
      else{
        user.compareUserPassword(password, function (match_error, is_match) {
          if (match_error) {
            console.log(match_error);
            return done(new ErrorHandler(500, "Error: match_error!"));
          } 
          else if(!is_match) {
            console.log("Incorrect password!");
            return done(new ErrorHandler(403, "Error: Incorrect password!"));
          } 
          else{
            //console.log("Successful login!");
            done(null, user);
          }
        });
      }
    });
  }
  getUserByUsername(username, done){
    user_model.findOne({username: username}, (err, user) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Error: login error!"));
      }
      else if(!user){
        console.log("Error: User not found!");
        return done(new ErrorHandler(403, "Error: User not found!"));
      }
      else{
        let user_data = user.toObject();
        delete user_data._id;
        delete user_data.authkeys;
        delete user_data.__v;
        done(null, user_data);
      }
    });
  }
}

module.exports = new UserService();