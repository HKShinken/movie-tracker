import jwt from 'jsonwebtoken'
import asyncHandler from '../middlewares/asyncHandler.js'

async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

const example = asyncHandler( async ( req, res) => {

    console.log("Stampo lo user ID preso dalla richiesta: ", req.userId);



    res.status(201).send("tutto ok")

})


export { example }
