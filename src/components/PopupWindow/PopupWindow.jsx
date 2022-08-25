import React, { useRef } from 'react';
import classes from './PopupWindow.module.css';

/**
 * Component of type PopupWindow.
 * @returns {JSX} - JSX Element.
 */
function PopupWindow({
  closeAction,
  saveAction,
  title,
  content,
  id
}) {
  const titleInputRef = useRef();
  const bodyInputRef = useRef();

  const handleSaveBtn = (event) => {
    event.preventDefault();
    saveAction(titleInputRef.current.value, bodyInputRef.current.value, id);
    closeAction();
  };

  return (
    <div key={`${Math.floor((Math.random() * 1000))}-min`} className={classes.container}>
      <div className={classes.title}>
        <h4>Rubik: </h4>
        <input type="text" ref={titleInputRef} defaultValue={title} />
      </div>
      <div className={classes.popupClose}>
        <button className={classes.closeBtn} onClick={closeAction} type="submit">X</button>
      </div>
      <div className={classes.body}>
        <h4>Innehåll: </h4>
        <textarea ref={bodyInputRef} defaultValue={content} />
      </div>
      <div className={classes.popupSave}>
        <button className={classes.saveBtn} onClick={handleSaveBtn} type="submit">Spara</button>
      </div>
    </div>
  );
}

export default PopupWindow;
