import { Pagination } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

//page must be an array of integers
function Paginate({pages, current_page, keyword}) {

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />

      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      { pages.map( (x) => ( //essentially lists all array element indexes 5 -> 0,1,2,3,4

               <LinkContainer
                     key={x + 1}
                     to={ "/search/" + keyword + "/" + x /*!isAdmin ? 
                                     keyword ? '/search/' + keyword + '/page/' + (x + 1)  : 
                                               '/page/' + (x + 1) : 
                                    '/admin/productlist/' + (x + 1)*/ } >

                      { /* this highllights the box referring to curent page */ }
                      <Pagination.Item active={ x + 1 === current_page }> { x + 1 } </Pagination.Item>
               </LinkContainer>
         ) )}

      <Pagination.Ellipsis />
      <Pagination.Item>{pages.length + 1}</Pagination.Item>

      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default Paginate;
