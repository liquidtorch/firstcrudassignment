var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.post('/create/:name/:email/:state', (req, res) => {
  var profile = {
    name: req.params.name,
    email:req.params.email,
    state: req.params.state
  }
  let userDetails = fs.readFileSync('./storage.json', 'utf8');
  let user = JSON.parse(userDetails)
  user.push(profile);
  console.log(user);
  fs.writeFileSync('./storage.json', JSON.stringify(user));
  res.send('Did it!');
})

app.get('/user/:name', (req, res) => {
  
})


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
