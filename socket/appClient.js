const express = require('express');
const localStorage = require("./src/Services/LocalStore/LocalStore");
const game = require('./src/Controller/GameController')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/users', function(req, res) {
  const users = () => {
    let users = [];
    for(let key in req.body) {
      users.push({
        'userId': req.body[key].userId,
        'scores': req.body[key].scores,
        'name': req.body[key].name
      })
    }
    return users
  }
  localStorage.writeData('users', users)
  /*
  res.send({
    'userId': userId,
    'scores': scores,
    'name': name
  });*/
});

app.post('/api/openGame', function(req, res) {
  localStorage.writeData('isPlaying', req.body.playing)
  game.StartGame()
  /*
  res.send({
    'userId': userId,
    'scores': scores,
    'name': name
  });*/
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
