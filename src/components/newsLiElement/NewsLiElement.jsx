import React from 'react';
import classes from './NewsLiElement.module.css';
import EditIcon from '../EditIcon/EditIcon';
import TrashIcon from '../TrashIcon/TrashIcon';

/**
 * Component of type NewsLiElement.
 *
 * @returns {JSX} - JSX Element.
 */
function NewsLiElement({
  sub,
  title,
  content,
  handleDeleteAction,
  handleEditAction,
  showEdit
}) {
  const handleEditClick = (event) => {
    event.preventDefault();
    handleEditAction(title, content, sub);
  };

  const handleTrashClick = (event) => {
    event.preventDefault();
    handleDeleteAction(sub);
  };

  return (
    <li className={classes.edit}>
      {title}
      {showEdit && (
      <div className={classes.iconWrapper}>
        <button type="submit" className={classes.icon} onClick={handleEditClick}>
          <EditIcon />
        </button>
        <button type="submit" className={classes.icon} onClick={handleTrashClick}>
          <TrashIcon />
        </button>
      </div>
      )}

    </li>
  );
}

export default NewsLiElement;
