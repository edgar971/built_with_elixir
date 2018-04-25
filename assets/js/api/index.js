import axios from 'axios'

export async function fetchProjects(offset = 0, limit = 10) {
  const { data } = await axios.get('/api/projects', { params: { offset, limit } })
  return data
}

export async function postProject(project) {
  return await axios.post('/api/projects', project)
}