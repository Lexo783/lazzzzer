const express = require('express');
const localStorage = require("./src/Services/LocalStore/LocalStore");
const game = require('./src/Controller/GameController')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/Home.html')
})
app.post('/api/users', function (req, res) {
  const users = [{
      'userId': req.body.userId1,
      'scores': 0,
      'name': req.body.name1
    }, {
      'userId': req.body.userId2,
      'scores': 0,
      'name': req.body.name2
    }]

  localStorage.writeData('users', users)
  localStorage.writeData('isPlaying', true)
  localStorage.writeData('timer', req.body.timer * 1000)
  game.StartGame()

  res.sendFile(__dirname + '/client/PlayingGame.html')
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
