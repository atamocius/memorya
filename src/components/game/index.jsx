import React from 'react';

import Table from '~/components/table';
import Link from '~/components/link';

import useLogic from './logic';

export default function Game() {
  const { processing, cards, flipped, selectedPair, flipCard } = useLogic();

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
