import React, { useRef, useEffect, useState } from 'react';
import styles from './ReactRogue.module.css';
import { InputManager, InputHandlerFunction } from './InputManager';
import Player from '../Player';

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
  const [player, setPlayer] = useState(new Player(1, 2, tilesize));

  const inputManager = new InputManager();

  const handleInput: InputHandlerFunction = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    const newPlayer = new Player(1, 2, tilesize);
    Object.assign(newPlayer, player);
    newPlayer.move(data.x, data.y);
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
      player.draw(context);
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
