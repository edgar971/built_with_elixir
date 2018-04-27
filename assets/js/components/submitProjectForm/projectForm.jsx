import React from 'react'

export const FILE_FIELD = 'image_file'


function ProjectForm({ onChange, onSubmit, project, isValid, validateForm, errors }) {
  return [
    <div className="form-errors"  key="errors">
      <ul >
        {errors.map(e => <li key={e}>{e}</li>)}
      </ul>
    </div>
    ,
    <form method="post" onSubmit={onSubmit} key={'form'} >
      <div className="field half first">
        <input type="text" name="title" placeholder="Project Title" required onChange={onChange} onBlur={validateForm} disabled={!!errors.length} />
      </div>
      <div className="field half">
        <select name="type" required onChange={onChange} defaultValue="default" onBlur={validateForm} disabled={!!errors.length} >
          <option disabled value="default">Select type of project</option>
          <option value="website">Website</option>
          <option value="library">Library</option>
        </select>
      </div>
      <div className="field half first">
        <input type="text" name="author" placeholder="Author Name" required onChange={onChange} onBlur={validateForm} disabled={!!errors.length} />
      </div>
      <div className="field half">
        <input type="email" name="author_email" placeholder="Author Email (Optional)" onChange={onChange} onBlur={validateForm} disabled={!!errors.length}  />
      </div>
      <div className="field half first">
        <input type="url" name="website_url" placeholder="Website URL" onChange={onChange} disabled={!!errors.length} />
      </div>
      <div className="field half">
        <input type="url" name="github_url" placeholder="Github URL" onChange={onChange} disabled={!!errors.length} />
      </div>
      <div className="field">
        <textarea name="description" rows="3" placeholder="Description your project" required onChange={onChange} onBlur={validateForm} disabled={!!errors.length} ></textarea>
      </div>
      <div className="field file-area">
        <input type="file" name={FILE_FIELD} onChange={onChange} required accept=".jpg, .jpeg, .png" disabled={!!errors.length} />
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