import React from 'react';
import classes from './EditIcon.module.css';
import editImg from './icons/pencil.svg';

/**
 * Component of type EditIcon.
 *
 * @returns {JSX} - JSX Element.
 */
function EditIcon() {
  return (
    <div className={classes.icon}>
      <img src={editImg} alt="edit" />
    </div>
  );
}

export default EditIcon;
