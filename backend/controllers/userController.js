import asyncHandler from "../middlewares/asyncHandler.js";
import generateJwt from '../utils/generateJwt.js'
import User from '../model/User.js'
import Watchlist from '../model/Watchlist.js'

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


const loginUser = asyncHandler(async (req, res) => {

  const { email, password:inputPassword } = req.body;

  const foundUser = await User.findOne({ email });

  if(foundUser) {

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


const addFilmToWatchlist = asyncHandler(async (req, res) => {

  const imdbId = req.body.imdbId;
  const userId = req.user._id.toString() //comes from checkLogin middleware

  //console.log("Printing post data: ", { imdbId, userId })

  const rec = await Watchlist.create( { user: userId, imdbId } );

  if(!rec) {
    res.status(400)
    throw new Error("Error adding film to watchlist")
  }

  res.status(201).json("Film added to watchlist")

});


const getUserWatchList = asyncHandler( async(req, res) => {

   const userId = req.user._id;

   //distinct method returns array of distinct values without the keys, it can be used on only one field
   const wlist = await Watchlist.distinct("imdbId", { user: userId }).lean() //find({ user: userId}).select({ imdbId: 1, _id: 0 })//excludes user and _id fields; 

   if(!wlist) {
    res.status(400)
    throw new Error("Error retrieving watchlist")
   }

   res.status(201).json(wlist)

})

export { registerUser, 
        loginUser, 
        addFilmToWatchlist, 
        getUserWatchList};