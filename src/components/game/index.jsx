import React from 'react';

import Table from '~/components/table';

import useLogic from './logic';

export default function Game() {
  const { cards, flipped, selectedPair, flipCard } = useLogic();

  return (
    <Table
      cards={cards}
      flipped={flipped}
      selectedPair={selectedPair}
      onCardClick={flipCard}
    />
  );
}
