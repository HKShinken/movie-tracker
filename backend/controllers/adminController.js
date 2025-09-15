import Review from '../model/Review.js'
import User from '../model/User.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const getUserList = asyncHandler( async ( req, res ) => {
    let userReviews = null
    try 
    {
         const users = await User.find({}).select({password:0}).lean() //exclude password field
         for ( const u of users ){
            userReviews = await Review.find({ user: u._id }).lean()
            u.numReviews = userReviews.length
         }
         
         res.status(201).json(users)
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message);
    }

})


export { getUserList }