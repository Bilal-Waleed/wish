import React from 'react';

const CelebrationDecor = () => (
  <div className='celebration' aria-hidden='true'>
    <span className='glow glow-a' />
    <span className='glow glow-b' />

    <span className='balloon balloon-a' />
    <span className='balloon balloon-b' />
    <span className='balloon balloon-c' />
    <span className='balloon balloon-d' />
    <span className='balloon balloon-e' />
    <span className='balloon balloon-f' />

    <span className='candle candle-a'>
      <span className='flame' />
    </span>
    <span className='candle candle-b'>
      <span className='flame' />
    </span>

    {Array.from({ length: 28 }, (_, i) => (
      <span key={i} className={`confetti confetti-${i + 1}`} />
    ))}
  </div>
);

export default CelebrationDecor;
