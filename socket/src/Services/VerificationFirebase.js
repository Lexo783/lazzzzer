module.exports.isNotEmpty = function (data) {
  for (let key in data) {
    if( data[key].userId !== '' || data[key].userId !== null && data[key].scores != null && data[key].name !== '' || data[key].name !== null) {
      continue
    } else {
      return false
    }
  }
  return true
}
