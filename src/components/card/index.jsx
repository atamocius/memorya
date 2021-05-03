import classes from './index.module.css';

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { paths as shapePaths } from '~/shapes';

export default function Card({ shape, flipped, onClick }) {
  const [hovered, setHovered] = useState(false);

  const { opacity, transform } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `
      translateZ(${hovered ? 50 : 0}px)
      rotateY(${flipped ? 180 : 0}deg)
    `,
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
        style={{ opacity, transform }}
      >
        <img className={classes.shape} src={svgShape} />
      </animated.div>

      <animated.div
        className={`${classes.card} ${classes.back}`}
        style={{
          opacity: opacity.to(o => 1 - o),
          transform,
        }}
      />
    </div>
  );
}
