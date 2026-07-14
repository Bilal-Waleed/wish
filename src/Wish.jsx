import React from 'react';

const Wish = ({ name }) => {
  return (
    <div className='wish-stage'>
      <p className='eyebrow'>Today is the day</p>
      <h1 className='wish-message'>
        Happy Birthday
        <span className='highlight wish-name'>{name}</span>
      </h1>
      <p className='wish-sub'>
        Candles lit, balloons up — make a wish and celebrate every moment.
      </p>
    </div>
  );
};

export default Wish;
