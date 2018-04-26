import React from 'react'

function ProjectForm({ onChange, onSubmit, project, isValid, validateForm, errors }) {
  return [
    <ul key="errors" className="form-errors">
      {errors.map(e => <li key={e}>{e}</li>)}
    </ul>,
    <form method="post" onSubmit={onSubmit} key={'form'} >
      <div className="field half first">
        <input type="text" name="title" placeholder="Project Title" required onChange={onChange} onBlur={validateForm} />
      </div>
      <div className="field half">
        <select name="type" required onChange={onChange} defaultValue="default" onBlur={validateForm}>
          <option disabled value="default">Select type of project</option>
          <option value="website">Website</option>
          <option value="library">Library</option>
        </select>
      </div>
      <div className="field half first">
        <input type="text" name="author" placeholder="Author Name" required onChange={onChange} onBlur={validateForm} />
      </div>
      <div className="field half">
        <input type="email" name="author_email" placeholder="Author Email (Optional)" onChange={onChange} onBlur={validateForm} />
      </div>
      <div className="field half first">
        <input type="url" name="website_url" placeholder="Website URL" onChange={onChange} />
      </div>
      <div className="field half">
        <input type="url" name="github_url" placeholder="Github URL" onChange={onChange} />
      </div>
      <div className="field">
        <textarea name="description" placeholder="Description" required onChange={onChange} onBlur={validateForm}></textarea>
      </div>
      <div className="field file-area">
        <input type="file" name="image" onChange={onChange} required accept=".jpg, .jpeg, .png"/>
        <div className="file-dummy">
          <div className="success">Great, your image has been selected.</div>
          <div className="default">Please select an image of your project.</div>
        </div>
      </div>
      <ul className="actions">
        <li>
          <input type="submit" value="Submit" className="special" onChange={onChange} disabled={!isValid || !!errors.length} />
        </li>
      </ul>
    </form>
  ]
}

export default ProjectForm