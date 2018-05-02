import React, { Component } from 'react'
import ProjectsList from '../projectsList'
import ProjectModal from '../projectModal'
import { fetchProjects } from '../../api'
import GA from '../../ga'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = this.appState()

        this.onProjectClick = this.onProjectClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onStoreChange = this.onStoreChange.bind(this)
    }

    appState() {
        const { projects } = this.props.store.getState()

        return {
            projects,
            selectedProject: {},
            showModal: false
        }
    }

    onProjectClick(e, projectId) {
        e.preventDefault()
        const project = this.props.store.getProject(projectId)

        if (!!project) {
            this.setState({ selectedProject: project })
            console.log(project)
            this.openModal()
            GA.modalview(`/${this.slugify(project.title)}/${projectId}`);
        }

    }

    slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    openModal() {
        this.setState({ showModal: true })
    }

    onStoreChange() {
        if (this.subscriptionId) {
            this.setState(this.appState());
        }
    }

    async componentDidMount() {
        this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
        const { data } = await fetchProjects(0, 45)
        this.props.store.setProjects(data)
    }

    componentWillUnmount() {
        this.props.store.unsubscribe(this.subscriptionId);
        this.subscriptionId = null;
    }

    render() {
        const { selectedProject } = this.state

        return (
            <div>
                <ProjectsList onProjectClick={this.onProjectClick} projects={this.state.projects} />
                <ProjectModal showModal={this.state.showModal} closeModal={this.closeModal} project={this.state.selectedProject} />
            </div>
        )
    }
}

export default App