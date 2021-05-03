import classes from './index.module.css';

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { paths as shapePaths } from '~/shapes';

const trans = (z, ry) =>
  `perspective(600px) translateZ(${z}px) rotateY(${ry}deg)`;

export default function Card({ shape, flipped, onClick }) {
  const [hovered, setHovered] = useState(false);

  const { opacity, transform } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: [hovered ? 80 : 0, flipped ? 180 : 0],
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handlePointerEnter = () => setHovered(true);
  const handlePointerLeave = () => setHovered(false);

  const svgShape = shapePaths[shape];

  return (
    <div
      className={classes.root}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <animated.div
        className={`${classes.card} ${classes.front}`}
        style={{
          opacity,
          transform: transform.to(trans),
        }}
      >
        <img className={classes.shape} src={svgShape} />
      </animated.div>

      <animated.div
        className={`${classes.card} ${classes.back}`}
        style={{
          opacity: opacity.to(o => 1 - o),
          transform: transform.to(trans),
        }}
      />
    </div>
  );
}
