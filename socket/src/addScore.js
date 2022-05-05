const localStorage = require('./Services/LocalStore/LocalStore')

module.exports.addScores = function(killed, killer) {

  let groups = localStorage.readDataByIndex('users')
  for (let key in groups) {
    if (killed === groups[key].id) {
      localStorage.writeData('users', groups[key].scores = groups[key].scores - 1)
    }
    if (killer === groups[key].id) {
      localStorage.writeData('users', groups[key].scores + 2)
    }
  }

  /**
  //test
  //get one user by his user ID in parameter
  var awaitUser = database.getOneUser('0013a20041a713bc');
  awaitUser.then(data => {
    console.log(data.data())
  }) */

}
