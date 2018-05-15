import * as chai from 'chai'
import * as sinon from 'sinon'
import sinonChai from 'sinon-chai'

import StateAPI from '../../state'

chai.should()
chai.use(sinonChai)

const sandbox = sinon.createSandbox()

context('#StateAPI', () => {
  let state
  let callback
  let subscriptionId

  beforeEach(() => {
    callback = sinon.spy()
    state = new StateAPI()
  })

  describe('when subscribing to state changes', () => {
    const defaultState = {
      projects: [],
      offset: 0,
      limit: 10
    }

    beforeEach(() => {
      subscriptionId = state.subscribe(callback)
    })

    it('should return a subscription id', () => {
      subscriptionId.should.equal(1)
    })

    it('should call the callback on state changes', () => {
      state.setOffset(0)
      callback.should.have.been.calledOnce
    })

    it('should set the correct state', () => {
      const projects = [{ name: 'cool' }]
      const offset = 10
      const expectedState = {
        ...defaultState,
        projects,
        offset
      }

      state.setProjects(projects)
      state.setOffset(10)

      const stateOutput = state.getState()

      stateOutput.should.deep.equal(expectedState)
    });

    it('should return the state', () => {
      const data = state.getState()
      data.should.deep.equal(defaultState)
    })
  })

  describe('when unsubscribing from state changes', () => {
    beforeEach(() => {
      state.unsubscribe(subscriptionId)
    })

    it('should NOT call the callback', () => {
      state.setOffset(0)
      callback.should.not.have.been.called
    })
  })

  describe('when working with projects', () => {
    const expectedProjects = [
      {
        name: 'edgar',
        id: 1
      },
      {
        name: 'juan',
        id: 3
      },
      {
        name: 'maria',
        id: 5
      }
    ]

    beforeEach(() => {
      state.setProjects(expectedProjects)
    })

    it('getProjects should return projects', () => {
      const returnedProjects = state.getProjects()
      expectedProjects.should.deep.equal(returnedProjects)
    })

    it('getProject should return the requested project', () => {
      const expectedProject = expectedProjects[2]
      const requestedProject = state.getProject(expectedProject.id)

      expectedProject.should.equal(requestedProject)
    });
  })

  afterEach(() => {
    sandbox.restore()
  })
})