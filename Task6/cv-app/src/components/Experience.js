import React from 'react';
import './Experience.css';

// ExperienceItem component for individual job entry
function ExperienceItem({ title, company, location, duration, responsibilities }) {
  return (
    <div className="experience-item">
      <div className="experience-header">
        <div>
          <h3 className="job-title">{title}</h3>
          <p className="company">{company}</p>
        </div>
        <div className="experience-right">
          <p className="duration">{duration}</p>
          <p className="location">{location}</p>
        </div>
      </div>
      <ul className="responsibilities">
        {responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
}

// Main Experience component that displays all work experiences
function Experience({ experiences }) {
  return (
    <section className="experience">
      <h2 className="section-title">Experience</h2>
      {experiences.map((exp, index) => (
        <ExperienceItem
          key={index}
          title={exp.title}
          company={exp.company}
          location={exp.location}
          duration={exp.duration}
          responsibilities={exp.responsibilities}
        />
      ))}
    </section>
  );
}

export default Experience;
