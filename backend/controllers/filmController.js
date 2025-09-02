import jwt from 'jsonwebtoken'
import asyncHandler from '../middlewares/asyncHandler.js'

const getHomepageFilms = asyncHandler( async ( req, res ) => {

    try {

          //api does not have an option to get n random result..
          const response = await fetch(process.env.OMDB_URL + '&s=avengers&page=1');
          if (!response.ok) {
            res.status(401)
            throw new Error(`Response status: ${response.status}`);
          }
          console.log("Filme recuperati")
          const result = await response.json();
         
          //result.Search.forEach( (i) => console.log(i))
          res.status(201).json(result)

      } catch (error) {
        //console.error(error.message);
        res.status(401)
        throw new Error(error.message);
      }

})

export { getHomepageFilms }
