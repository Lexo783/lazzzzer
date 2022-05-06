const server = require('../../server')
const localStorage = require('../Services/LocalStore/LocalStore')
const database = require("../../storage");
const verif = require('../Services/VerificationFirebase')

module.exports.openXBEE = function () {
  localStorage.writeData('isPlaying', false)
  server.receiveDataByXBEE()
}

module.exports.StartGame = function () {
  const isPlaying = localStorage.readDataByIndex('isPlaying')
  // here notified by mobile app for start game
  if (isPlaying) {
    return setTimeout(sendDataAfterGame, 3000)
  }
}

function sendDataAfterGame() {
  localStorage.writeData('isPlaying', false)
  const users = localStorage.readDataByIndex('users')
  if (verif.isNotEmpty(users)) {
    database.sendAllResultAfterGame(users);
    localStorage.clearData('users')
  }
}
