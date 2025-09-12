import { useState } from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const MakeReviewComponent = () => {

  const [hover, setHover] = useState(null);

  const rateHandler = (rate) => {
    setHover(rate);
  }

  //onMouseLeave={() => this.someOtherHandler}

  return (
    <div className ="d-flex flex-row">
    
      <Button onMouseEnter={() => rateHandler(1)} >
        { hover >= 1 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
      </Button> 
      
      <Button onMouseEnter={() => rateHandler(2)} >
        { hover >= 2 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
      </Button> 
    
      <Button onMouseEnter={() => rateHandler(3)} >
        { hover >= 3 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
      </Button>  
      
      <Button onMouseEnter={() => rateHandler(4)} >
        { hover >= 4 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
      </Button>  

      <Button onMouseEnter={() => rateHandler(5)} >
        { hover >= 5 ? <FaStar color="gold"/> : <FaRegStar color="gold"/> }
      </Button>  

    </div>
  );
}

export default MakeReviewComponent;
