import React, { useRef, useEffect } from 'react';
import styles from './ReactRogue.module.css';

type CanvasProps = {
  width: number;
  height: number;
  tilesize: number;
};

export default function ReactRogue({
  width,
  height,
  tilesize,
}: CanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('Draw to canvas');
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.clearRect(0, 0, width * tilesize, height * tilesize);
      context.fillStyle = '#000';
      context.fillRect(12, 22, 16, 16);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={width * tilesize}
      height={height * tilesize}
      className={styles.canvas}
    />
  );
}
