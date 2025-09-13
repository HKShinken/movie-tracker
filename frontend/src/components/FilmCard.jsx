import { Card, ListGroup, Button } from 'react-bootstrap';
import { FcAddDatabase, FcCheckmark   } from "react-icons/fc";
import MakeRating from './MakeRating.jsx';
import SeeRating from './SeeRating.jsx';
import { useAddFilmToWatchlistMutation, useDelFilmFromWatchlistMutation } from '../slices/userApiSlice.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import img_placeholder from '../assets/img_placeholder.png';

const FilmCard = ({fcard, inList, review}) => {

  const [added, setAdded] = useState(inList);

  const [ addFilmToWatchlist, // This is the mutation trigger
            { isLoading: isUpdating, error , reset }, // This is the destructured mutation result
          ] = useAddFilmToWatchlistMutation();

    const [ delFilmFromWatchlist, // This is the mutation trigger
            { isLoading: isDeleting, errorDel , resetDel }, // This is the destructured mutation result
          ] = useDelFilmFromWatchlistMutation();
  

  // handler used by button
  const addFilmHandler = async(imdbId, poster, title, year) => {


    try{
          if(!added)
          {
              await addFilmToWatchlist( { imdbId, poster, title, year } ).unwrap()
              toast.success("Film added to watchlist")
              console.log("Film added to watchlist")
          }        
          else 
          {
             await delFilmFromWatchlist( { imdbId } ).unwrap()
             toast.success("Film deleted from your watchlist")
             console.log("Film deleted from watchlist")
          }        
          setAdded(!added)
          
    } catch(err) {
          console.log(err?.data?.message || err.error);
    }
  }

  return (
    <>{review?.rate && console.log("Printing review prop in FilmCard: ", review)}
      <Card key={fcard.imdbID} className = "mb-3" style={{ width: '18rem' }}>

        <Card.Img variant="top" 
                  src={fcard.Poster}
                  onError={(e) => {
                                    e.target.src = img_placeholder;
                                    e.target.onError = null; // evita loop infinito se anche il placeholder fallisce
                                  }}
        />
        <Card.Body>
            
            <Card.Title>{fcard.Title}</Card.Title>
            <Card.Text></Card.Text>
            <ListGroup variant="flush">
                <ListGroup.Item>Year: {fcard.Year}</ListGroup.Item>
                <ListGroup.Item>Type: {fcard.Type}</ListGroup.Item>
                <ListGroup.Item><MakeRating 
                                                imdbId={fcard.imdbID}
                                                originalRating={review?.rate} /></ListGroup.Item>
                <ListGroup.Item>{ added ? "In your watchlist" : "Add to your watchlist" }
                    <Button variant="link" 
                            size="lg" 
                            className="p-1 mb-2"
                            //disabled={disabled}
                            onClick={() => addFilmHandler(fcard.imdbID, fcard.Poster, fcard.Title, fcard.Year) }>
                       { added ? <FcCheckmark/> : <FcAddDatabase/> }
                    </Button> 
                </ListGroup.Item>
            </ListGroup>
            
        </Card.Body>
    </Card>
    </>
  );
}

export default FilmCard;
