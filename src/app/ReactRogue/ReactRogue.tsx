import React, { useRef, useEffect, useState } from 'react';
import styles from './ReactRogue.module.css';
import InputManager from './InputManager.jsx';

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
  const [player, setPlayer] = useState({ x: 64, y: 128 });

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newPlayer = { ...player };
    newPlayer.x += data.x * tilesize;
    newPlayer.y += data.y * tilesize;
    setPlayer(newPlayer);
  };

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    console.log('Draw to canvas');
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.clearRect(0, 0, width * tilesize, height * tilesize);
      context.fillStyle = '#000';
      context.fillRect(player.x, player.y, 16, 16);
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
