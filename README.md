# zGET
A cool Javascript framework to make XMLHttpRequest easier to use!

## Install:

### GitHub
**Use the latest version:**

Add this to your html:
```html
<script type="text/javascript" src="https://greencoder001.github.io/zGET/dist/bundle.js"></script>
```

or
### jsdelivr
**Use the latest version with jsdelivr:**

Add this to your html:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/greencoder001/zGET@latest/dist/bundle.js"></script>
```

or
### Local:
**Use a specific version:**

Download the latest release, unpack it and add this html:
```html
<script type="text/javascript" src="/your/path/to/dist/bundle.js"></script>
```

## Examples:
### 01 - Get stargazers of a github repository
```js
zGET({
  url: 'https://api.github.com/repos/greencoder001/zGET/stargazers'
}).then(value => {
  JSON.parse(value).forEach((stargazer) => {
    console.log('Stargazer:', stargazer.login)
  })
})
```
