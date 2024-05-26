class MyActionListener {

  constructor() {
    this.listeners = {}
  }

  registerListener(action, listener) {

    if (!this.listeners[action]) {
      this.listeners[action] = []
    }

    this.listeners[action].push(listener)
  }

  removeListener(action) {

    if (this.listeners[action]) {
      delete this.listeners[action]
    }
  }

  emit(action, data) {

    if (!this.listeners[action]) {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exist.`)
    }

    this.listeners[action].forEach(listener => listener(data))
  }
}

export default MyActionListener