import React from 'react';
import './Projects.css';

// ProjectItem component for individual project entry
function ProjectItem({ name, technologies, duration, description }) {
  return (
    <div className="project-item">
      <div className="project-header">
        <div>
          <h3 className="project-name">{name}</h3>
          <p className="technologies">{technologies}</p>
        </div>
        <p className="duration">{duration}</p>
      </div>
      <ul className="project-description">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Main Projects component that displays all projects
function Projects({ projects }) {
  return (
    <section className="projects">
      <h2 className="section-title">Projects</h2>
      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          name={project.name}
          technologies={project.technologies}
          duration={project.duration}
          description={project.description}
        />
      ))}
    </section>
  );
}

export default Projects;
