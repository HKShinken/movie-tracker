import asyncHandler from './asyncHandler.js'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'


const checkLogin = asyncHandler ( async (req, res, next) => {

   // read the JWT from the cookie
   let tokenJwt = req.cookies.jwt;

   if (tokenJwt) {

        try{
            const decodedInfo = jwt.verify(tokenJwt, process.env.JSON_WEB_SECRET)
            //console.log("stampo jwt decoded: ", tokenJwt, decodedInfo.data._id)
            
            next(); // go to next middleware
            // after a next() is not possible to set headers

        } catch(err) {
            console.log(err);
            res.status(401);
            throw new Error("Not authorized, token failure");
        }

   } else {
         res.status(401);
         throw new Error("Not authorized, no token");
   }
})


export {checkLogin}