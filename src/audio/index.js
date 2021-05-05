import mp3CardFlip from './card-flip.mp3';
import mp3CardFlipMultiple from './card-flip-multiple.mp3';

const sfxCardFlip = new Audio(mp3CardFlip);
const sfxCardFlipMultiple = new Audio(mp3CardFlipMultiple);

sfxCardFlip.volume = 0.1;
sfxCardFlipMultiple.volume = 0.1;

export function playCardFlipSfx() {
  sfxCardFlip.currentTime = 0;
  sfxCardFlip.play();
}

export function playCardFlipMultipleSfx() {
  sfxCardFlipMultiple.currentTime = 0;
  sfxCardFlipMultiple.play();
}
