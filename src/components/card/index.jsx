import classes from './index.module.css';

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { paths as shapePaths } from '~/shapes';

import * as h from './helpers';

export default function Card({ shape, flipped, selected, onClick }) {
  const [hovered, setHovered] = useState(false);

  const {
    opacity,
    transform,
    shadowTransform,
    shadowColor,
    shadowFilter,
  } = useSpring({
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

  const handlePointerEnter = flipped ? null : () => setHovered(true);
  const handlePointerLeave = () => setHovered(false);

  const svgShape = shapePaths[shape];
  const cursor = h.calcCursor(flipped);

  return (
    <div
      className={classes.root}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Shadow */}
      <animated.div
        className={`${classes.card}`}
        style={{
          transform: shadowTransform,
          backgroundColor: shadowColor,
          filter: shadowFilter,
        }}
      />

      {/* Front */}
      <animated.div
        className={`${classes.card} ${classes.front}`}
        style={{
          cursor,
          opacity,
          transform,
        }}
      >
        <img className={classes.shape} src={svgShape} />
      </animated.div>

      {/* Back */}
      <animated.div
        className={`${classes.card} ${classes.back}`}
        style={{
          cursor,
          opacity: opacity.to(o => 1 - o),
          transform,
        }}
      />
    </div>
  );
}
