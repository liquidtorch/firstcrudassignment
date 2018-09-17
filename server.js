var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-Parser');
var port = process.env.PORT || 8000;

app.use(bodyParser.json({ type: 'application/json' }));


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

app.get('/', (req, res) => {
  let userDetails = fs.readFileSync('./storage.json', 'utf8');
  res.json(JSON.parse(userDetails));
})

app.get('/:name', (req, res) =>{
  let userDetails = fs.readFileSync('./storage.json', 'utf8');
  let user = JSON.parse(userDetails)
  let result = user.filter(item => item.name === req.params.name);
  if(result) {
    res.json(result);
  }else{
    res.sendStatus(400);
  }
})

app.delete('/delete/:name', (req, res) =>{
  let userDetails = fs.readFileSync('./storage.json', 'utf8');
  let user = JSON.parse(userDetails)
  let gone = user.filter(item => item.name !== req.params.name);
  fs.writeFileSync('./storage.json', JSON.stringify(gone));
  if(gone) {
    res.sendStatus(202);
  }else{
    res.sendStatus(204);
  }
})

app.patch('/update/:name/', (req, res) =>{
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= user[0].length){
    console.log(user);
    return res.sendStatus(404);
  }
  var user = req.body;

  if (!user){
    return res.sendStatus(404);
  }

  user[index] = user;

  res.json(user)
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
