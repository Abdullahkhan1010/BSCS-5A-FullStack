import React from 'react';
import './Skills.css';

// SkillCategory component for each skill category
function SkillCategory({ category, skills }) {
  return (
    <div className="skill-category">
      <strong>{category}:</strong> {skills}
    </div>
  );
}

// Main Skills component that displays all technical skills
function Skills({ skillCategories }) {
  return (
    <section className="skills">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-container">
        {skillCategories.map((skillCat, index) => (
          <SkillCategory
            key={index}
            category={skillCat.category}
            skills={skillCat.skills}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
