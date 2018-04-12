import React, { PureComponent } from 'react'
import ProjectsList from '../projectsList'
import ProjectModal from '../projectModal'

class App extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            selectedProject: {},
            showModal: false
        }

        this.onProjectClick = this.onProjectClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    onProjectClick(e, projectId) {
        e.preventDefault()
        const project = this.props.projects.find(({ id }) => projectId === id)

        if (!!project) {
            this.setState({ selectedProject: project })
            this.openModal()
        }
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    openModal() {
        this.setState({ showModal: true })
    }

    render() {
        const { selectedProject } = this.state

        return (
            <div>
                <ProjectsList onProjectClick={this.onProjectClick} projects={this.props.projects} />
                <ProjectModal showModal={this.state.showModal} closeModal={this.closeModal} project={this.state.selectedProject} />
            </div>
        )
    }
}

export default App