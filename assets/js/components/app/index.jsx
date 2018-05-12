import React, { Component } from 'react'
import ProjectsList from '../projectsList'
import ProjectModal from '../projectModal'
import Pagination from '../pagination'
import { fetchProjects } from '../../api'
import GA from '../../ga'

const DEFAULT_OFFSET_INCREMENTOR = 10

class App extends Component {

    constructor(props) {
        super(props)

        this.state = this.appState()

        this.onProjectClick = this.onProjectClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onStoreChange = this.onStoreChange.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }

    appState() {
        const { projects, offset, limit } = this.props.store.getState()

        return {
            projects,
            offset,
            limit,
            selectedProject: {},
            showModal: false, 
            isLoading: false
        }
    }

    onProjectClick(e, projectId) {
        e.preventDefault()
        const project = this.props.store.getProject(projectId)

        if (!!project) {
            this.setState({ selectedProject: project })
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

    async loadMore() {
        this.setState({ isLoading: true })
        const offset = this.state.offset + DEFAULT_OFFSET_INCREMENTOR
        
        const { data } = await fetchProjects(offset, this.state.limit)

        this.props.store.setProjects([...this.state.projects, ...data])
        this.props.store.setOffet(offset)
        this.setState({ isLoading: false })        
    }

    async componentDidMount() {
        this.subscriptionId = this.props.store.subscribe(this.onStoreChange)

        const { data } = await fetchProjects(this.state.offset, this.state.limit)

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
                <Pagination onClick={this.loadMore} isLoading={this.state.isLoading}/>
                <ProjectModal showModal={this.state.showModal} closeModal={this.closeModal} project={this.state.selectedProject} />
            </div>
        )
    }
}

export default App