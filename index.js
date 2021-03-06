const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'build')))
  .get('/ping', function (req, res) {
    return res.send('pong');
  })
  .get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))