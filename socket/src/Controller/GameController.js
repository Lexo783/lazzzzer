const server = require('../../server')
const localStorage = require('../Services/LocalStore/LocalStore')

module.exports.StartingGame = function() {
    // here notified by mobile app for start game
    /**
     * the truc qui fait que quand on envoie vrai ou faut on ouvre les ports
     * et stocker les ports
     */
    var data = {
        users: [{
            0: {
                'name': "Lexo"
            },
            1: {
                'name': "ANTOINE LE MEC TROP BEAU JE SUIS SUR TU SUCE MIEUX QUE MON EX"
            },
        }]
    }
    localStorage.writeData(data)
    localStorage.readData('users')
    server.receiveDataByXBEE()

}