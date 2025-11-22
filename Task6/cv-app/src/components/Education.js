import React from 'react';
import './Education.css';

// Education component displays educational background
function Education({ institution, degree, location, duration }) {
  return (
    <section className="education">
      <h2 className="section-title">Education</h2>
      <div className="education-item">
        <div className="education-header">
          <div>
            <h3 className="institution">{institution}</h3>
            <p className="degree">{degree}</p>
          </div>
          <div className="education-right">
            <p className="location">{location}</p>
            <p className="duration">{duration}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
