/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { AppContext, BASE_URL } from '../App';

function Modal({ modalOpen, setModalOpen, type, remind }) {
  const setRequestData = React.useContext(AppContext);

  const [discribe, setDisscribe] = React.useState('');
  const [status, setStatus] = React.useState(false);
  const [deadline, setDeadline] = React.useState('');

  React.useEffect(() => {
    if (type === 'edit' && remind) {
      setDisscribe(remind.description);
      setDeadline(remind.deadline_at);
      setStatus(remind.completed);
    } else {
      setDisscribe('');
      setDeadline('');
    }
  }, [modalOpen, type, remind]);

  const remindPosting = async (discribeInput, deadlineInput) => {
    await fetch(`${BASE_URL}/remind`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: discribeInput,
        deadline_at: deadlineInput,
        created_at: new Date().toLocaleString(),
      }),
    }).then((response) => response.json());
    setDisscribe('');
    setRequestData(new Date());
  };

  const remindUpdating = async (
    id,
    discribeInput,
    deadlineInput,
    statusInput
  ) => {
    await fetch(`${BASE_URL}/remind/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: discribeInput,
        deadline_at: deadlineInput,
        completed: Boolean(statusInput),
      }),
    });
    setRequestData(new Date());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (discribe === '' || deadline === '') {
      toast.error("Description and Deadline shouldn't be empty");
      return;
    }
    if (discribe && deadline) {
      if (type === 'add') {
        remindPosting(discribe, deadline);
        toast.success('Remind added successfully');
      }
      if (type === 'edit') {
        if (
          remind.description !== discribe ||
          remind.deadline_at !== deadline ||
          remind.completed !== status
        ) {
          remindUpdating(remind.id, discribe, deadline, status);
          toast.success('Remind updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
    }
    setModalOpen(false);
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role='button'
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {type === 'add' ? 'Add' : 'Update'} remind
            </h1>
            <label htmlFor='title'>
              Description
              <input
                value={discribe}
                onChange={(e) => setDisscribe(e.target.value)}
                type='text'
                id='title'
              />
            </label>
            <label htmlFor='deadline'>
              Deadline Time
              <input
                type='datetime-local'
                id='deadline'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            {type === 'edit' && (
              <label htmlFor='status'>
                Status
                <select
                  type='text'
                  id='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value=''>INCOMPLETED</option>
                  <option value={true}>COMPLETED</option>
                </select>
              </label>
            )}
            <div className={styles.buttonContainer}>
              <Button variant='primary' type='submit'>
                {type === 'add' ? 'Add' : 'Update'}
              </Button>
              <Button
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                variant='secondary'
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
