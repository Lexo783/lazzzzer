const server = require('../../server')
const localStorage = require('../Services/LocalStore/LocalStore')
const database = require("../../storage");

module.exports.openXBEE = function () {
  localStorage.writeData('isPlaying', false)
  server.receiveDataByXBEE()
}

module.exports.StartGame = function () {
  let isPlaying = localStorage.readDataByIndex('isPlaying')
  // here notified by mobile app for start game
  if (isPlaying) {
    setTimeout(sendDataAfterGame, 60000)
  }
}

function sendDataAfterGame() {

  localStorage.writeData('isPlaying', false)
  // envoie des results
  database.sendAllResultAfterGame(localStorage.readDataByIndex('users'));
}
