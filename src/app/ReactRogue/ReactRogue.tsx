import React from 'react';
import styles from './ReactRogue.module.css';

export default function ReactRogue(): JSX.Element {
  return <canvas width="256" height="256" className={styles.canvas} />;
}
