import Review from '../model/Review.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const getHomepageFilms = asyncHandler( async ( req, res ) => {

    try {
          let { keyword, page } = req.params;

          keyword = keyword ? keyword: "avengers";
          page = page ? page: "1";

          //api does not have an option to get n random result..
          const response = await fetch(process.env.OMDB_URL + '&s=' + keyword + '&page=' + page);
          
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


const getFilmData = asyncHandler( async ( req, res ) => {

    try {
          const imdbId = req.params.imdbId; 
          
          const result = await Review.aggregate([
                { $match: { imdbId } },
                {
                  $group: {
                    _id: "$imdbId",
                    avgRating: { $avg: { $toInt: "$rate" } },   
                    numReviews: {  $sum: 1 }
                  }
                }
            ]); // lean() not needed for aggregations
         
          //console.log("printing avgRating for imdbId ", imdbId, ": ", result)
          res.status(201).json(result)

      } catch (error) {
        //console.error(error.message);
        res.status(500)
        throw new Error(error.message);
      }

})


export { getHomepageFilms, getFilmData}
