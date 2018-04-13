
class StateAPI {

  constructor({ projects }) {
    this.data = {
      projects: this.mapIntoObject(projects)
    }

    this.subscriptions = {}
    this.lastSubscriptionId = 0
  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr
      return acc
    }, {})
  }

  getProjects() {
    return this.data.projects
  }

  getProject(projectId) {
    return this.data.projects[projectId]
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
    if(Array.isArray(projects)) {
      projects = this.mapIntoObject(projects)
    }

    this.mergeWithState({
      projects
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