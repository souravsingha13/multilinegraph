const express = require('express')
const app = express()
const path = require('path');
const port = 3000

app.use("/static", express.static('./dist/static/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})