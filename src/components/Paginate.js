/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-cycle */
import React from 'react';
import styles from '../styles/modules/paginate.module.scss';

function Paginate({ pagingPrev, pagingNext }) {
  return (
    <div className={styles.paginationContainer}>
      <button
        type='button'
        className={styles.button_next}
        onClick={(event) => pagingPrev(event)}
      >
        prev
      </button>
      <button
        type='button'
        className={styles.button_prev}
        onClick={(event) => pagingNext(event)}
      >
        next
      </button>
    </div>
  );
}

export default Paginate;
