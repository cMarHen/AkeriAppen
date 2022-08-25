import React from 'react';
import classes from './Home.module.css';
import mainImg from './images/205863995.jpg';

/**
 * Component of type Home.
 *
 * @returns {JSX} JSX Element.
 */
function Home() {
  return (
    <div className={classes.mainContainer}>
      <h1>FRÖDINGE TANKTRANSPORT AB</h1>

      <h3>
        Välkommen till Åkeriappen. Här lägger vi upp nyheter,
        och du kan sköta ditt pappersarbete digitalt.
      </h3>
      <div className={classes.cardContainer}>
        <img src={mainImg} alt="A truck" />
      </div>
      <div className={classes.mainFooter}>
        <p>Frödinge Tanktransport AB</p>
        <p>Chefen: 073-9786754</p>
        <p>Adress: Lastbilsgatan 2</p>
      </div>
    </div>
  );
}

export default Home;
