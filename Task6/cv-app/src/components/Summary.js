import React from 'react';
import './Summary.css';

// Summary component displays professional summary
function Summary({ text }) {
  return (
    <section className="summary">
      <h2 className="section-title">Professional Summary</h2>
      <p className="summary-text">{text}</p>
    </section>
  );
}

export default Summary;
