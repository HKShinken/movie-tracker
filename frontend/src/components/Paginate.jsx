import { Pagination } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

//page must be an array of integers
function Paginate({pages, current_page, keyword}) {

  return (
    <Pagination>
      <LinkContainer
                     key="first"
                     to={ "/search/" + keyword + "/1"  } >
            <Pagination.First />
      </LinkContainer>

      <LinkContainer
                     key="first"
                     to={ "/search/" + keyword + "/" + (parseInt(current_page) - 1)  } >
            <Pagination.Prev />
      </LinkContainer>

      { pages.map( (x) => ( //essentially lists all array element indexes 5 -> 0,1,2,3,4

               <LinkContainer
                     key={x + 1}
                     to={ "/search/" + keyword + "/" + (x + 1)  } >

                      { /* this highllights the box referring to curent page */ }
                      <Pagination.Item active={ x + 1 === current_page }> { x + 1 } </Pagination.Item>
               </LinkContainer>
         ) )}

      <Pagination.Ellipsis />

      <LinkContainer
                     key="first"
                     to={ "/search/" + keyword + "/" + (parseInt(current_page) + 1) }
                     disable={parseInt(current_page) === pages.length}  >
            <Pagination.Next />
      </LinkContainer>

      <LinkContainer
                     key="first"
                     to={ "/search/" + keyword + "/" + pages.length } 
                     disable={parseInt(current_page) === pages.length} >
            <Pagination.Last />
      </LinkContainer>
    </Pagination>
  );
}

export default Paginate;
