import React, { Component } from 'react'
import ProjectForm from './projectForm'
import { postProject } from '../../api'

export const FORM_FIELDS = {
  title: true,
  type: true,
  author: true,
  author_email: false,
  website_url: false,
  github_url: false,
  description: true
}

class SubmitProjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      project: {},
      isValid: false,
      errors: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }
  onChange(e) {
    const { name, value } = e.target
    const { project } = this.state
    
    project[name] = value
    this.setState((state) => {
      return {
        ...state,
        project
      }
    })
  }

  validateForm() {
    const isValid = !Object.entries(FORM_FIELDS)
      .filter(([_, required]) => required)
      .map(([fieldName, _]) => !!this.state.project[fieldName] && this.state.project[fieldName] !== '')
      .filter((isValid) => isValid === false)
      .length

    this.setState((state) => {
      return {
        ...state,
        isValid
      }
    })
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      console.log(this.state.project)
      await postProject(this.state.project)
    } catch (error) {
      const { errors } = this.state
      errors.push('Error submitting project, please try again.')
      this.setState((state) => {
        return {
          ...state,
          errors
        }
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Submit a project</h2>
        <ProjectForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          isValid={this.state.isValid}
          project={this.state.project}
          validateForm={this.validateForm}
          errors={this.state.errors}
        />
      </div>
    )
  }
}

export default SubmitProjectForm