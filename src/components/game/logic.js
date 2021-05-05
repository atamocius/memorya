import { useState, useEffect } from 'react';

import { wait, shuffle } from '~/utils/helpers';
import { names } from '~/shapes';

export default function useLogic() {
  const [cards, setCards] = useState(names.concat(names));
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));
  const [selectedPair, setSelectedPair] = useState([]);
  const [processing, setProcessing] = useState(false);

  // Initial shuffle
  useEffect(() => shuffleCards(), []);

  // A card was flipped, so we need to check for matches
  useEffect(async () => {
    // We exit early if any of the ff is true:
    // - Currently "processing" (ie. waiting for animation to finish)
    // - If we still have less than 2 cards selected
    if (processing || selectedPair.length < 2) {
      return;
    }

    // Flag to prevent user interaction
    setProcessing(true);

    // Let the "raise" animation, triggered by clicking one of the cards,
    // to finish
    await wait(500);

    // If the selected pair is not a match, flip the selected cards face down
    if (!isMatch(...selectedPair)) {
      await unflipPair(...selectedPair);
      // Allow user interaction again
      setProcessing(false);
      return;
    }

    // If all cards have been matched, all cards are flipped facing down and
    // then cards are shuffled
    if (isExhausted()) {
      await unflipAll();
      // Shuffle the cards since this resets the game
      shuffleCards();
      // Allow user interaction again
      setProcessing(false);
      return;
    }

    // Reaching this point means
    // the selected pair is a match
    // but not all cards have been exhausted

    // Lower the selected cards on the table by unmarking them as "selected"
    setSelectedPair([]);
    // Allow user interaction again
    setProcessing(false);
  }, [flipped]);

  const shuffleCards = () => setCards(shuffle(cards.slice()));
  const isExhausted = () => !flipped.includes(false);
  const isMatch = (a, b) => cards[a] === cards[b];

  const unflipPair = async (a, b) => {
    // Flip the selected cards face down
    const copy = flipped.slice();
    copy[a] = false;
    copy[b] = false;
    setFlipped(copy);
    // Let the "flip" animation finish
    await wait(400);
    // Lower the selected cards on the table by unmarking them as "selected"
    setSelectedPair([]);
    // Let the "lower" animation finish
    await wait(400);
  };

  const unflipAll = async () => {
    // Raise all cards off the table by marking them as "selected"
    setSelectedPair(Array.from(cards.keys()));
    // Let the "raise" animation finish
    await wait(400);
    // Flip all cards face down
    setFlipped(Array(flipped.length).fill(false));
    // Let the "flip" animation finish
    await wait(400);
    // Lower all cards on the table by unmarking them as "selected"
    setSelectedPair([]);
    // Let the "lower" animation finish
    await wait(400);
  };

  const flipCard = index => {
    // We prevent user interaction if any of the ff is true:
    // - Currently "processing" (ie. waiting for animation to finish)
    // - If we already have 2 cards selected
    // - If the card clicked is already face up
    if (processing || selectedPair.length >= 2 || flipped[index]) {
      return;
    }

    const flippedCopy = flipped.slice();
    flippedCopy[index] = true;

    const pairCopy = selectedPair.slice();
    pairCopy.push(index);

    setFlipped(flippedCopy);
    setSelectedPair(pairCopy);
  };

  return {
    processing,
    cards,
    flipped,
    selectedPair,
    flipCard,
  };
}
