import { useState, useEffect } from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { Button, Form, Spinner, Badge} from 'react-bootstrap';
import { useAddFilmReviewMutation } from '../slices/userApiSlice.js';
import { toast } from 'react-toastify';


const MakeRating = ({originalRating, imdbId}) => {

  const [hoverRate, setHoverRate] = useState(originalRating || 0);
  const [selectedRate, setSelectedRate] = useState(originalRating || 0);

  const rateHandler = (rate) => {
    setHoverRate(rate);
  }

  //user: userId, imdbId, rank, watched, review
  const[ addFilmReview, { isLoading: isReviewing, error , reset } ] = useAddFilmReviewMutation();


  // on submit it keeps the hover-selected rating
  const submitHandler = async (e) => {
    e.preventDefault();
    setSelectedRate(hoverRate);
    console.log("Printing selectedRate:" , hoverRate)

    try{
          await addFilmReview({imdbId, rate: hoverRate, watched: true, review:"Lorem Ipsum"}).unwrap()
          toast.success("Review added")
    } catch (err) {
            console.log(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error)
          }
  }
  

  return (
    <>
     <Form.Control plaintext readOnly defaultValue={"Your Rate"} />
      { isReviewing ? <Spinner /> : <Form className ="d-flex flex-row" onSubmit={(e) => submitHandler(e)}>
       <Badge style={{marginBlock:"10px"}} bg="primary">My Rate:</Badge>
        
        <Button type="submit" className="bg-none" >
          { hoverRate >= 1 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
        </Button> 
        
        <Button type="submit" className="bg-none" onMouseEnter={() => rateHandler(2)} onMouseLeave={() => rateHandler(selectedRate)}>
          { hoverRate >= 2 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
        </Button> 
      
        <Button type="submit" className="bg-none" onMouseEnter={() => rateHandler(3)} onMouseLeave={() => rateHandler(selectedRate)}>
          { hoverRate >= 3 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
        </Button>  
        
        <Button type="submit" className="bg-none" onMouseEnter={() => rateHandler(4)} onMouseLeave={() => rateHandler(selectedRate)}>
          { hoverRate >= 4 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
        </Button>  

        <Button type="submit" className="bg-none" onMouseEnter={() => rateHandler(5)} onMouseLeave={() => rateHandler(selectedRate)}>
          { hoverRate >= 5 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
        </Button>

      </Form> }

      
      { isReviewing ? <></> : <Form className ="d-flex flex-row" onSubmit={(e) => e.preventDefault}>
        <Badge style={{marginBottom:"10px"}} bg="primary">AVG RATING: <strong>5</strong></Badge>
      </Form> }


      
    </>
  );
}

export default MakeRating;
