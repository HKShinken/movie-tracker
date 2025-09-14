import { useState, useEffect } from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { Button, Form, Spinner, Badge} from 'react-bootstrap';
import { useAddFilmReviewMutation } from '../slices/userApiSlice.js';
import { useGetFilmReviewDataQuery } from '../slices/filmApiSlice.js';
import { toast } from 'react-toastify';
import { use } from 'react';


const MakeRating = ({originalRating, imdbId}) => {

  const [hoverRate, setHoverRate] = useState(originalRating || 0);
  const [selectedRate, setSelectedRate] = useState(originalRating || 0);
  const [avg, setAvg] = useState(0);
  const [numRev, setNumRev] = useState(0);

  const rateHandler = (rate) => {
    setHoverRate(rate);
  }

  //user: userId, imdbId, rank, watched, review
  const[ addFilmReview, { isLoading: isReviewing } ] = useAddFilmReviewMutation();

  const { data: reviewData, isLoading: isLoadingReviewData, refetch: refetchAvg  } = useGetFilmReviewDataQuery({imdbId})


  // on submit it keeps the hover-selected rating
  const submitHandler = async (e) => {
    e.preventDefault();
    setSelectedRate(hoverRate);
    //console.log("Printing selectedRate:" , hoverRate)

    try{
          await addFilmReview({imdbId, rate: hoverRate, watched: true, review:"Lorem Ipsum"}).unwrap()
          await refetchAvg();

          toast.success("Review added")
    } catch (err) {
            console.log(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error)
          }
  }

  //necessary to update avg when reviewData changes otherwise it is possible to get the data object from refetch to get the updated result
  useEffect( () => {
        if(reviewData && reviewData.length > 0)
        {
          setAvg( reviewData[0].avgRating )
          setNumRev( reviewData[0].numReviews )
        }  
        else 
        {
          setAvg(0)
          setNumRev(0)
        }
    }, [reviewData] )


  return (
    <> 
      { isLoadingReviewData || isReviewing ? <Spinner /> : <Form className ="d-flex flex-row" onSubmit={(e) => submitHandler(e)}>
       <Badge style={{marginBlock:"10px"}} bg="primary">My Rate:</Badge>
        
        <Button type="submit" className="bg-none" onMouseEnter={() => rateHandler(1)} onMouseLeave={() => rateHandler(selectedRate)}>
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

      
      { isLoadingReviewData || isReviewing ? <></> : <Form  onSubmit={(e) => e.preventDefault}>
        <Badge style={{marginBottom:"10px"}} bg="primary">AVG Rating: <strong style={{textShadow:"0px 0px 4px #000000"}}>{avg === 0 ? "None" : avg}</strong></Badge>
        <Badge style={{marginBottom:"10px"}} bg="primary">Number of Ratings: <strong style={{textShadow:"0px 0px 4px #000000"}}>{numRev}</strong></Badge>
      </Form> }
      
    </>
  );
}

export default MakeRating;
