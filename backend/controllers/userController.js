import asyncHandler from "../middlewares/asyncHandler.js";
import generateJwt from '../utils/generateJwt.js'
import User from '../model/User.js'
import Watchlist from '../model/Watchlist.js'
import Review from '../model/Review.js'

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
  const poster = req.body.poster;
  const title = req.body.title;
  const year = req.body.year;
  const userId = req.user._id.toString() //comes from checkLogin middleware

  //console.log("Printing post data: ", { imdbId, userId })

  const rec = await Watchlist.create( { user: userId, imdbId, poster, title, year } );

  if(!rec) {
    res.status(400)
    throw new Error("Error adding film to watchlist")
  }

  res.status(201).json("Film added to watchlist")

});  


const delFilmFromWatchlist = asyncHandler(async (req, res) => {

  const imdbId = req.body.imdbId;
  const userId = req.user._id.toString() //comes from checkLogin middleware

  //console.log("Printing post data: ", { imdbId, userId })

  const rec = await Watchlist.deleteMany( { user: userId, imdbId } );

  if(!rec) {
    res.status(400)
    throw new Error("Error deleting film to watchlist")
  }

  res.status(201).json("Film deleted from watchlist")

});


const getUserWatchList = asyncHandler( async(req, res) => {

   const userId = req.user._id;

   //distinct method returns array of distinct values without the keys, it can be used on only one field
   //const wlist = await Watchlist.distinct("imdbId", { user: userId }).lean() //find({ user: userId}).select({ imdbId: 1, _id: 0 })//excludes user and _id fields; 
   const wlist = await Watchlist.find({ user: userId }).select({ _id: 0, user: 0, __v: 0 }).lean() //excludes user and _id fields;

    // get also reviews for the user
   const reviews = await Review.find({ user: userId }).select({ _id: 0, user: 0, __v: 0 }) //excludes user and _id fields;

    // gets average rating for each film reviewd
  const avgRating = await Review.aggregate([
        //{ $match: { user: userId } },
        {
          $group: {
            _id: "$imdbId",
            value: { $avg: { $toInt: "$rate" } },   
            numReviews: {  $sum: 1 }
          }
        }
    ]); // lean() not needed for aggregations

    //console.log("printing avgRating: ", avgRating)
   if(!wlist) {
       res.status(400)
       throw new Error("Error retrieving watchlist")
   }

   res.status(201).json({ wlist, reviews, avgRating })

})

const addReviewFilm = asyncHandler(async (req, res) => {

  const imdbId = req.body.imdbId; 
  const userId = req.user._id.toString() //comes from checkLogin middleware
  const rate = req.body.rate;
  const watched = req.body.watched;
  const review = req.body.review;

  //console.log("Printing post data: ", { imdbId, userId })
  const isReviewed = await Review.findOne( { user: userId, imdbId } );
  let rec = null;

  if(isReviewed) {
    isReviewed.rate = rate;
    isReviewed.review = review;
    isReviewed.watched = watched;
    rec = await isReviewed.save();  
  }
  else {
          console.log("printing post data: ", { imdbId, userId, rate, watched, review })
          rec = await Review.create( { user: userId, imdbId, rate, watched, review } );
  }

  if(!rec) {
    res.status(400)
    throw new Error("Error adding film review")
  }

  res.status(201).json("Review added successfully")

});

const getFilmReviews = asyncHandler(async (req, res) => {

  const imdbId = req.body.imdbId; 
  const userId = req.user._id.toString() //comes from checkLogin middleware
  const rank = req.body.rank;
  const watched = req.body.watched;
  const review = req.body.review;

  //console.log("Printing post data: ", { imdbId, userId })

  const rec = await Review.save( { user: userId, imdbId, rank, review } );

  if(!rec) {
    res.status(400)
    throw new Error("Error adding film review")
  }

  res.status(201).json("Review added successfully")

});

export { registerUser, 
        loginUser, 
        addFilmToWatchlist, 
        getUserWatchList,
        delFilmFromWatchlist,
        addReviewFilm,
        getFilmReviews};