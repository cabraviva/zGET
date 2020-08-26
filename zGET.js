// var zGET = function (url, work=function(a){console.log(a)}, options={}) {
//
//   var listener = function () {
//     var result = `${this.responseText}`;
//     work(result);
//   }
//
//
//   var request = new XMLHttpRequest();
//
//   request.addEventListener("load", listener);
//   request.open(options.method || 'GET', url);
//   request.send();
//
// }

var zGET = function (url, options = {}, worker = function () {}) {
  var request = new window.XMLHttpRequest()

  // request.addEventListener("load", listener);

  var p = new Promise(function (resolve, reject) {
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
