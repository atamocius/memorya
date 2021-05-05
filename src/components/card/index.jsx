import classes from './index.module.css';

import React from 'react';
import { animated } from 'react-spring';

import { paths as shapePaths } from '~/shapes';

import useLogic from './logic';

export default function Card({ shape, flipped, selected, onClick }) {
  const {
    interpolations: {
      opacity,
      transform,
      shadowTransform,
      shadowColor,
      shadowFilter,
    },
    cursor,
    raiseCard,
    lowerCard,
  } = useLogic(flipped, selected);

  const svgShape = shapePaths[shape];

  return (
    <div
      className={classes.root}
      onClick={onClick}
      onPointerEnter={raiseCard}
      onPointerLeave={lowerCard}
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
