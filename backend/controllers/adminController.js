import Review from '../model/Review.js'
import User from '../model/User.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const getUserList = asyncHandler( async ( req, res ) => {
    let userReviews = null
    try 
    {    
        const page = req.params.page; 
        const pageItems = process.env.PAGE_TABLE_ITEMS;

         //.skip(offset).limit(limit);
         const offset = (page - 1) * pageItems
         let users = await User.find({}).skip(offset).limit(pageItems).select({password:0}).lean() //exclude password field
         const totalNumber = await User.estimatedDocumentCount().lean();
         
         console.log("Printing user object: ", users)
         res.status(201).json({users, totalNumber, pageItems})
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