import React from 'react';
import ReactRogue from './ReactRogue/ReactRogue';

export default function App(): JSX.Element {
  return (
    <>
      <h1>Hello Game</h1>
      <ReactRogue width={40} height={40} tilesize={16} />
    </>
  );
}
