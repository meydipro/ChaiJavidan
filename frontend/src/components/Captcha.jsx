import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const Captcha = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const generate = useCallback(() => {
    const ops = ['+', '-', '×'];
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 15) + 1;
    const op = ops[Math.floor(Math.random() * ops.length)];
    setNum1(a);
    setNum2(b);
    setOperator(op);
    setAnswer('');
    setVerified(false);
    setError(false);
    onVerify?.(false);
  }, [onVerify]);

  useEffect(() => { generate(); }, [generate]);

  const getCorrectAnswer = () => {
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '×': return num1 * num2;
      default: return num1 + num2;
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setAnswer(val);
    setError(false);

    if (val !== '' && parseInt(val) === getCorrectAnswer()) {
      setVerified(true);
      onVerify?.(true);
    } else if (val.length > 0) {
      onVerify?.(false);
    }
  };

  return (
    <div className="captcha-box">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gold-600 font-medium">من ربات نیستم</span>
        <button
          type="button"
          onClick={generate}
          className="p-1.5 hover:bg-white/50 rounded-xl transition-colors"
          title="تازه‌سازی"
        >
          <RefreshCw className="w-4 h-4 text-gold-600" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="captcha-text select-none" style={{ textDecorationStyle: 'wavy' }}>
          {num1} {operator} {num2} =
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={answer}
          onChange={handleChange}
          className={`w-20 h-10 text-center text-lg font-semibold rounded-xl border-2 outline-none transition-all ${
            verified
              ? 'border-forest-500 bg-forest-50 text-forest-700'
              : error
              ? 'border-terracotta-500 bg-terracotta-50'
              : 'border-gold-200 focus:border-gold-500'
          }`}
          placeholder="?"
          maxLength={4}
        />
        {verified && (
          <span className="text-forest-600 text-lg font-bold">✓</span>
        )}
      </div>
    </div>
  );
};

export default Captcha;
