import jwt from 'jsonwebtoken'
import asyncHandler from '../middlewares/asyncHandler.js'

const getHomepageFilms = asyncHandler( async ( req, res ) => {

    try {
          let key = req.params.keyword;
          key = key ? key: "avengers";

          //api does not have an option to get n random result..
          const response = await fetch(process.env.OMDB_URL + '&s=' + key + '&page=1');
          if (!response.ok) {
            res.status(401)
            throw new Error(`Response status: ${response.status}`);
          }
          
          const result = await response.json();
          //console.log("Film recuperati per keyword: ", key, result)
         
          //result.Search.forEach( (i) => console.log(i))
          res.status(201).json(result)

      } catch (error) {
        //console.error(error.message);
        res.status(401)
        throw new Error(error.message);
      }

})



export { getHomepageFilms }
