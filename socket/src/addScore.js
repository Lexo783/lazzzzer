var database = require("../storage")

module.exports.addScores = function(killed, killer) {

    database.writeUserData(killed, 'killed', -1);
    //console.log(database.writeUserData(killer, 'killer', +2))

    // get all users 
    var awaitUsers = database.getAllUsers();
    awaitUsers.then(data => {
        //data.forEach((user) => console.log(user.data()))
    })

    //test
    //get one user by his user ID in parameter
    var awaitUser = database.getOneUser('0013a20041a713bc');
    awaitUser.then(data => {
        console.log(data.data())
    })

}