import { useState } from 'react';
import { useSpring } from 'react-spring';

import * as h from './helpers';

/**
 * @param {boolean} flipped
 * @param {boolean} selected
 */
export default function useLogic(flipped, selected) {
  const [hovered, setHovered] = useState(false);

  const interpolations = useSpring({
    opacity: h.calcOpacity(flipped),
    transform: `
      translateZ(${h.calcHover(selected, hovered)}em)
      rotateY(${h.calcFlip(flipped)}deg)
    `,
    shadowTransform: `
      scaleX(${h.calcShadowFlip(flipped)})
      scale(${h.calcShadowSize(selected, hovered)})
    `,
    shadowColor: `rgba(0, 0, 0, ${h.calcShadowAlpha(selected, hovered)})`,
    shadowFilter: `blur(${h.calcShadowBlur(selected, hovered)}em)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const raiseCard = () => {
    if (flipped) {
      return;
    }
    setHovered(true);
  };
  const lowerCard = () => setHovered(false);

  const cursor = h.calcCursor(flipped);

  return {
    interpolations,
    cursor,
    raiseCard,
    lowerCard,
  };
}
