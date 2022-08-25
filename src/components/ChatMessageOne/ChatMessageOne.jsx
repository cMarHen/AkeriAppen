import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import classes from './ChatMessageOne.module.css';
import TrashIcon from '../TrashIcon/TrashIcon';

/**
 * Component of type ChatMessageList.
 *
 * @param {object[]} messages Messages to show.
 * @returns {JSX} JSX Element.
 */
function ChatMessageOne({
  author,
  body,
  createdAt,
  id,
  isAdmin,
  handleRemoveAction
}) {
  const timeStamp = formatDistanceToNow(parseISO(createdAt), { addSuffix: true });

  const handleTrashClick = (event) => {
    event.preventDefault();
    handleRemoveAction(id);
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.author}>{author}</p>
        <p className={classes.timestamp}>{timeStamp}</p>
        {isAdmin && (
          <button type="submit" title="Klicka för att ta bort" className={classes.icon} onClick={handleTrashClick}>
            <TrashIcon />
          </button>
        )}
      </div>
      <p className={classes.body}>{body}</p>
    </div>
  );
}

export default ChatMessageOne;
