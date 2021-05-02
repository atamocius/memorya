import classes from './game.module.css';

import React, { useState, useEffect } from 'react';

import Card from './components/card';

import { TYPES as ST } from './shapes';

export default function Game() {
  const [state, setState] = useState({
    // prettier-ignore
    values: [
      ST.CIRCLE, ST.THUMB, ST.DIAMOND, ST.X,
      ST.DIAMOND, ST.SQUARE, ST.TRIANGLE, ST.X,
      ST.SQUARE, ST.TRIANGLE, ST.THUMB, ST.CIRCLE,
    ],
    // prettier-ignore
    flipped: [
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
    ],
  });

  useEffect(() => {}, []);

  useEffect(() => {
    console.log('🧮', 'Check matches!');
  }, [state.flipped]);

  const handleClick = index => {
    const flippedCopy = state.flipped.slice();
    flippedCopy[index] = true;

    console.log('🤪', 'flipped!');

    setState({
      ...state,
      flipped: flippedCopy,
    });
  };

  const renderCard = i => {
    return (
      <Card
        shape={state.values[i]}
        flipped={state.flipped[i]}
        onClick={() => handleClick(i)}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        {renderCard(0)}
        {renderCard(1)}
        {renderCard(2)}
        {renderCard(3)}
      </div>

      <div className={classes.row}>
        {renderCard(4)}
        {renderCard(5)}
        {renderCard(6)}
        {renderCard(7)}
      </div>

      <div className={classes.row}>
        {renderCard(8)}
        {renderCard(9)}
        {renderCard(10)}
        {renderCard(11)}
      </div>
    </div>
  );
}
