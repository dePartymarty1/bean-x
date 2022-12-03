import React, { useState } from 'react'
import styles from "./Pagination.module.scss"

const PaginationM = ({
    currentPage,
    setCurrentPage,
    moviesPerPage,
    totalMovies, 
}) => {
    const pageNumbers= []; // page nmber set it to empty array
    const totalPages = totalMovies / moviesPerPage;
    // It limits page numbers shown
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    
    // Paginate (select current page)
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    // Go to the next page
    const paginateNext = () => {
      setCurrentPage(currentPage + 1);
      // Show next set of pageNumbers
      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    };

    // Go to the previous page
    const paginatePrev = () => {
      setCurrentPage(currentPage - 1);
      // Show prev set of pageNumbers
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    };

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
      pageNumbers.push(i); //  make page numbers dynamic 
    }

    return (
        <ul className={styles.pagination}>
          <li onClick={paginatePrev}
            className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>
            Prev
          </li>
          {pageNumbers.map((number) => {
                  if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                    return (
                      <li
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? `${styles.active}` : null}
                      >
                        {number}
                      </li>
                    );
                  }
                })}
          <li
            onClick={paginateNext}
            className={
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? `${styles.hidden}`
                : null
            }>
          Next
          </li>
        </ul>
      )
    }
    
    export default PaginationM
    