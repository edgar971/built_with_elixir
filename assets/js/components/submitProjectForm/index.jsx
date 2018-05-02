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
      errors: [],
      submitted: false,
      submitting: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }
  onChange(e) {
    const { name, value, files, type } = e.target
    const { project } = this.state

    if (type === 'file' && !!files) {
      project[name] = files[0]
    } else {
      project[name] = value
    }

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
    this.setState((state) => ({ ...state, submitting: true }))
    try {
      await postProject(this.state.project)
      this.setState((state) => ({ ...state, submitted: true, submitting: false }))

    } catch (error) {
      const { errors } = this.state
      errors.push('An error occured while attempting to submit your project. Please try again.')

      this.setState((state) => {
        return {
          ...state,
          errors,
          submitting: false
        }
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.submitted ?
          <div>
            <h2>Submit a project</h2>
            <ProjectForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              isValid={this.state.isValid}
              project={this.state.project}
              validateForm={this.validateForm}
              errors={this.state.errors}
              submitting={this.state.submitting}
            />
          </div>
          :
          <div>
            <h2>Your project has been submitted</h2>
            <p>Your project will be shown to the world once it's approved. Thank you!</p>
          </div>
        }
      </div>
    )
  }
}

export default SubmitProjectForm