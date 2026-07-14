import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CelebrationDecor from './CelebrationDecor';
import CustomSelect from './CustomSelect';

const months = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const genderOptions = [
  { value: 'male', label: 'Boy — sky & teal' },
  { value: 'female', label: 'Girl — blush & rose' },
];

const daysInMonth = (month) =>
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];

const Generate = () => {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [gender, setGender] = useState('male');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const themeClass = gender === 'female' ? 'theme-girl' : 'theme-boy';
  const safeName = name.trim();

  useEffect(() => {
    document.documentElement.classList.remove('theme-boy', 'theme-girl');
    document.documentElement.classList.add(themeClass);
    return () => {
      document.documentElement.classList.remove('theme-boy', 'theme-girl');
    };
  }, [themeClass]);

  const generateLink = () => {
    if (safeName === '') {
      setError('Please enter a name.');
      setLink('');
      return;
    }
    if (month === '') {
      setError('Please select a month.');
      setLink('');
      return;
    }
    const dayNum = Number(day);
    if (day === '' || !Number.isInteger(dayNum) || dayNum < 1) {
      setError('Please enter a valid day.');
      setLink('');
      return;
    }
    if (dayNum > daysInMonth(Number(month))) {
      setError(`Selected month has only ${daysInMonth(Number(month))} days.`);
      setLink('');
      return;
    }

    setError('');
    setCopied(false);
    const path = `/birthday/${encodeURIComponent(safeName)}/${dayNum}/${month}/${gender}`;
    setLink(`${window.location.origin}${path}`);
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = link;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`page page-generate ${themeClass}`}>
      <CelebrationDecor />
      <div className='page-content form-panel'>
        <p className='eyebrow'>Create a wish</p>
        <h1 className='generate-title'>Generate Link</h1>
        <p className='support-text support-text-compact'>
          Name, date, and theme — colors follow gender.
        </p>

        <div className='form'>
          <label className='field'>
            <span className='field-label'>Name</span>
            <input
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className='field-row'>
            <label className='field'>
              <span className='field-label'>Day</span>
              <input
                type='number'
                placeholder='e.g. 14'
                value={day}
                onChange={(e) => setDay(e.target.value)}
                max={31}
                min={1}
              />
            </label>

            <CustomSelect
              label='Month'
              value={month}
              onChange={setMonth}
              options={months}
              placeholder='Select month'
            />
          </div>

          <CustomSelect
            label='Gender theme'
            value={gender}
            onChange={setGender}
            options={genderOptions}
          />
        </div>

        <button className='btn btn-primary' type='button' onClick={generateLink}>
          Generate Link
        </button>

        {error !== '' && <p className='form-error'>{error}</p>}

        {link !== '' && (
          <div className='gen-result'>
            <div className='gen-link'>
              <span className='gen-link-text'>{link}</span>
              <button
                type='button'
                className={`copy-btn${copied ? ' is-copied' : ''}`}
                onClick={copyLink}
                aria-label='Copy link'
                title={copied ? 'Copied!' : 'Copy link'}
              >
                {copied ? (
                  <svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'>
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M20 6 9 17l-5-5'
                    />
                  </svg>
                ) : (
                  <svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'>
                    <rect
                      x='9'
                      y='9'
                      width='11'
                      height='11'
                      rx='2.5'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      d='M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1'
                    />
                  </svg>
                )}
              </button>
            </div>
            {copied && <span className='copy-hint'>Link copied!</span>}
            <Link
              className='btn btn-primary btn-link'
              to={`/birthday/${encodeURIComponent(safeName)}/${day}/${month}/${gender}`}
            >
              Visit Link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
