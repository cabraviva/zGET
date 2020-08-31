var zGET = function (url, options = {}, worker = function () {}) {
  var request = new window.XMLHttpRequest()

  var p = new (window.Promise)(function (resolve, reject) {
    request.addEventListener('load', function () {
      resolve(
        this.responseText
      )
    })
    request.addEventListener('load', function () {
      worker(request.status)
    })
    request.addEventListener('error', function () {
      reject(new window.Error(`zGET can't load website ${url}`))
    })
  })

  if (options.header) {
    request.setRequestHeader(...options.header)
  }

  request.open(options.method || 'GET', url, true, options.username, options.password)
  if (options.beforeSend) {
    options.beforeSend(request)
  }
  request.send(options.POST)

  return p
}

window.zget = zGET
window.zGET = zGET
window.zGet = zGET
