import classes from './index.module.css';

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import svgShape from '../../shapes/thumb.svg';

export default function Card() {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    scale: 1,
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = () => setFlipped(!flipped);

  return (
    <div className={classes.root} onClick={handleClick}>
      <animated.div
        className={`${classes.card} ${classes.front}`}
        style={{
          opacity,
          transform,
        }}
      >
        <img className={classes.shape} src={svgShape} />
      </animated.div>

      <animated.div
        className={`${classes.card} ${classes.back}`}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      />
    </div>
  );
}
