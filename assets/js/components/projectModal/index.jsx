import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app-root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%'
  }
};

function ProjectModal({ showModal, closeModal, project }) {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={project.title}
    >
      <h2>{project.title}</h2>
      <p>Created By: {project.author}</p>
      <img className='projectImage' src={project.image_url} alt={project.title} />
      <ul className="specs">
        <li>
          <a target="_blank" rel="noopener noreferrer" href={project.website_url}>
            <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-sphere"></use></svg> Website
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href={project.github_url}>
            <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-github"></use></svg> Source Code
          </a>
        </li>
        <li>
          {project.type == 'project' ?
            <p>
              <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-briefcase"></use></svg> Project
            </p>
            :
            <p>
              <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-wrench"></use></svg> Library
            </p>
          }
        </li>
      </ul>
      <p>{project.description}</p>
    </Modal>
  )
}

export default ProjectModal