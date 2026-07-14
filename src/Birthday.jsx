import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import CelebrationDecor from './CelebrationDecor';
import githubLogo from './githubLogo.svg';
import { Link } from 'react-router-dom';

const useThemeClass = (themeClass) => {
  useEffect(() => {
    document.documentElement.classList.remove('theme-boy', 'theme-girl');
    document.documentElement.classList.add(themeClass);
    return () => {
      document.documentElement.classList.remove('theme-boy', 'theme-girl');
    };
  }, [themeClass]);
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Birthday = ({ name, day, month, gender }) => {
  const personName =
    name === undefined || name === '' ? 'Bilal' : decodeURIComponent(name);
  const birthdayDay =
    day === undefined || day === '' ? 2 : Number(day);
  const birthdayMonth =
    month === undefined || month === '' ? 9 : Number(month);
  const themeGender =
    gender === 'female' || gender === 'girl' ? 'female' : 'male';
  const themeClass =
    themeGender === 'female' ? 'theme-girl' : 'theme-boy';

  useThemeClass(themeClass);

  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      const isItBday =
        now.getDate() === birthdayDay &&
        now.getMonth() === birthdayMonth - 1;

      if (isItBday) {
        setState({
          seconds: 0,
          minutes: 0,
          hours: 0,
          days: 0,
          isItBday: true,
        });
        return;
      }

      let nextBirthday = new Date(
        currentYear,
        birthdayMonth - 1,
        birthdayDay
      );

      if (now >= nextBirthday) {
        nextBirthday = new Date(
          currentYear + 1,
          birthdayMonth - 1,
          birthdayDay
        );
      }

      const timeRemaining = nextBirthday.getTime() - now.getTime();

      let seconds = Math.floor(timeRemaining / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      setState({
        seconds,
        minutes,
        hours,
        days,
        isItBday: false,
      });
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [birthdayDay, birthdayMonth]);

  const currentYear = new Date().getFullYear();
  const monthBday = monthNames[birthdayMonth - 1];

  return (
    <div className={`page ${themeClass}`}>
      <CelebrationDecor />
      <div className='page-content'>
        <Countdown
          countdownData={state}
          name={personName}
          gender={themeGender}
        />
        {!state.isItBday && (
          <>
            <div className='birthdate'>
              Birth-Date: {birthdayDay} {monthBday} {currentYear}
            </div>
            <div className='credits'>
              <a href='https://github.com/Bilal-Waleed'>
                <img
                  src={githubLogo}
                  alt='Github-Logo'
                  className='github-logo'
                />
              </a>
            </div>
            <Link className='text-link' to='/generate'>
              Generate Here
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Birthday;
