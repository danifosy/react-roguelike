import React, { useRef } from 'react';
import styles from './ReactRogue.module.css';

type Canvas = {
  width: number;
  height: number;
  tilesize: number;
};

export default function ReactRogue({
  width,
  height,
  tilesize,
}: Canvas): JSX.Element {
  const canvasRef = useRef(null);
  return (
    <canvas
      ref={canvasRef}
      width={width * tilesize}
      height={height * tilesize}
      className={styles.canvas}
    />
  );
}
