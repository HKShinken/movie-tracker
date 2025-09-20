import { Pagination } from 'react-bootstrap';
import { useState, useEffect} from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';

//page must be an array of integers
function Paginate({pages, current_page, keyword}) {
  
  // creates an array containig groups of  four indexes that slices the number of pages.
  // eg: 17 pages will have 5 group of 4 indexes
  const slices = pages.map(i => (i === 0 ? i : i * 4))
                      .slice(0, Math.ceil(pages.length/4));

  //slices the page array e.g.:  in groups of 4 indexes
  const pageSliced = slices.map(x => pages.slice(x, x + 4)); 

  const [sliceIndex, setSliceIndex] = useState(0); 
  const [currPage, setCurrPage] = useState(parseInt(current_page ? current_page : "1" ));

  const navigate = useNavigate();

  //increments or decrements slice indexes by the input
  const handleEllipsis = async(i) => {

        const elIdx = ( i < 0 ? pageSliced[sliceIndex + i].length - 1 : 0)

       //if i > 0 goes to first page of next slice otherwise goes to the last page of prev slice
       const page = pageSliced[sliceIndex + i][elIdx] + 1;
       setSliceIndex(sliceIndex + i)
       navigate("/search/" + keyword + "/" + page)
  }

  //gets the slice by the single page selected, eg.: p = 11, slice length=4 => slice_page = floor(11/4) = 2
  const handlePage = async(p) => {
            const nextSlice = Math.floor( (p - 1)/4 ) //the current page "p" actually is index + 1
            setCurrPage( pageSliced[nextSlice][0] + 1 ) 
            setSliceIndex( nextSlice ) 
  }

  useEffect(() => {
    setCurrPage(parseInt(current_page))
  }, [current_page]) //slice index is necessary to avpid rendering old local states

  return (
    <Pagination>
      <LinkContainer
                     key="first"
                     to={ "/search/" + keyword + "/1"  } 
                     onClick={() => handlePage(1)}
                     disabled={currPage === 1} >
            <Pagination.First />
      </LinkContainer>

      <LinkContainer
                     key="prev"
                     to={ "/search/" + keyword + "/" + (currPage - 1)  }
                     onClick={() => handlePage(currPage -1)}
                     disabled={currPage === 1}>
            <Pagination.Prev />
      </LinkContainer>

    { sliceIndex !== 0 && <Pagination.Ellipsis 
                          onClick={ () => handleEllipsis(-1) } /> }

      { pageSliced[sliceIndex].map( (x) => (
               <LinkContainer
                     key={x + 1}
                     to={ "/search/" + keyword + "/" + (x + 1)  } >

                      { /* this highlights the box referring to curent page */ }
                      <Pagination.Item active={ x + 1 === currPage }> { x + 1 } </Pagination.Item>
               </LinkContainer>
              ) )}
    
    { sliceIndex !== (slices.length - 1) && <Pagination.Ellipsis 
                           onClick={ () => handleEllipsis(1) }/> }

     <LinkContainer
                     key="next"
                     to={ "/search/" + keyword + "/" + (currPage + 1) }
                     onClick={() => handlePage(currPage + 1)}
                     disabled={currPage === pages.length} >
            <Pagination.Next />
      </LinkContainer> 

      <LinkContainer
                     key="last"
                     to={ "/search/" + keyword + "/" + pages.length } 
                     onClick={() => handlePage(pages.length)}
                     disabled={currPage === pages.length} >
            <Pagination.Last />
      </LinkContainer>
    </Pagination>
  );
}

export default Paginate;
