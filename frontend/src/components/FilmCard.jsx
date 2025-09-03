import { Card, ListGroup } from 'react-bootstrap';

const FilmCard = ({fcard}) => {
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
            </ListGroup>
            
        </Card.Body>
    </Card>
    </>
  );
}

export default FilmCard;
