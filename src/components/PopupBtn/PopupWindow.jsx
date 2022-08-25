import React, { useRef } from 'react';
import classes from './PopupWindow.module.css';

/**
 * Component of type PopupWindow.
 * @returns {JSX} - JSX Element.
 */
function PopupWindow({ closeAction, saveAction }) {
  const titleInputRef = useRef();
  const bodyInputRef = useRef();

  const handleSaveBtn = (event) => {
    event.preventDefault();
    saveAction(titleInputRef.current.value, bodyInputRef.current.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h4>Titel: </h4>
        <input type="text" ref={titleInputRef} />
      </div>
      <div className={classes.popupClose}>
        <button className={classes.closeBtn} onClick={closeAction} type="submit">Close</button>
      </div>
      <div className={classes.body}>
        <h4>Skriv här: </h4>
        <textarea ref={bodyInputRef} />
      </div>
      <div className={classes.popupSave}>
        <button className={classes.saveBtn} onClick={handleSaveBtn} type="submit">Save</button>
      </div>
    </div>
  );
}

export default PopupWindow;
