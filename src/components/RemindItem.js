/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { format } from 'date-fns';
import React from 'react';
import { MdDelete, MdDone, MdEdit } from 'react-icons/md';
import { AppContext, BASE_URL } from '../App';
import styles from '../styles/modules/remindItem.module.scss';
import { getClasses } from '../utils/getClasses';
import Modal from './Modal';

function RemindItem({ remind, handleDelete }) {
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [status] = React.useState(true);

  const setRequestUpdateData = React.useContext(AppContext);

  const handleUpdateStatus = async (id, statusInput) => {
    if (remind.completed === true) {
      return;
    }
    await fetch(`${BASE_URL}/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        completed: Boolean(statusInput),
      }),
    });
    setRequestUpdateData(new Date());
  };

  return (
    <div className={styles.item}>
      <div className={styles.todoDetails}>
        <div className={styles.text}>
          <p
            className={getClasses([
              styles.todoText,
              remind.completed === true && styles['todoText--completed'],
            ])}
          >
            {remind.description}
          </p>
          <p className={styles.time}>
            <p>Deadline time:</p>
            {format(new Date(remind.deadline_at), 'p, MM/dd/yyyy')}
          </p>
        </div>
      </div>
      <div className={styles.todoActions}>
        <div
          className={styles.icon}
          onClick={() => handleUpdateStatus(remind.id, status)}
          onKeyDown={() => handleUpdateStatus(remind.id, status)}
          tabIndex={0}
          role='button'
        >
          <MdDone />
        </div>
        <div
          className={styles.icon}
          onClick={() => handleDelete(remind.id)}
          onKeyDown={() => handleDelete(remind.id)}
          tabIndex={0}
          role='button'
        >
          <MdDelete />
        </div>
        <div
          className={styles.icon}
          onClick={() => setUpdateModalOpen(true)}
          onKeyDown={() => setUpdateModalOpen(true)}
          tabIndex={0}
          role='button'
        >
          <MdEdit />
        </div>
      </div>
      <Modal
        type='edit'
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        remind={remind}
      />
    </div>
  );
}

export default RemindItem;
