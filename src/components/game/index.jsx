import React from 'react';

import Table from '~/components/table';
import Link from '~/components/link';

import useStore from './store';

export default function Game() {
  const { processing, cards, flipped, selectedPair, flipCard } = useStore();

  const pointerEvents = processing ? 'none' : 'unset';

  return (
    <>
      <div style={{ pointerEvents }}>
        <Table
          cards={cards}
          flipped={flipped}
          selectedPair={selectedPair}
          onCardClick={flipCard}
        />
      </div>
      <Link />
    </>
  );
}
