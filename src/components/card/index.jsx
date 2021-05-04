import classes from './index.module.css';

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { paths as shapePaths } from '~/shapes';

export default function Card({ shape, flipped, selected, onClick }) {
  const [hovered, setHovered] = useState(false);

  const {
    opacity,
    transform,
    shadowTransform,
    shadowColor,
    shadowBlur,
  } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `
      translateZ(${selected ? 80 : hovered ? 80 : 3}px)
      rotateY(${flipped ? 180 : 0}deg)
    `,
    shadowTransform: `
      scaleX(${flipped ? -1 : 1})
      scale(${selected ? 1.08 : hovered ? 1.08 : 1})
    `,
    shadowColor: `rgba(0, 0, 0, ${selected ? 0.3 : hovered ? 0.3 : 0.5})`,
    shadowBlur: `blur(${selected ? 0.3 : hovered ? 0.3 : 0}em)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handlePointerEnter = () => setHovered(true);
  const handlePointerLeave = () => setHovered(false);

  const svgShape = shapePaths[shape];

  return (
    <div
      className={classes.root}
      onClick={onClick}
      onPointerEnter={flipped ? null : handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Shadow */}
      <animated.div
        className={`${classes.card}`}
        style={{
          transform: shadowTransform,
          backgroundColor: shadowColor,
          filter: shadowBlur,
        }}
      />

      {/* Front */}
      <animated.div
        className={`${classes.card} ${classes.front}`}
        style={{
          cursor: flipped ? 'unset' : 'pointer',
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
          cursor: flipped ? 'unset' : 'pointer',
          opacity: opacity.to(o => 1 - o),
          transform,
        }}
      />
    </div>
  );
}
