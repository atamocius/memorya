import classes from './index.module.css';

import React from 'react';

import Card from '~/components/card';

export default function Table({ cards, flipped, selectedPair, onCardClick }) {
  const renderCard = i => (
    <Card
      shape={cards[i]}
      flipped={flipped[i]}
      selected={selectedPair.includes(i)}
      onClick={() => onCardClick(i)}
    />
  );

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
