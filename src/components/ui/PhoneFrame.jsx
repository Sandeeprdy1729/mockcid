import React from 'react';

export default function PhoneFrame({ children }) {
  return (
    <div className="phone-container">
      <div className="phone-notch"></div>
      <StatusBar />
      <div className="screen">
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = React.useState('10:28');

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-left">📶</div>
      <div className="status-time">{time}</div>
      <div className="status-right">
        <div className="battery"></div>
      </div>
    </div>
  );
}
