var obj = {

}

module.exports.writeData = function (key, data) {
  if (key in obj) {
    obj[key] = data
  } else {
    obj = data
  }
}

module.exports.readData = function (pointer = null) {
  if (pointer === null) {
    return obj[pointer]
  } else {
    return null
  }
}
