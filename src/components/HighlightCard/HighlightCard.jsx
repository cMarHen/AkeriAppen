import React from 'react';

import classes from './HighlightCard.module.css';

/**
 * Component for the type HighlightCard.
 *
 * @param {string} title The header of the card.
 * @param {string} body The body of the card.
 * @returns {JSX} JSX Element.
 */
export function HighlightCard({ title, body }) {
  return (
    <div className={classes.container}>
      <div className={classes['hlgt-card-head']}>
        <h4>{title}</h4>
      </div>
      <div className={classes['hlgt-card-body']}>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default HighlightCard;
