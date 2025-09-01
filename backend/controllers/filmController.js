import jwt from 'jsonwebtoken'
import asyncHandler from '../middlewares/asyncHandler.js'

async function getData(res, url) {

  try {

      const response = await fetch(url);
      if (!response.ok) {
        res.status(401)
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      //console.log(result);
      result.Search.forEach( (i) => console.log(i))
      res.status(201).json(result)
      return result;

  } catch (error) {
    console.error(error.message);
    res.status(401)
    throw new Error(error.message);
  }
}

const example = asyncHandler( async ( req, res ) => {

    const result = await getData(res, process.env.OMDB_URL + '&s=avengers')
    //console.log("Stampo i risultati: ",result)
    //result.forEach( (i) => console.log(i))


})


export { example }
