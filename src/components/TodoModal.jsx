import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import style from '../styles/modules/modal.module.scss';
import Button from './Button';
import { addTodo } from '../slices/todoSlice';

function TodoModal({ modalOpen, setModalOpen }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status) {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        })
      );
      toast.success('Task added Successfully!');
      setModalOpen(false);
    } else {
      toast.error('Your task must have a title');
    }
  };
  return (
    <div>
      {modalOpen && (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div
              className={style.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={style.formTitle}> Add task </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={style.buttonContainer}>
                <Button type="submit">ADD</Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoModal;
