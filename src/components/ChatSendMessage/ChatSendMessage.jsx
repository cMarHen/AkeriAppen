import React, { useState } from 'react';
import classes from './ChatSendMessage.module.css';

/**
 * Component of type ChatSendMessage.
 *
 * @returns {JSX} JSX Element.
 */
function ChatSendMessage({ handleAction }) {
  const [text, setText] = useState('');

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    handleAction({
      textToSend: text
    });

    setText('');
  };

  return (
    <div className={classes.container}>
      <form className={classes.sendForm} onSubmit={submitHandler}>
        <textarea className={classes.textInput} value={text} onChange={textChangeHandler} />
        <button className={classes.send} type="submit">Skicka</button>
      </form>
    </div>
  );
}

export default ChatSendMessage;
