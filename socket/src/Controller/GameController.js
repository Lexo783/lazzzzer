const server = require('../../server')
const localStorage = require('../Services/LocalStore/LocalStore')

module.exports.StartingGame = function() {
    // here notified by mobile app for start game
    /**
     * the truc qui fait que quand on envoie vrai ou faut on ouvre les ports
     * et stocker les ports
     */
    var data = {
        "users": [{
                'name': 'Lexo'
            },
            { 'name': 'ANTOINE LE MEC TROP BEAU JE SUIS SUR TU SUCE MIEUX QUE MON EX' },
        ]
    }
    localStorage.writeData('users', data)
    mesCouilles = localStorage.readData('users')
    console.log(mesCouilles[0])
    server.receiveDataByXBEE()

}