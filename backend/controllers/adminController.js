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
         //console.log("Printing user object: ", users)
         res.status(201).json(users)
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message);
    }

})



const modifyUser = asyncHandler( async (req,res) => {

    const {_id, name, surname, email, isAdmin} = req.body

    const userMod = await User.findById(_id).select({password:0})
     if(userMod)
     {
        userMod.name = name;
        userMod.surname = surname;
        userMod.email = email;
        userMod.isAdmin = isAdmin;
        console.log("Stampo l'utente trovato: ", userMod )

        try{
             await userMod.save();
             res.status(201).json({message:"User modified"})
        }
        catch(error)
        {
            res.status(500);
            console.log(error.message)
            throw new Error(error.message);
        }
     }
     else
     {
        res.status(401);
        throw new Error("User not found for modification");
     }


})


export { getUserList, modifyUser }