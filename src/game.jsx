import classes from './game.module.css';

import React from 'react';

import Card from './components/card';

export default function Game() {
  return (
    <div className={classes.root}>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
