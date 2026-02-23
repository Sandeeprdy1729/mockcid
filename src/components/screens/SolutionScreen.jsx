import React, { useEffect, useState } from 'react';
import { SOLUTION_STEPS, SOLUTION_TWIST } from '../../data/clues';

export default function SolutionScreen({ onChoice }) {
  return (
    <div className="solution-screen">
      <div className="solution-content">
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffd700', marginBottom: '20px' }}>
          THE SOLUTION
        </div>

        <div id="solutionSteps" style={{ width: '100%' }}>
          {SOLUTION_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="solution-step"
              style={{ animationDelay: `${idx * 0.5}s` }}
            >
              {step}
            </div>
          ))}
        </div>

        <div className="solution-twist">
          <div className="twist-text">{SOLUTION_TWIST}</div>
        </div>

        <div className="solution-buttons">
          <button
            className="solution-btn expose"
            onClick={() => onChoice('EXPOSED')}
          >
            EXPOSE
          </button>
          <button
            className="solution-btn join"
            onClick={() => onChoice('JOINED')}
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
}
