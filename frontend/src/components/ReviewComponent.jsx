import { useState } from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

const ReviewComponent = ({rating}) => {


  return (
    <div>
    
      {rating === 0 ? <> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></>}
      {rating > 0 && rating < 1 ? <> <FaStarHalfAlt color="gold" /> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating === 1 ? <> <FaStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating > 1 && rating < 2 ? <> <FaStar color="gold"/> <FaStarHalfAlt color="gold" /> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating === 2 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating > 2 && rating < 3 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaStarHalfAlt color="gold" /> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating === 3 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaRegStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating > 3 && rating < 4 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaStarHalfAlt color="gold" /> <FaRegStar color="gold"/> </> : <></> }
      {rating === 4 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaRegStar color="gold"/> </> : <></> }
      {rating > 4 && rating < 5 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaStarHalfAlt color="gold" /> </> : <></> }
      {rating === 5 ? <> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> <FaStar color="gold"/> </> : <></> }
       
      
    </div>
  );
}

export default ReviewComponent;
