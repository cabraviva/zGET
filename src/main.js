/* global XMLHttpRequest */

// async.js Here
class Operation {
  constructor () {
    this.handlers = {}

    this.states = ['pending', 'successfully', 'failed']
    this.state = this.states[0]
  }

  then (callback) {
    this.on('success', callback)
    this.on('fail', callback)
  }

  dispatch (e, ...values) {
    if (e === 'success') {
      this.state = this.states[1]
    } else if (e === 'fail') {
      this.state = this.states[2]
    }

    for (const handler of this.handlers[e] || []) {
      handler(...values)
    }
  }

  fail (...values) {
    this.dispatch('fail', ...values)
  }

  success (...values) {
    this.dispatch('success', ...values)
  }

  on (e, handler) {
    if (typeof this.handlers[e] !== 'object') {
      this.handlers[e] = []
    }

    this.handlers[e].push(handler)
  }
}

const waitFor = (operation, callback) => {
  operation.on('success', callback)
  operation.on('fail', callback)
}

const isSuccess = operation => {
  return operation.state === operation.states[1]
}

const waitfor = waitFor

if (window) {
  window.waitFor = waitFor
  window.waitfor = waitfor
  window.Operation = Operation
  window.isSuccess = isSuccess
}

// ZGET Here

const zGET = (options = {}) => {
  const method = options.method ? options.method.toUpperCase() : 'GET'
  const url = options.url

  const operation = new Operation()

  var XHR = new XMLHttpRequest()

  /* EVENTS START */
  XHR.addEventListener('load', () => {
    operation.success(this.responseText, this.status)
  })

  XHR.addEventListener('error', () => {
    operation.fail(new Error('zGET can\'t load website: ' + url))
  })
  /* EVENTS END */

  XHR.open(method, url)

  if (options.beforeSend) {
    XHR = options.beforeSend(XHR)
  }

  XHR.send(options.POST)

  return operation
}

const zget = zGET
const zGet = zGET

if (window) {
  window.zGet = zGet
  window.zGET = zGET
  window.zget = zget
}
