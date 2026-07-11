import React, { useRef, useState } from 'react';

const OtpInput = ({ length = 6, onComplete, disabled }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every(v => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    const newValues = Array(length).fill('');
    pasted.split('').forEach((char, i) => { newValues[i] = char; });
    setValues(newValues);

    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();

    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  return (
    <div className="flex gap-3 justify-center" dir="ltr">
      {values.map((val, i) => (
        <input
          key={i}
          ref={el => inputsRef.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;
