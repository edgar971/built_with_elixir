import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app-root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '75vh'
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
      <p>By: {project.author}</p>
      <img className='projectImage' src={project.image_url} alt={project.title} />
      <ul>
        <li>
          <a href={project.website_url}>Website</a>
        </li>
        <li>
          <a href={project.github_url}>Github</a>
        </li>
        <li>
          <p>Type: {project.type}</p>
        </li>
      </ul>
      <p>{project.description}</p>
    </Modal>
  )
}

export default ProjectModal