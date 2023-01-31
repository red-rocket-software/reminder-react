/* eslint-disable import/no-cycle */
import React from 'react';
import Button, { SelectButton, SelectButtonLimit } from './Button';
import styles from '../styles/modules/app.module.scss';
import Modal from './Modal';

function Header({
  filter,
  updateFilter,
  timePeriod,
  updateTimePeriod,
  limit,
  updateLimit,
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className={styles.appHeader}>
      <Button onClick={() => setModalOpen(true)} variant='primary'>
        Add remind
      </Button>
      <div className={styles.appHeaderFilters}>
        <p>Reminds on page:</p>
        <SelectButtonLimit value={limit} onChange={(e) => updateLimit(e)}>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
        </SelectButtonLimit>
        {filter === 'completed' && (
          <SelectButton
            value={timePeriod}
            onChange={(e) => updateTimePeriod(e)}
          >
            <option value='today' key='today'>
              Today
            </option>
            <option value='lastWeek' key='lastWeek'>
              Last week
            </option>

            <option value='lastMonth' key='lastMonth'>
              Last month
            </option>
          </SelectButton>
        )}
        <SelectButton value={filter} onChange={(e) => updateFilter(e)}>
          <option value='all'>ALL</option>
          <option value='incompleted'>Incompleted</option>
          <option value='completed'>Completed</option>
        </SelectButton>
      </div>
      <Modal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default Header;
