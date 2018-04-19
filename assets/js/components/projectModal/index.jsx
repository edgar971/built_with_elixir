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
    padding: '2em'
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
        {project.website_url &&
          <li>
            <a target="_blank" rel="noopener noreferrer" href={`${project.website_url}?utm_source=builtwithelixir&utm_medium=website&utm_campaign=modal_click`}>
              <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-sphere"></use></svg> Visit Website
          </a>
          </li>
        }
        {project.github_url &&
          <li>
            <a target="_blank" rel="noopener noreferrer" href={`${project.github_url}?utm_source=builtwithelixir&utm_medium=website&utm_campaign=modal_click`}>
              <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-github"></use></svg> View Source Code
          </a>
          </li>
        }
        <li>
          {project.type == 'website' ?
            <p>
              <svg className="icon icon-user"><use xlinkHref="/images/symbol-defs.svg#icon-briefcase"></use></svg> Website
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