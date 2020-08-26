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

  if (options.method === 'POST' && options.header !== 'no-header') {
    request.setRequestHeader('Content-type', options.type || 'application/x-www-form-urlencoded')
  }

  request.open(options.method || 'GET', url, true, options.username, options.password)
  request.send(options.POST)

  return p
}

window.zget = zGET
window.zGET = zGET
window.zGet = zGET
