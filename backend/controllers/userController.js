import asyncHandler from "../middlewares/asyncHandler.js";
import generateJwt from '../utils/generateJwt.js'
import User from '../model/User.js'

// @desc register user & get token
// @route POST /api/users/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {

  const { name, surname, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if( existingUser )
  {
     res.status(400)
     throw new Error("User Already exists");
  }
  else 
  {    // creates and save the new instance of User -> new User({ name, surname, email})
      const user = await User.create({ name, surname, email, password });
      if(user) {
          generateJwt(res, { username: email, 
                               name, 
                               userId: user._id
                              })

          res.status(201).json({"message":"User '" + name + "' Registered successfully"});
      }
      else
      {
          res.status(400)
          throw new Error("Invalid user data");
      }
  }

});


const loginUser = asyncHandler(async (req, res, next) => {

  const { email, password:inputPassword } = req.body;

  const foundUser = await User.findOne({ email });

  if(foundUser){

      const matchPwd = await foundUser.matchPassword(inputPassword)

      if( matchPwd === true )
      {
            generateJwt(res, { _id: foundUser._id, email: foundUser.email, })
            console.log("Authenticated")
            
            res.status(200).json({_id: foundUser._id,
                                  name: foundUser.name,
                                  email: foundUser.email,
                                  isAdmin: foundUser.isAdmin,});
      }
      else{
            res.status(401);
            throw new Error("Login errato, credenziali sbagliate" );
      }

  } else {
     res.status(401);
            throw new Error("Login errato, credenziali sbagliate" );
  }
  
});

export { registerUser, loginUser };