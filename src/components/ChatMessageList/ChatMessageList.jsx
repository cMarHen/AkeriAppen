import React from 'react';
import classes from './ChatMessageList.module.css';

import ChatMessageOne from '../ChatMessageOne/ChatMessageOne';

/**
 * Component of type ChatMessageList.
 *
 * @param {object[]} messages Messages to show.
 * @param {Function} handleRemoveMessage - Remove message action.
 * @param {boolean} isAdmin - If admin.
 * @returns {JSX} JSX Element.
 */
function ChatMessageList({ messages, handleRemoveMessage, isAdmin }) {
  const handleRemoveAction = (id) => {
    handleRemoveMessage(id);
  };

  return (
    <div className={classes.container}>
      {messages.map((message) => (
        <ChatMessageOne
          key={message.id}
          id={message.id}
          author={message.username}
          body={message.content}
          createdAt={message.createdAt}
          isAdmin={isAdmin}
          handleRemoveAction={handleRemoveAction}
        />
      ))}
    </div>
  );
}

export default ChatMessageList;
