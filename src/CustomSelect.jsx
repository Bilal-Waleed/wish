import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const CustomSelect = ({ label, value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(240);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 10;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const preferred = Math.min(260, options.length * 44 + 16);
    const shouldDropUp = spaceBelow < preferred && spaceAbove > spaceBelow;

    setDropUp(shouldDropUp);
    setMenuMaxHeight(
      Math.max(140, Math.min(preferred, shouldDropUp ? spaceAbove : spaceBelow))
    );
  }, [open, options.length]);

  const selected = options.find((option) => option.value === value);

  return (
    <div className='field' ref={rootRef}>
      <span className='field-label'>{label}</span>
      <div
        className={`custom-select${open ? ' is-open' : ''}${
          dropUp ? ' drop-up' : ''
        }`}
      >
        <button
          type='button'
          ref={triggerRef}
          className='custom-select-trigger'
          aria-haspopup='listbox'
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={selected ? '' : 'select-placeholder'}>
            {selected ? selected.label : placeholder || 'Select'}
          </span>
          <span className='custom-select-chevron' aria-hidden='true' />
        </button>
        {open && (
          <ul
            className='custom-select-menu'
            role='listbox'
            style={{ maxHeight: `${menuMaxHeight}px` }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                role='option'
                aria-selected={option.value === value}
              >
                <button
                  type='button'
                  className={`custom-select-option${
                    option.value === value ? ' is-active' : ''
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
