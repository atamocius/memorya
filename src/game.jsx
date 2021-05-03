import classes from './game.module.css';

import React, { useState, useEffect } from 'react';

import Card from './components/card';
import { wait } from '~/utils/helpers';

import { TYPES as ST } from './shapes';

export default function Game() {
  // prettier-ignore
  const [cards, setCards] = useState([
    ST.CIRCLE, ST.THUMB, ST.DIAMOND, ST.X,
    ST.DIAMOND, ST.SQUARE, ST.TRIANGLE, ST.X,
    ST.SQUARE, ST.TRIANGLE, ST.THUMB, ST.CIRCLE,
  ]);
  // prettier-ignore
  const [flipped, setFlipped] = useState([
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
  ]);
  const [selectedPair, setSelectedPair] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {}, []);

  useEffect(async () => {
    if (selectedPair.length < 2) {
      return;
    }

    setProcessing(true);

    await wait(500);

    if (!isMatch(...selectedPair)) {
      unflipPair(...selectedPair);
      // await wait(400);
    }

    if (isExhausted()) {
      await unflipAll();
    }

    setSelectedPair([]);
    setProcessing(false);
  }, [flipped]);

  const isExhausted = () => !flipped.includes(false);
  const isMatch = (a, b) => cards[a] === cards[b];
  const unflipPair = (a, b) => {
    const copy = flipped.slice();
    copy[a] = false;
    copy[b] = false;
    setFlipped(copy);
  };
  const unflipAll = async () => {
    setSelectedPair(Array.from(cards.keys()));
    await wait(400);
    setFlipped(Array(flipped.length).fill(false));
    await wait(400);
  };

  const handleClick = index => {
    if (flipped[index]) {
      return;
    }

    const flippedCopy = flipped.slice();
    flippedCopy[index] = true;

    const pairCopy = selectedPair.slice();
    pairCopy.push(index);

    setFlipped(flippedCopy);
    setSelectedPair(pairCopy);
  };

  const renderCard = i => (
    <Card
      shape={cards[i]}
      flipped={flipped[i]}
      selected={selectedPair.includes(i)}
      onClick={() => handleClick(i)}
    />
  );

  return (
    <div
      className={classes.root}
      style={{ pointerEvents: processing ? 'none' : 'unset' }}
    >
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
