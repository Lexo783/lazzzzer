const localStorage = require('./Services/LocalStore/LocalStore')

module.exports.addScores = function(killed, killer) {

  let groups = localStorage.readDataByIndex('users')
  for (let key in groups) {
    if (killed === groups[key].id) {
      const newData = groups[key]
      newData.scores -= 1
      localStorage.writeDataUser(key, newData)
    }
    if (killer === groups[key].id) {
      const newData = groups[key]
      newData.scores += 2
      localStorage.writeData(key, newData)
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
