import { Card, ListGroup, Button } from 'react-bootstrap';
import { FcAddDatabase, FcCheckmark   } from "react-icons/fc";
import { useAddFilmMutation } from '../slices/userApiSlice.js';
import { useState } from 'react';

const FilmCard = ({fcard, watched}) => {

  const [disabled, setDisabled] = useState(watched);

  const [ addFilm, // This is the mutation trigger
            { isLoading: isUpdating, error , reset }, // This is the destructured mutation result
          ] = useAddFilmMutation();
  
  // handler used by button
  const addFilmHandler = async(imdbId) => {

    try{
          const res = await addFilm( { imdbId } ).unwrap()
          setDisabled(true)
          console.log("Film added to watchlist: ", res)
    } catch(err) {
          console.log(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Card key={fcard.imdbID} className = "mb-3" style={{ width: '18rem' }}>

        <Card.Img variant="top" src={fcard.Poster} />
        <Card.Body>
            
            <Card.Title>{fcard.Title}</Card.Title>
            <Card.Text></Card.Text>
            <ListGroup variant="flush">
                <ListGroup.Item>Year: {fcard.Year}</ListGroup.Item>
                <ListGroup.Item>Type: {fcard.Type}</ListGroup.Item>
                <ListGroup.Item>Add to wathlist
                    <Button variant="link" 
                            size="lg" 
                            className="p-1 mb-1"
                            disabled={disabled}
                            onClick={() => addFilmHandler(fcard.imdbID)}>
                       { disabled ? <FcCheckmark /> : <FcAddDatabase/>  }
                    </Button> 
                </ListGroup.Item>
            </ListGroup>
            
        </Card.Body>
    </Card>
    </>
  );
}

export default FilmCard;
