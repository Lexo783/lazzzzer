const express = require('express');
const localStorage = require("./src/Services/LocalStore/LocalStore");
const game = require('./src/Controller/GameController')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/home.html')
})
app.post('/api/users', function (req, res) {
  const users = () => [{
      'userId': req.body.userId,
      'scores': req.body.scores,
      'name': req.body.name1
    }, {
      'userId': req.body.userId,
      'scores': req.body.scores,
      'name': req.body.name2
    }]
  console.log(users)

  localStorage.writeData('users', users)
  /*
  res.send({
    'userId': userId,
    'scores': scores,
    'name': name
  });*/
});

app.post('/api/openGame', function (req, res) {
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
