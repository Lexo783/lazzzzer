const server = require('../../server')

module.exports.StartingGame = function () {
  // here notified by mobile app for start game
  /**
   * the truc
   */
  console.log("TEST")
  server.receiveDataByXBEE()
}
