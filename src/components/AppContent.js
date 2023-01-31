/* eslint-disable import/no-cycle */
import React from 'react';
import styles from '../styles/modules/app.module.scss';
import Paginate from './Paginate';
import RemindItem from './RemindItem';

function AppContent({
  reminds,
  error,
  loading,
  filter,
  pagingNext,
  pagingPrev,
  handleDelete,
}) {
  return (
    <div>
      {loading ? (
        // eslint-disable-next-line no-unneeded-ternary
        <div className={styles.loading}>{error ? error : 'Loading...'}</div>
      ) : (
        reminds.length === 0 && (
          <div className={styles.loading}>
            {filter !== 'all'
              ? `No ${filter} reminds to show`
              : 'No reminds to show'}
          </div>
        )
      )}
      {reminds.map((remind) => (
        <RemindItem
          remind={remind}
          key={remind.id}
          handleDelete={handleDelete}
        />
      ))}
      <Paginate
        pagingNext={pagingNext}
        pagingPrev={pagingPrev}
        count={reminds.length}
      />
    </div>
  );
}

export default AppContent;
