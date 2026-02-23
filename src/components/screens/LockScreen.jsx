import React, { useState, useCallback } from 'react';
import { validatePin } from '../../utils/validators';

export default function LockScreen({ onUnlock }) {
  const [pinCode, setPinCode] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleAddPin = useCallback((digit) => {
    if (pinCode.length < 4) {
      const newPin = pinCode + digit;
      setPinCode(newPin);

      if (newPin.length === 4) {
        checkPin(newPin);
      }
    }
  }, [pinCode]);

  const handleDelete = useCallback(() => {
    setPinCode(pinCode.slice(0, -1));
  }, [pinCode]);

  const checkPin = (pin) => {
    if (validatePin(pin)) {
      setTimeout(onUnlock, 300);
    } else {
      wrongPin();
    }
  };

  const wrongPin = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setPinCode('');
    }, 400);
  };

  return (
    <div className="lock-screen">
      <div className="lock-bench-text">TRUTH HIDES IN PLAIN SIGHT</div>
      <div className="lock-content">
        <div className="lock-time">10:28</div>
        <div className="lock-date">October 28</div>
        <div className="lock-notifications">2 missed calls — Unknown</div>

        <div className={`pin-display ${isShaking ? 'pin-shake' : ''}`}>
          {pinCode.split('').map((_, i) => '●').join(' ')}
        </div>

        <PinPad onAddPin={handleAddPin} onDelete={handleDelete} />
        <div className="lock-hint">The bench remembers.</div>
      </div>
    </div>
  );
}

function PinPad({ onAddPin, onDelete }) {
  return (
    <div className="pin-pad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button
          key={num}
          className="pin-button"
          onClick={() => onAddPin(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="pin-button"
        onClick={() => onAddPin(0)}
      >
        0
      </button>
      <button
        className="pin-button"
        onClick={onDelete}
      >
        ⌫
      </button>
    </div>
  );
}
