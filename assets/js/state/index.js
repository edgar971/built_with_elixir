
class StateAPI {

  constructor() {
    this.data = {
      projects: [],
      offset: 0,
      limit: 10
    }

    this.subscriptions = {}
    this.lastSubscriptionId = 0
  }

  getProjects() {
    return this.data.projects
  }

  getProject(projectId) {
    return this.data.projects.find((project) => project.id === projectId)
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4()
  }

  getState() {
    return this.data
  }

  subscribe(callback) {
    this.lastSubscriptionId++
    this.subscriptions[this.lastSubscriptionId] = callback
    return this.lastSubscriptionId
  }

  unsubscribe(subscriptionId) {
    delete this.subscriptions[subscriptionId]
  }

  notifySubscribers() {
    Object.values(this.subscriptions).forEach((callback) => callback())
  }

  setProjects(projects) {
    this.mergeWithState({
      projects
    })
  }

  setOffset(offset) {
    this.mergeWithState({
      offset
    })
  }

  mergeWithState(stateChange) {
    this.data = {
      ...this.data,
      ...stateChange
    }
    this.notifySubscribers()
  }
}

export default StateAPI