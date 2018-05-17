import * as chai from 'chai'
import * as sinon from 'sinon'
import sinonChai from 'sinon-chai'
import axios from 'axios'
import { fetchProjects } from '../../api'


chai.should()
chai.use(sinonChai)

const sandbox = sinon.createSandbox()
const expect = chai.expect

context('#fetchProjects', () => {
  const apiResponse = {
    data: [
      { name: 'what' },
      { name: 'test' }
    ]
  }

  describe('when fetching projects successfully', () => {
    let projects

    beforeEach(async () => {
      sandbox.stub(axios, 'get').resolves(apiResponse)
      projects = await fetchProjects()
    })

    it('should have called get with the correct params', () => axios.get.should.have.been.calledWithExactly('/api/projects', { params: { limit: 10, offset: 0 } }));
    it('should return the expected projects', () => projects.should.deep.equal(apiResponse.data))

    afterEach(() => {
      sandbox.restore()
    })
  })

  describe('when fetching projects successfully with offset and limit', () => {
    let projects
    const limit = 20
    const offset = 40

    beforeEach(async () => {
      sandbox.stub(axios, 'get').resolves(apiResponse)
      projects = await fetchProjects(offset, limit)
    })

    it('should have called get with the correct params', () => axios.get.should.have.been.calledWithExactly('/api/projects', { params: { limit, offset } }));
    it('should return the expected projects', () => projects.should.deep.equal(apiResponse.data))

    afterEach(() => {
      sandbox.restore()
    })
  })

  describe('when fetching projects unsuccessfully', () => {
    const responseError = new Error('Something happened')
    let projects
    let error

    beforeEach(async () => {
      sandbox.stub(axios, 'get').rejects(responseError)
      try {
        await fetchProjects()
      } catch (e) {
        error = e
      }
    })

    it('should throw the error', () => error.should.deep.equal(responseError))

    afterEach(() => {
      sandbox.restore()
    })
  })
})

context('#postProject', () => {
  describe('when posting projects', () => {
    
  })
})