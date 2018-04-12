import React from 'react'
import Project from '../project'

const ProjectsList = ({ projects, onProjectClick }) => {
  
  return (
    <section className="tiles">
      {Object
        .values(projects)
        .map((project) => <Project key={project.id} {...project} onClick={onProjectClick} />)}
    </section>
  )
} 

export default ProjectsList