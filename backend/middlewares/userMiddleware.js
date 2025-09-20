import asyncHandler from './asyncHandler.js'
import jwt from 'jsonwebtoken';
import User from '../model/User.js'


const checkLogin = asyncHandler ( async (req, res, next) => {

   // read the JWT from the cookie
   let tokenJwt = req.cookies.jwt;

   if (tokenJwt) {

        try{
            const decodedInfo = jwt.verify(tokenJwt, process.env.JSON_WEB_SECRET)
            //console.log("stampo jwt decoded: ", tokenJwt, decodedInfo.data._id)
            req.user = await User.findById(decodedInfo.data._id).select("-password"); //excludes password field
            
            next(); // go to next middleware, after a next() is not possible to set headers

        } catch(err) {
            console.log(err);
            res.status(498 );
            throw new Error("Not authorized, token failure");
        }

   } else {
         res.status(498);
         throw new Error("Not authorized, no token");
   }
})


export {checkLogin}