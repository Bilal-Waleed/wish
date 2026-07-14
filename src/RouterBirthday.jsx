import React from 'react';
import Birthday from './Birthday';

const RouterBirthday = (props) => {
  const { params } = props.match;
  const { name, day, month, gender } = params;
  return (
    <Birthday
      name={name}
      day={day !== undefined ? Number(day) : undefined}
      month={month !== undefined ? Number(month) : undefined}
      gender={gender}
    />
  );
};

export default RouterBirthday;
